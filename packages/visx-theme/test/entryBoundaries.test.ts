import { readFileSync } from 'fs';

function readSource(path: string) {
  return readFileSync(path, 'utf8');
}

describe('entry boundaries', () => {
  it('keeps the root entry free of client markers and client-only exports', () => {
    const rootEntry = readSource('packages/visx-theme/src/index.ts');

    expect(rootEntry).not.toContain("'use client'");
    expect(rootEntry).not.toContain('"use client"');
    expect(rootEntry).not.toContain('ThemeProvider');
    expect(rootEntry).not.toContain('useAxisStyle');
    expect(rootEntry).not.toContain('useCategoricalScale');
    expect(rootEntry).not.toContain('useChartConfig');
    expect(rootEntry).not.toContain('useColor');
    expect(rootEntry).not.toContain('useGridStyle');
    expect(rootEntry).not.toContain('useTheme');
  });

  it('marks the react entry as client-only', () => {
    const reactEntry = readSource('packages/visx-theme/src/react/index.ts');

    expect(reactEntry.trimStart().startsWith("'use client';")).toBe(true);
  });

  it('keeps client APIs free of state, effects, and browser globals', () => {
    const clientSources = [
      'packages/visx-theme/src/react/ThemeContext.tsx',
      'packages/visx-theme/src/react/ThemeProvider.tsx',
      'packages/visx-theme/src/react/categoricalColor.ts',
      'packages/visx-theme/src/react/useAxisStyle.ts',
      'packages/visx-theme/src/react/useCategoricalScale.ts',
      'packages/visx-theme/src/react/useChartConfig.ts',
      'packages/visx-theme/src/react/useColor.ts',
      'packages/visx-theme/src/react/useGridStyle.ts',
      'packages/visx-theme/src/react/useTheme.ts',
      'packages/visx-theme/src/react/warn.ts',
    ].map(readSource);
    const source = clientSources.join('\n');

    expect(source).not.toMatch(/\buseState\b/);
    expect(source).not.toMatch(/\buseEffect\b/);
    expect(source).not.toMatch(/\buseLayoutEffect\b/);
    expect(source).not.toMatch(/\bwindow\b/);
    expect(source).not.toMatch(/\bdocument\b/);
    expect(source).not.toMatch(/\bgetComputedStyle\b/);
    expect(source).not.toMatch(/\bmatchMedia\b/);
  });
});
