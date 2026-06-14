import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const PACKAGE_NAME = '@visx/kernel';
const PACKAGE_DIR = './packages/visx-kernel';
const ESM_DIR = './esm';
const GZIP_BUDGET_BYTES = 2048;

function getJavaScriptFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getJavaScriptFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith('.js') ? [fullPath] : [];
  });
}

function checkKernelSize() {
  const esmDirectory = path.join(PACKAGE_DIR, ESM_DIR);
  const files = fs.existsSync(esmDirectory) ? getJavaScriptFiles(esmDirectory) : [];

  if (files.length === 0) {
    throw new Error(`No built ESM files found for ${PACKAGE_NAME}. Run \`yarn babel\` first.`);
  }

  const source = files
    .sort()
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');
  const gzipBytes = zlib.gzipSync(source).byteLength;

  console.log(`${PACKAGE_NAME} ESM gzip size: ${gzipBytes} bytes`);

  if (gzipBytes > GZIP_BUDGET_BYTES) {
    throw new Error(
      `${PACKAGE_NAME} exceeds ${GZIP_BUDGET_BYTES} byte gzip budget (${gzipBytes} bytes).`,
    );
  }
}

try {
  checkKernelSize();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
