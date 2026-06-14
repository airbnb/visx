import useTheme from './useTheme';

export type AxisOrientation = 'top' | 'right' | 'bottom' | 'left';
export type AxisTextAnchor = 'start' | 'middle' | 'end';
export type AxisVerticalAnchor = 'start' | 'middle' | 'end';

export type AxisTextStyleProps = {
  dx?: string | number;
  dy?: string | number;
  fill: string;
  fontFamily: string;
  fontSize: number;
  textAnchor: AxisTextAnchor;
  verticalAnchor?: AxisVerticalAnchor;
};

export type AxisStyleProps = {
  stroke: string;
  strokeWidth: number;
  tickLength: number;
  tickStroke: string;
  tickLabelProps: AxisTextStyleProps;
  labelProps: AxisTextStyleProps;
};

const tickLabelPositionByOrientation: Record<
  AxisOrientation,
  Pick<AxisTextStyleProps, 'dx' | 'dy' | 'textAnchor'>
> = {
  bottom: {
    dy: '0.25em',
    textAnchor: 'middle',
  },
  top: {
    dy: '-0.75em',
    textAnchor: 'middle',
  },
  left: {
    dx: '-0.25em',
    dy: '0.25em',
    textAnchor: 'end',
  },
  right: {
    dx: '0.25em',
    dy: '0.25em',
    textAnchor: 'start',
  },
};

const labelPositionByOrientation: Record<
  AxisOrientation,
  Pick<AxisTextStyleProps, 'dx' | 'dy' | 'textAnchor'>
> = {
  bottom: {
    dy: '-0.25em',
    textAnchor: 'middle',
  },
  top: {
    dy: '-0.25em',
    textAnchor: 'middle',
  },
  left: {
    dx: '-1.25em',
    textAnchor: 'middle',
  },
  right: {
    dx: '1.25em',
    textAnchor: 'middle',
  },
};

export default function useAxisStyle(orientation: AxisOrientation): AxisStyleProps {
  const theme = useTheme();

  return {
    stroke: theme.colors.axisStroke,
    strokeWidth: theme.axis.strokeWidth,
    tickLength: theme.axis.tickLength,
    tickStroke: theme.colors.axisTickStroke,
    tickLabelProps: {
      ...tickLabelPositionByOrientation[orientation],
      fill: theme.colors.textMuted,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSizeTick,
    },
    labelProps: {
      ...labelPositionByOrientation[orientation],
      fill: theme.colors.textPrimary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSizeLabel,
    },
  };
}
