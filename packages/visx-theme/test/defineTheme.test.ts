import { createThemeStyle, defineTheme, darkTheme, lightTheme } from '../src';

describe('defineTheme', () => {
  it('defaults to lightTheme and deep-merges overrides', () => {
    const theme = defineTheme({
      name: 'brand',
      colors: {
        background: '#101010',
      },
      axis: {
        tickLength: 8,
      },
      spacing: {
        margin: {
          left: 72,
        },
      },
    });

    expect(theme.name).toBe('brand');
    expect(theme.colors.background).toBe('#101010');
    expect(theme.colors.border).toBe(lightTheme.colors.border);
    expect(theme.axis.tickLength).toBe(8);
    expect(theme.axis.strokeWidth).toBe(lightTheme.axis.strokeWidth);
    expect(theme.spacing.margin).toEqual({
      ...lightTheme.spacing.margin,
      left: 72,
    });
  });

  it('supports a custom base theme', () => {
    const theme = defineTheme(
      {
        name: 'brand-dark',
        colors: {
          background: '#111111',
        },
      },
      darkTheme,
    );

    expect(theme.name).toBe('brand-dark');
    expect(theme.colors.background).toBe('#111111');
    expect(theme.colors.textPrimary).toBe(darkTheme.colors.textPrimary);
    expect(theme.axis).toEqual(darkTheme.axis);
  });

  it('uses base categorical colors when the override is absent', () => {
    const theme = defineTheme({
      colors: {
        background: '#101010',
      },
    });

    expect(theme.colors.categorical).toEqual(lightTheme.colors.categorical);
    expect(theme.colors.categorical).not.toBe(lightTheme.colors.categorical);
  });

  it('treats an empty categorical override as present but fills from base', () => {
    const theme = defineTheme({
      colors: {
        categorical: [],
      },
    });

    expect(theme.colors.categorical).toEqual(lightTheme.colors.categorical);
  });

  it('replaces categorical colors from index 0 and fills missing values from base', () => {
    const theme = defineTheme({
      colors: {
        categorical: ['#111111', '#222222', '#333333'],
      },
    });

    expect(theme.colors.categorical[0]).toBe('#111111');
    expect(theme.colors.categorical[1]).toBe('#222222');
    expect(theme.colors.categorical[2]).toBe('#333333');
    expect(theme.colors.categorical[3]).toBe(lightTheme.colors.categorical[3]);
    expect(theme.colors.categorical[11]).toBe(lightTheme.colors.categorical[11]);
  });

  it('returns a definition that createThemeStyle can emit', () => {
    const theme = defineTheme({
      name: 'brand',
      colors: {
        categorical: ['#111111', '#222222', '#333333'],
        gridStroke: '#444444',
      },
    });
    const style = createThemeStyle(theme);

    expect(style['--chart-1']).toBe('#111111');
    expect(style['--chart-4']).toBe(lightTheme.colors.categorical[3]);
    expect(style['--visx-grid-stroke']).toBe('#444444');
  });
});
