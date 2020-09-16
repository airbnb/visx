import React, { useMemo, useContext } from 'react';
import { AxisScale } from '@visx/axis';
import { AxisProps as VxAxisProps } from '@visx/axis/lib/axis/Axis';
import DataContext from '../../context/DataContext';

export type BaseAxisProps<Scale extends AxisScale> = Omit<
  VxAxisProps<Scale>,
  'scale' | 'orientation'
> & {
  /** Required axis orientation. */
  orientation: NonNullable<VxAxisProps<Scale>['orientation']>;
} & {
  /** Rendered component which is passed VxAxisProps by BaseAxis after processing. */
  AxisComponent: React.FC<VxAxisProps<Scale>>;
};

/**
 * Component which handles all xychart-specific logic for axes,
 * and passes processed props to a specified Axis / AnimatedAxis component.
 */
export default function BaseAxis<Scale extends AxisScale>({
  AxisComponent,
  ...props
}: BaseAxisProps<Scale>) {
  const { theme, xScale, yScale, margin, width, height } = useContext(DataContext);
  const { orientation } = props;

  const axisStyles = useMemo(
    () =>
      orientation === 'left' || orientation === 'right'
        ? theme?.axisStyles?.y?.[orientation]
        : theme?.axisStyles?.x?.[orientation],
    [theme, orientation],
  );

  const tickLabelProps = useMemo(
    () =>
      props.tickLabelProps || // use props if passed
      (axisStyles // else construct from theme if possible
        ? () =>
            orientation === 'left' || orientation === 'right'
              ? // by default, wrap vertical-axis tick labels within the allotted margin space
                // this does not currently account for axis label
                { ...axisStyles.tickLabel, width: margin?.[orientation] }
              : axisStyles.tickLabel
        : undefined),

    [props.tickLabelProps, axisStyles, orientation, margin],
  );

  const topOffset =
    orientation === 'bottom'
      ? (height ?? 0) - (margin?.bottom ?? 0)
      : orientation === 'top'
      ? margin?.top ?? 0
      : 0;
  const leftOffset =
    orientation === 'left'
      ? margin?.left ?? 0
      : orientation === 'right'
      ? (width ?? 0) - (margin?.right ?? 0)
      : 0;

  return (
    <AxisComponent
      top={topOffset}
      left={leftOffset}
      labelProps={axisStyles?.axisLabel}
      stroke={axisStyles?.axisLine?.stroke}
      strokeWidth={axisStyles?.axisLine?.strokeWidth}
      tickLength={axisStyles?.tickLength}
      tickStroke={axisStyles?.tickLine?.stroke}
      {...props}
      tickLabelProps={tickLabelProps}
      scale={(orientation === 'left' || orientation === 'right' ? yScale : xScale) as Scale}
    />
  );
}
