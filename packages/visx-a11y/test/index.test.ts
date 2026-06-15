import { readFileSync } from 'fs';

import { generateChartDescription, normalizeChartA11yData } from '../src';
import {
  ChartA11yAnnouncer,
  ChartA11yDataTable,
  useChartA11y,
  useChartKeyboardNav,
} from '../src/react';

function readSource(path: string) {
  return readFileSync(path, 'utf8');
}

describe('@visx/a11y scaffold', () => {
  it('exposes package entry points', () => {
    expect(normalizeChartA11yData).toBeDefined();
    expect(generateChartDescription).toBeDefined();
    expect(useChartA11y).toBeDefined();
    expect(useChartKeyboardNav).toBeDefined();
    expect(ChartA11yAnnouncer).toBeDefined();
    expect(ChartA11yDataTable).toBeDefined();
  });

  it('keeps the root entry server-safe and marks the react entry as client-only', () => {
    const rootEntry = readSource('packages/visx-a11y/src/index.ts');
    const reactEntry = readSource('packages/visx-a11y/src/react/index.ts');

    expect(rootEntry).not.toContain("'use client'");
    expect(rootEntry).not.toContain('"use client"');
    expect(rootEntry).not.toContain('useChartA11y');
    expect(rootEntry).not.toContain('ChartA11yAnnouncer');
    expect(reactEntry.trimStart().startsWith("'use client';")).toBe(true);
  });
});
