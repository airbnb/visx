import { createRuntimeTheme, createThemeStyle, cssVar, darkTheme, lightTheme } from '../src';
import type { VisxThemeDefinition } from '../src';

describe('cssVar', () => {
  it('builds CSS variable expressions with and without fallbacks', () => {
    expect(cssVar('--chart-1')).toBe('var(--chart-1)');
    expect(cssVar('--chart-1', '#3b82f6')).toBe('var(--chart-1, #3b82f6)');
    expect(cssVar('--visx-axis-stroke', cssVar('--border', '#e5e7eb'))).toBe(
      'var(--visx-axis-stroke, var(--border, #e5e7eb))',
    );
  });
});

describe('built-in themes', () => {
  it('keeps JS-only numeric values identical between light and dark themes', () => {
    expect(darkTheme.typography.fontSizeTitle).toBe(lightTheme.typography.fontSizeTitle);
    expect(darkTheme.typography.fontSizeLabel).toBe(lightTheme.typography.fontSizeLabel);
    expect(darkTheme.typography.fontSizeTick).toBe(lightTheme.typography.fontSizeTick);
    expect(darkTheme.axis).toEqual(lightTheme.axis);
    expect(darkTheme.grid).toEqual(lightTheme.grid);
    expect(darkTheme.spacing).toEqual(lightTheme.spacing);
    expect(darkTheme.axis).not.toBe(lightTheme.axis);
    expect(darkTheme.grid).not.toBe(lightTheme.grid);
    expect(darkTheme.spacing).not.toBe(lightTheme.spacing);
  });
});

describe('createRuntimeTheme', () => {
  it('uses auto mode with light fallbacks by default', () => {
    const theme = createRuntimeTheme();

    expect(theme.name).toBe('auto');
    expect(theme.colors.categorical).toHaveLength(12);
    expect(theme.colors.categorical[0]).toBe('var(--chart-1, #3b82f6)');
    expect(theme.colors.background).toBe('var(--background, #ffffff)');
    expect(theme.axis.tickLength).toBe(lightTheme.axis.tickLength);
  });

  it('uses dark fallbacks for dark mode', () => {
    const theme = createRuntimeTheme('dark');

    expect(theme.name).toBe('dark');
    expect(theme.colors.categorical[0]).toBe('var(--chart-1, #60a5fa)');
    expect(theme.colors.background).toBe('var(--background, #020617)');
    expect(theme.colors.border).toBe('var(--border, #334155)');
  });

  it('builds shadcn-compatible nested fallback chains', () => {
    const theme = createRuntimeTheme('auto');

    expect(theme.colors.surface).toBe('var(--card, var(--background, #ffffff))');
    expect(theme.colors.sequentialFrom).toBe('var(--chart-scale-from, var(--chart-1, #3b82f6))');
    expect(theme.colors.negative).toBe('var(--chart-negative, var(--destructive, #ef4444))');
    expect(theme.colors.axisStroke).toBe('var(--visx-axis-stroke, var(--border, #e5e7eb))');
    expect(theme.colors.gridStroke).toBe('var(--visx-grid-stroke, var(--border, #e5e7eb))');
  });

  it('normalizes custom categorical palettes to 12 runtime values', () => {
    const brandTheme: VisxThemeDefinition = {
      ...lightTheme,
      name: 'brand',
      colors: {
        ...lightTheme.colors,
        categorical: ['#111111', '#222222', '#333333', '#444444', '#555555'],
      },
    };
    const theme = createRuntimeTheme(brandTheme);

    expect(theme.name).toBe('brand');
    expect(theme.colors.categorical).toHaveLength(12);
    expect(theme.colors.categorical[0]).toBe('var(--chart-1, #111111)');
    expect(theme.colors.categorical[4]).toBe('var(--chart-5, #555555)');
    expect(theme.colors.categorical[5]).toBe('var(--chart-6, #111111)');
    expect(theme.colors.categorical[11]).toBe('var(--chart-12, #222222)');
  });

  it('keeps font family CSS-backed while leaving font sizes numeric', () => {
    const theme = createRuntimeTheme('auto');

    expect(theme.typography.fontFamily).toBe(
      `var(--visx-font-family, ${lightTheme.typography.fontFamily})`,
    );
    expect(theme.typography.fontSizeTitle).toBe(16);
    expect(theme.typography.fontSizeLabel).toBe(12);
    expect(theme.typography.fontSizeTick).toBe(11);
  });
});

describe('createThemeStyle', () => {
  it('emits raw CSS-backed variables for explicit built-in themes', () => {
    const style = createThemeStyle('light');

    expect(style['--chart-1']).toBe(lightTheme.colors.categorical[0]);
    expect(style['--chart-12']).toBe(lightTheme.colors.categorical[11]);
    expect(style['--background']).toBe(lightTheme.colors.background);
    expect(style['--card']).toBe(lightTheme.colors.surface);
    expect(style['--visx-axis-stroke']).toBe(lightTheme.colors.axisStroke);
    expect(style['--visx-font-family']).toBe(lightTheme.typography.fontFamily);
    expect(style).not.toHaveProperty('name');
    expect(style).not.toHaveProperty('axis');
    expect(style).not.toHaveProperty('--visx-theme-name');
  });

  it('normalizes custom categorical palettes before emitting styles', () => {
    const brandTheme: VisxThemeDefinition = {
      ...lightTheme,
      name: 'brand',
      colors: {
        ...lightTheme.colors,
        categorical: ['#111111', '#222222', '#333333', '#444444', '#555555'],
      },
    };
    const style = createThemeStyle(brandTheme);

    expect(style['--chart-1']).toBe('#111111');
    expect(style['--chart-5']).toBe('#555555');
    expect(style['--chart-6']).toBe('#111111');
    expect(style['--chart-12']).toBe('#222222');
  });

  it('does not emit undefined-valued CSS variables', () => {
    const themeWithUndefined = {
      ...lightTheme,
      colors: {
        ...lightTheme.colors,
        positive: undefined,
      },
    } as unknown as VisxThemeDefinition;
    const style = createThemeStyle(themeWithUndefined);

    expect(Object.prototype.hasOwnProperty.call(style, '--chart-positive')).toBe(false);
  });
});
