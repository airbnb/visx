import zlib from 'zlib';
// Size checks run in the repo toolchain, not in published packages.
// eslint-disable-next-line import/no-extraneous-dependencies
import { build } from 'esbuild';

const PACKAGE_NAME = '@visx/kernel';
const ENTRY_POINT = './packages/visx-kernel/src/index.ts';
const GZIP_BUDGET_BYTES = 2048;

async function checkKernelSize() {
  const result = await build({
    bundle: true,
    entryPoints: [ENTRY_POINT],
    external: ['react'],
    format: 'esm',
    minify: true,
    platform: 'browser',
    treeShaking: true,
    write: false,
  });
  const source = result.outputFiles[0].text;
  const gzipBytes = zlib.gzipSync(source).byteLength;

  console.log(`${PACKAGE_NAME} ESM gzip size: ${gzipBytes} bytes`);

  if (gzipBytes > GZIP_BUDGET_BYTES) {
    throw new Error(
      `${PACKAGE_NAME} exceeds ${GZIP_BUDGET_BYTES} byte gzip budget (${gzipBytes} bytes).`,
    );
  }
}

checkKernelSize().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
