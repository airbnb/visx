import React, { useContext } from 'react';
import { mount } from 'enzyme';
import {
  lightTheme,
  darkTheme,
  allColors,
  defaultColors,
  grayColors,
  buildChartTheme,
  ThemeProvider,
  ThemeContext,
} from '../src';

describe('<ThemeProvider />', () => {
  it('should be defined', () => {
    expect(ThemeProvider).toBeDefined();
  });

  it('should provide a XYChartTheme', () => {
    expect.assertions(1);

    const ThemeConsumer = () => {
      const theme = useContext(ThemeContext);
      expect(theme).toBeDefined();

      return null;
    };

    mount(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
  });
});

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
      labelStyles: { fontFamily: 'Comic Sans', fill: 'grape' },
      tickLabelStyles: { fontSize: 100, fill: 'banana' },
      xTickLineStyles: { strokeWidth: 2.4 },
    });

    expect(theme).toMatchObject({
      backgroundColor: 'white',
      colors: ['violet'],
      gridStyles: { stroke: 'fuchsia', strokeDasharray: '1,5' },
      htmlLabelStyles: { color: 'grape' },
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
