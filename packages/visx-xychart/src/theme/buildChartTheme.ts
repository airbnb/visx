import type { CSSProperties } from 'react';
import type { SVGTextProps, HTMLTextStyles, LineStyles, XYChartTheme } from '../types/theme';
import { textColor } from './colors';

export type ThemeConfig = {
  backgroundColor: string;

  // categorical colors, mapped to series `key`s
  colors: string[];

  // labels
  svgLabelBig?: SVGTextProps;
  svgLabelSmall?: SVGTextProps;
  htmlLabel?: HTMLTextStyles;

  // lines
  xAxisLineStyles?: LineStyles;
  yAxisLineStyles?: LineStyles;
  xTickLineStyles?: LineStyles;
  yTickLineStyles?: LineStyles;
  tickLength: number;

  // grid
  gridColor: string;
  gridColorDark: string;
  gridStyles?: CSSProperties;
};

const defaultLabelStyles = {
  fontFamily: '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
  fontWeight: 700,
  fontSize: 12,
  textAnchor: 'middle',
  pointerEvents: 'none',
  letterSpacing: 0.4,
} as const;

/** Provides a simplified API to build a full XYChartTheme. */
export default function buildChartTheme(config: ThemeConfig): XYChartTheme {
  const baseSvgLabel: SVGTextProps = {
    ...defaultLabelStyles,
    fill: textColor,
    stroke: 'none',
    ...config.svgLabelBig,
  } as const;

  const baseTickLabel: SVGTextProps = {
    ...defaultLabelStyles,
    fontWeight: 200,
    fontSize: 11,
    fill: textColor,
    stroke: 'none',
    ...config.svgLabelSmall,
  } as const;

  const baseHtmlLabel: HTMLTextStyles = {
    color:
      config.htmlLabel?.color ??
      config.svgLabelBig?.fill ??
      config.svgLabelSmall?.fill ??
      textColor,
    ...defaultLabelStyles,
    ...config.htmlLabel,
  };

  return {
    backgroundColor: config.backgroundColor,
    colors: [...config.colors],
    htmlLabel: {
      ...baseHtmlLabel,
    },
    svgLabelSmall: {
      ...baseTickLabel,
    },
    svgLabelBig: {
      ...baseSvgLabel,
    },
    gridStyles: {
      stroke: config.gridColor,
      strokeWidth: 1,
      ...config.gridStyles,
    },
    axisStyles: {
      x: {
        top: {
          axisLabel: {
            ...baseSvgLabel,
            dy: '-0.25em', // needs to include font-size
          },
          axisLine: {
            stroke: config.gridColorDark,
            strokeWidth: 2,
            ...config.xAxisLineStyles,
          },
          tickLabel: {
            ...baseTickLabel,
            dy: '-0.25em', // needs to include font-size
          },
          tickLength: config.tickLength,
          tickLine: {
            strokeWidth: 1,
            stroke: config.gridColor,
            ...config.xTickLineStyles,
          },
        },
        bottom: {
          axisLabel: {
            ...baseSvgLabel,
            dy: '-0.25em',
          },
          axisLine: {
            stroke: config.gridColorDark,
            strokeWidth: 2,
            ...config.xAxisLineStyles,
          },
          tickLabel: {
            ...baseTickLabel,
            dy: '0.125em',
          },
          tickLength: config.tickLength,
          tickLine: {
            strokeWidth: 1,
            stroke: config.gridColor,
            ...config.xTickLineStyles,
          },
        },
      },
      y: {
        left: {
          axisLabel: {
            ...baseSvgLabel,
            dx: '-1.25em',
          },
          axisLine: {
            stroke: config.gridColor,
            strokeWidth: 1,
            ...config.yAxisLineStyles,
          },
          tickLabel: {
            ...baseTickLabel,
            textAnchor: 'end',
            dx: '-0.25em',
            dy: '0.25em',
          },
          tickLength: config.tickLength,
          tickLine: {
            strokeWidth: 1,
            stroke: config.gridColor,
            ...config.yTickLineStyles,
          },
        },
        right: {
          axisLabel: {
            ...baseSvgLabel,
            dx: '1.25em',
          },
          axisLine: {
            stroke: config.gridColor,
            strokeWidth: 1,
            ...config.yAxisLineStyles,
          },
          tickLabel: {
            ...baseTickLabel,
            textAnchor: 'start',
            dx: '0.25em',
            dy: '0.25em',
          },
          tickLength: config.tickLength,
          tickLine: {
            strokeWidth: 1,
            stroke: config.gridColor,
            ...config.yTickLineStyles,
          },
        },
      },
    },
  };
}
