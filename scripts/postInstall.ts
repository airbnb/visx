import fs from 'fs';
import path from 'path';
import { EOL } from 'os';

export const DIRNAME = __dirname; // eslint-disable-line no-undef
const ROOT_PATH = path.resolve(DIRNAME, '../');

/**
 * Fix compilation issues in jsdom files.
 */
function updateJSDomTypeDefinition() {
  const relativePath = path.join('node_modules', '@types', 'jsdom', 'base.d.ts');
  const filePath = path.join(ROOT_PATH, relativePath);
  if (!fs.existsSync(filePath)) {
    console.warn(`JSdom base.d.ts not found '${filePath}' (visx post install script)`);
    return;
  }
  const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
  const replacedContents = fileContents.replace(
    /\s*globalThis: DOMWindow;\s*readonly \["Infinity"]: number;\s*readonly \["NaN"]: number;/g,
    [
      'globalThis: DOMWindow;',
      '// @ts-ignore',
      'readonly ["Infinity"]: number;',
      '// @ts-ignore',
      'readonly ["NaN"]: number;',
    ].join(`${EOL}        `),
  );
  if (replacedContents === fileContents) {
    console.warn('JSdom base.d.ts not updated');
    return;
  }
  fs.writeFileSync(filePath, replacedContents);
}

updateJSDomTypeDefinition();
