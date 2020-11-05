import {
  lightTheme,
  darkTheme,
  allColors,
  defaultColors,
  grayColors,
  buildChartTheme,
} from '../src';

describe('colors', () => {
  it('should export allColors', () => {
    expect(allColors).toMatchObject({ red: expect.arrayContaining([expect.any(String)]) });
    expect(Object.keys(allColors)).toHaveLength(13);
  });
  it('should export defaultColors', () => {
    expect(defaultColors).toMatchObject(expect.arrayContaining([expect.any(String)]));
  });
  it('should export grayColors', () => {
    expect(grayColors).toMatchObject(expect.arrayContaining([expect.any(String)]));
  });
});

describe('theme', () => {
  it('exports a light theme', () => {
    expect(lightTheme).toBeDefined();
  });
  it('exports a dark theme', () => {
    expect(darkTheme).toBeDefined();
  });
  it('builds a theme', () => {
    const theme = buildChartTheme({
      backgroundColor: 'white',
      gridColor: 'fuchsia',
      gridColorDark: 'orange',
      colors: ['violet'],
      gridStyles: { strokeDasharray: '1,5' },
      tickLength: 7.5,
      svgLabelBig: { fontFamily: 'Comic Sans', fill: 'grape' },
      svgLabelSmall: { fontSize: 100, fill: 'banana' },
      xTickLineStyles: { strokeWidth: 2.4 },
    });

    expect(theme).toMatchObject({
      backgroundColor: 'white',
      colors: ['violet'],
      gridStyles: { stroke: 'fuchsia', strokeDasharray: '1,5' },
      htmlLabel: { color: 'grape' },
      svgLabelBig: { fill: 'grape' },
      svgLabelSmall: { fill: 'banana' },
      axisStyles: {
        x: {
          top: {
            axisLabel: { fontFamily: 'Comic Sans', fill: 'grape' },
            axisLine: { stroke: 'orange' },
            tickLabel: { fill: 'banana', fontSize: 100 },
            tickLine: { strokeWidth: 2.4 },
          },
        },
        y: {
          left: {
            axisLabel: { fontFamily: 'Comic Sans', fill: 'grape' },
            axisLine: { stroke: 'fuchsia' },
            tickLabel: { fill: 'banana', fontSize: 100 },
            tickLine: { strokeWidth: 1 },
          },
        },
      },
    });
  });
});
