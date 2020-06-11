import { TextStyles, XYChartTheme, LineStyles } from '../types/theme';

export type ThemeConfig = {
  baseColor: string;
  colors: string[];

  // labels
  labelColor: string;
  labelStyles?: TextStyles;
  tickLabelColor: string;
  tickLabelStyles?: TextStyles;

  // lines
  xAxisLineStyles?: LineStyles;
  yAxisLineStyles?: LineStyles;
  xTickLineStyles?: LineStyles;
  yTickLineStyles?: LineStyles;
  tickLength: number;

  gridColor: string;
  gridColorDark: string;
  gridStyles?: LineStyles;

  font: {
    weights: { light: number | string; bold: number | string };
    small: TextStyles;
    regular: TextStyles;
  };
};

/** Simplified API to build a full XYChartTheme. */
export default function buildChartTheme(theme: ThemeConfig): XYChartTheme {
  const baseLabel: TextStyles = {
    ...theme.font.regular,
    fill: theme.labelColor,
    textAnchor: 'middle',
    fontWeight: theme.font.weights.bold,
    pointerEvents: 'none',
    ...theme.labelStyles,
  } as const;

  const baseTickLabel: TextStyles = {
    ...theme.font.small,
    fill: theme.tickLabelColor,
    textAnchor: 'middle',
    fontWeight: theme.font.weights.light,
    pointerEvents: 'none',
    ...theme.tickLabelStyles,
  } as const;

  const tickLabels: { top: TextStyles; right: TextStyles; bottom: TextStyles; left: TextStyles } = {
    top: {
      ...baseTickLabel,
      dy: '-0.25em',
    },
    bottom: {
      ...baseTickLabel,
      dy: '0.125em',
    },
    left: {
      ...baseTickLabel,
      textAnchor: 'end',
      dx: '-0.25em',
      dy: '0.25em',
    },
    right: {
      ...baseTickLabel,
      textAnchor: 'start',
      dx: '0.25em',
      dy: '0.25em',
    },
  };

  return {
    baseColor: theme.baseColor,
    colors: [...theme.colors],
    labelStyles: {
      ...baseLabel,
    },
    gridStyles: {
      stroke: theme.gridColor,
      strokeWidth: 1,
      ...theme.gridStyles,
    },
    xAxisStyles: {
      stroke: theme.gridColorDark,
      strokeWidth: 2,
      ...theme.xAxisLineStyles,
      label: {
        bottom: {
          ...baseLabel,
          dy: '0.75em',
        },
        top: {
          ...baseLabel,
          dy: '-0.75em',
        },
      },
    },
    yAxisStyles: {
      stroke: theme.gridColor,
      strokeWidth: 1,
      ...theme.yAxisLineStyles,
      label: {
        left: {
          ...baseLabel,
          dx: '-0.75em',
        },
        right: {
          ...baseLabel,
          dx: '0.75em',
        },
      },
    },
    xTickStyles: {
      stroke: theme.gridColor,
      tickLength: theme.tickLength,
      ...theme.xTickLineStyles,
      label: {
        bottom: {
          ...tickLabels.bottom,
        },
        top: {
          ...tickLabels.top,
        },
      },
    },
    yTickStyles: {
      stroke: theme.gridColor,
      tickLength: theme.tickLength,
      ...theme.yTickLineStyles,
      label: {
        left: {
          ...tickLabels.left,
        },
        right: {
          ...tickLabels.right,
        },
      },
    },
  };
}
