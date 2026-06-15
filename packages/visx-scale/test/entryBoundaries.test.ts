import { readFileSync } from 'fs';

function readSource(path: string) {
  return readFileSync(path, 'utf8');
}

describe('@visx/scale entry boundaries', () => {
  it('keeps the root entry free of client markers and react hooks', () => {
    const rootEntry = readSource('packages/visx-scale/src/index.ts');

    expect(rootEntry).not.toContain("'use client'");
    expect(rootEntry).not.toContain('"use client"');
    expect(rootEntry).not.toContain('useScale');
  });

  it('marks the react entry as client-only', () => {
    const reactEntry = readSource('packages/visx-scale/src/react/index.ts');

    expect(reactEntry.trimStart().startsWith("'use client';")).toBe(true);
  });
});
