import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

type FixtureKind = 'next' | 'vite';

type RegistryItem = {
  dependencies?: string[];
  files?: { target?: string }[];
  name: string;
};

type RegistryIndex = {
  items?: RegistryItem[];
};

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(DIRNAME, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');
const SOURCE_REGISTRY_PATH = path.join(PACKAGE_ROOT, 'registry.json');
const REPO_NODE_MODULES = path.join(REPO_ROOT, 'node_modules');
const SHADCN_BIN = path.join(REPO_NODE_MODULES, '.bin/shadcn');
const TSC_BIN = path.join(REPO_NODE_MODULES, 'typescript/bin/tsc');

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function writeJson(filePath: string, value: unknown) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown;
}

function getRegistryItems() {
  const registry = readJson(SOURCE_REGISTRY_PATH) as RegistryIndex;

  return registry.items ?? [];
}

function getRegistryItem(itemName: string) {
  const item = getRegistryItems().find(({ name }) => name === itemName);

  assert(item != null, `Missing source registry item: ${itemName}`);

  return item;
}

function getComponentExportName(itemName: string) {
  return itemName
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

function getImportPath(target: string) {
  return target.replace(/^components\//, '@/components/').replace(/\.tsx$/, '');
}

function createPackageManagerShim(binDir: string) {
  const npmPath = path.join(binDir, 'npm');

  fs.mkdirSync(binDir, { recursive: true });
  fs.writeFileSync(
    npmPath,
    `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function getPackageName(specifier) {
  if (specifier.startsWith('-') || specifier.startsWith('.') || specifier.includes('://')) {
    return null;
  }
  if (specifier.startsWith('@')) {
    const slashIndex = specifier.indexOf('/');
    if (slashIndex === -1) {
      return null;
    }
    const secondSegment = specifier.slice(slashIndex + 1);
    const versionIndex = secondSegment.indexOf('@');
    return versionIndex === -1
      ? specifier
      : specifier.slice(0, slashIndex + 1 + versionIndex);
  }
  const versionIndex = specifier.indexOf('@');
  return versionIndex === -1 ? specifier : specifier.slice(0, versionIndex);
}

const args = process.argv.slice(2);
const commandIndex = args.findIndex((arg) => ['install', 'i', 'add'].includes(arg));
const installArgs = commandIndex === -1 ? [] : args.slice(commandIndex + 1);
const dependencies = installArgs.map(getPackageName).filter(Boolean);

if (dependencies.length > 0) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.dependencies = packageJson.dependencies || {};
  dependencies.forEach((dependency) => {
    packageJson.dependencies[dependency] = packageJson.dependencies[dependency] || 'latest';
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\\n');
}
`,
  );
  fs.chmodSync(npmPath, 0o755);
}

function createFixture(root: string, kind: FixtureKind, item: RegistryItem) {
  const isNext = kind === 'next';
  const cssPath = isNext ? 'src/app/globals.css' : 'src/index.css';
  const target = item.files?.[0]?.target;

  assert(target != null, `${item.name} registry item must declare a target file.`);

  const componentName = getComponentExportName(item.name);
  const importPath = getImportPath(target);
  const chartId = `${kind}-${item.name}`;

  fs.mkdirSync(path.join(root, path.dirname(cssPath)), { recursive: true });
  fs.writeFileSync(path.join(root, cssPath), '');
  writeJson(path.join(root, 'package.json'), {
    name: `visx-registry-${kind}-smoke`,
    private: true,
    dependencies: isNext
      ? { next: '15.0.0', react: '^19.0.0', 'react-dom': '^19.0.0' }
      : {
          '@vitejs/plugin-react': '^5.0.0',
          vite: '^7.0.0',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
        },
    devDependencies: {},
  });
  writeJson(path.join(root, 'tsconfig.json'), {
    compilerOptions: {
      allowSyntheticDefaultImports: true,
      baseUrl: '.',
      esModuleInterop: true,
      jsx: 'react-jsx',
      lib: ['dom', 'dom.iterable', 'es2022'],
      module: 'ESNext',
      moduleResolution: 'Bundler',
      noEmit: true,
      paths: {
        '@/*': ['./src/*'],
      },
      skipLibCheck: true,
      strict: true,
      target: 'ES2022',
    },
    include: ['src/**/*.ts', 'src/**/*.tsx'],
  });
  writeJson(path.join(root, 'components.json'), {
    $schema: 'https://ui.shadcn.com/schema.json',
    style: 'new-york',
    rsc: isNext,
    tsx: true,
    tailwind: {
      config: '',
      css: cssPath,
      baseColor: 'neutral',
      cssVariables: true,
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks',
    },
  });

  if (isNext) {
    fs.writeFileSync(
      path.join(root, 'src/app/page.tsx'),
      `import { ${componentName} } from '${importPath}';\n\nexport default function Page() {\n  return <${componentName} id="${chartId}" />;\n}\n`,
    );
  } else {
    fs.writeFileSync(
      path.join(root, 'src/App.tsx'),
      `import { ${componentName} } from '${importPath}';\n\nexport function App() {\n  return <${componentName} id="${chartId}" />;\n}\n`,
    );
  }
}

function linkRepoNodeModules(root: string) {
  assert(
    fs.existsSync(REPO_NODE_MODULES),
    'Install repository dependencies before running registry install smoke tests.',
  );
  assert(fs.existsSync(SHADCN_BIN), 'Install shadcn before running registry install smoke tests.');
  assert(fs.existsSync(TSC_BIN), 'Install TypeScript before running registry install smoke tests.');

  fs.symlinkSync(REPO_NODE_MODULES, path.join(root, 'node_modules'), 'dir');
}

function assertFixtureDependencies(root: string, kind: FixtureKind, item: RegistryItem) {
  const packageJson = readJson(path.join(root, 'package.json')) as {
    dependencies?: Record<string, string>;
  };

  (item.dependencies ?? []).forEach((dependency) => {
    assert(
      packageJson.dependencies?.[dependency] != null,
      `${kind} fixture did not install ${dependency} for ${item.name}.`,
    );
  });
}

function typecheckFixture(root: string, kind: FixtureKind) {
  try {
    execFileSync('node', [TSC_BIN, '--project', path.join(root, 'tsconfig.json')], {
      cwd: root,
      stdio: 'pipe',
    });
  } catch (error) {
    const { stderr, stdout } = error as { stderr?: unknown; stdout?: unknown };
    const output = [stdout, stderr]
      .filter((chunk): chunk is NonNullable<typeof chunk> => chunk != null)
      .map(String)
      .join('\n');

    throw new Error(`${kind} fixture failed to typecheck installed registry item.\n${output}`);
  }
}

function buildRegistryArtifacts(outputDir: string) {
  assert(fs.existsSync(SHADCN_BIN), 'Install shadcn before running registry install smoke tests.');

  try {
    execFileSync(
      SHADCN_BIN,
      ['build', 'registry.json', '--cwd', REPO_ROOT, '--output', outputDir],
      {
        cwd: REPO_ROOT,
        stdio: 'pipe',
      },
    );
  } catch (error) {
    const { stderr, stdout } = error as { stderr?: unknown; stdout?: unknown };
    const output = [stdout, stderr]
      .filter((chunk): chunk is NonNullable<typeof chunk> => chunk != null)
      .map(String)
      .join('\n');

    throw new Error(`Failed to build temporary registry artifacts.\n${output}`);
  }
}

function smokeInstallBuiltRegistryItem(itemName: string, registryOutputDir: string) {
  const itemPath = path.join(registryOutputDir, `${itemName}.json`);
  const item = getRegistryItem(itemName);
  const componentName = getComponentExportName(itemName);

  assert(fs.existsSync(itemPath), `Temporary registry build did not create ${itemName}.json.`);

  (['next', 'vite'] as const).forEach((kind) => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), `visx-registry-${kind}-`));
    const binDir = path.join(tempRoot, 'bin');

    try {
      createFixture(tempRoot, kind, item);
      linkRepoNodeModules(tempRoot);
      createPackageManagerShim(binDir);

      execFileSync(
        SHADCN_BIN,
        ['add', itemPath, '--cwd', tempRoot, '--yes', '--silent', '--overwrite'],
        {
          cwd: REPO_ROOT,
          env: { ...process.env, PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ''}` },
          stdio: 'pipe',
        },
      );

      const target = item.files?.[0]?.target;

      assert(target != null, `${itemName} registry item must declare a target file.`);

      const installedPath = path.join(
        tempRoot,
        'src',
        target.replace(/^components\//, 'components/'),
      );
      const installed = fs.readFileSync(installedPath, 'utf8');

      assertFixtureDependencies(tempRoot, kind, item);
      assert(
        installed.includes(`export function ${componentName}`),
        `${kind} fixture did not install ${componentName}.`,
      );
      assert(
        installed.includes('@visx/a11y/react'),
        `${kind} fixture installed stale chart content.`,
      );
      typecheckFixture(tempRoot, kind);
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
}

export function smokeInstallRegistryItem(itemName: string) {
  const registryOutputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'visx-registry-build-'));

  try {
    buildRegistryArtifacts(registryOutputDir);
    smokeInstallBuiltRegistryItem(itemName, registryOutputDir);
  } finally {
    fs.rmSync(registryOutputDir, { recursive: true, force: true });
  }
}

export function smokeInstallRegistryItems(itemNames = getRegistryItems().map(({ name }) => name)) {
  const registryOutputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'visx-registry-build-'));

  try {
    buildRegistryArtifacts(registryOutputDir);
    itemNames.forEach((itemName) => smokeInstallBuiltRegistryItem(itemName, registryOutputDir));
  } finally {
    fs.rmSync(registryOutputDir, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const itemNames = process.argv.slice(2);

    smokeInstallRegistryItems(itemNames.length > 0 ? itemNames : undefined);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
