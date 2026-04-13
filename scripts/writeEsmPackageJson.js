const { readdirSync, writeFileSync, statSync, existsSync } = require('fs');
const { join } = require('path');

const packagesDir = join(__dirname, '..', 'packages');
const contents = `${JSON.stringify({ type: 'module' }, null, 2)}\n`;

let written = 0;
for (const name of readdirSync(packagesDir)) {
  const esmDir = join(packagesDir, name, 'esm');
  if (existsSync(esmDir) && statSync(esmDir).isDirectory()) {
    writeFileSync(join(esmDir, 'package.json'), contents);
    written += 1;
  }
}

console.log(`Wrote esm/package.json to ${written} package(s).`);
