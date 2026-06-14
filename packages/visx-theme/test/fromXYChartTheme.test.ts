import { fromXYChartTheme, lightTheme } from '../src';

describe('fromXYChartTheme', () => {
  it('converts structural XYChart themes into visx theme definitions', () => {
    const theme = fromXYChartTheme({
      backgroundColor: '#101827',
      colors: ['#111111', '#222222', '#333333', '#444444', '#555555'],
      gridStyles: {
        stroke: '#334155',
      },
      axisStyles: {
        x: {
          bottom: {
            axisLine: { stroke: '#475569' },
            tickLine: { stroke: '#64748b' },
          },
        },
      },
      svgLabelBig: {
        fill: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
      },
      svgLabelSmall: {
        fill: '#cbd5e1',
        fontSize: '10px',
      },
    });

    expect(theme).toEqual(
      expect.objectContaining({
        name: 'xychart',
        colors: expect.objectContaining({
          background: '#101827',
          categorical: [
            '#111111',
            '#222222',
            '#333333',
            '#444444',
            '#555555',
            '#111111',
            '#222222',
            '#333333',
            '#444444',
            '#555555',
            '#111111',
            '#222222',
          ],
          textPrimary: '#f8fafc',
          textMuted: '#cbd5e1',
          axisStroke: '#475569',
          axisTickStroke: '#64748b',
          gridStroke: '#334155',
        }),
        typography: expect.objectContaining({
          fontFamily: 'Inter, sans-serif',
          fontSizeLabel: 13,
          fontSizeTick: 10,
        }),
      }),
    );
    expect(theme.typography.fontSizeTitle).toBe(lightTheme.typography.fontSizeTitle);
    expect(theme.axis).toEqual(lightTheme.axis);
    expect(theme.grid).toEqual(lightTheme.grid);
    expect(theme.spacing).toEqual(lightTheme.spacing);
  });

  it('uses the documented axis stroke lookup order', () => {
    const theme = fromXYChartTheme({
      axisStyles: {
        x: {
          top: {
            axisLine: { stroke: '#x-top-axis' },
            tickLine: { stroke: '#x-top-tick' },
          },
        },
        y: {
          left: {
            axisLine: { stroke: '#y-left-axis' },
            tickLine: { stroke: '#y-left-tick' },
          },
        },
      },
    });

    expect(theme.colors.axisStroke).toBe('#x-top-axis');
    expect(theme.colors.axisTickStroke).toBe('#x-top-tick');
  });

  it('falls back to the light theme for missing and non-mappable fields', () => {
    const theme = fromXYChartTheme({
      svgLabelBig: {
        fontSize: 'large',
      },
      svgLabelSmall: {
        fontSize: Number.NaN,
      },
    });

    expect(theme.colors).toEqual(lightTheme.colors);
    expect(theme.typography.fontFamily).toBe(lightTheme.typography.fontFamily);
    expect(theme.typography.fontSizeLabel).toBe(lightTheme.typography.fontSizeLabel);
    expect(theme.typography.fontSizeTick).toBe(lightTheme.typography.fontSizeTick);
    expect(theme.axis).toEqual(lightTheme.axis);
    expect(theme.grid).toEqual(lightTheme.grid);
    expect(theme.spacing).toEqual(lightTheme.spacing);
  });
});
