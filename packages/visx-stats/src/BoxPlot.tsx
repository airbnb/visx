import React from 'react';
import classnames from 'classnames';
import { Group } from '@visx/group';
import { PickD3Scale, ContinuousDomainScaleType } from '@visx/scale';
import { SharedProps, ChildRenderProps, LineCoords } from './types';

function verticalToHorizontal({ x1, x2, y1, y2 }: LineCoords) {
  return {
    x1: y1,
    x2: y2,
    y1: x1,
    y2: x2,
  };
}

export type BoxPlotProps = SharedProps & {
  /** Scale for converting input values to pixel offsets. */
  valueScale: PickD3Scale<ContinuousDomainScaleType, number>;
  /** Maximum BoxPlot value. */
  max?: number;
  /** Minimum BoxPlot value. */
  min?: number;
  /** First quartile BoxPlot value. */
  firstQuartile?: number;
  /** Third quartile BoxPlot value. */
  thirdQuartile?: number;
  /** Median BoxPlot value. */
  median?: number;
  /** Width of the BoxPlot. */
  boxWidth?: number;
  /** Fill color to apply to outlier circles and BoxPlot rect. */
  fill?: string;
  /** Fill color opacity to apply to outlier circles and BoxPlot rect. */
  fillOpacity?: number | string;
  /** Stroke color to apply to outlier circles, BoxPlot rect, and min/median/max lines. */
  stroke?: string;
  /** Stroke width to apply to outlier circles, BoxPlot rect, and min/median/max lines. */
  strokeWidth?: number | string;
  /** Rx to apply to BoxPlot rect. */
  rx?: number;
  /** Ry to apply to BoxPlot rect. */
  ry?: number;
  /** Array of outlier values to be rendered. */
  outliers?: number[];
  /** Props to pass to the median glyph line. */
  medianProps?: React.SVGProps<SVGLineElement>;
  /** Props to pass to the maximum glyph line. */
  maxProps?: React.SVGProps<SVGLineElement>;
  /** Props to pass to the minimum glyph line. */
  minProps?: React.SVGProps<SVGLineElement>;
  /** Props to pass to the box glyph rect. */
  boxProps?: React.SVGProps<SVGRectElement>;
  /** Props to pass to the outlier glyph circles. */
  outlierProps?: React.SVGProps<SVGCircleElement>;
  /** Whether to render a container rect element (e.g., to capture mouse events). */
  container?: boolean;
  /** Props to pass to the container glyph rect if rendered. */
  containerProps?: React.SVGProps<SVGRectElement>;
  /** Override render function to fully control the rendering of the BoxPlot glyph. */
  children?: (childRenderProps: ChildRenderProps) => React.ReactNode;
};

export default function BoxPlot({
  left = 0,
  top = 0,
  className,
  max,
  min,
  firstQuartile,
  thirdQuartile,
  median,
  boxWidth = 10,
  fill,
  fillOpacity,
  stroke,
  strokeWidth,
  rx = 2,
  ry = 2,
  valueScale,
  outliers = [],
  horizontal,
  medianProps = {},
  maxProps = {},
  minProps = {},
  boxProps = {},
  outlierProps = {},
  container = false,
  containerProps = {},
  children,
}: BoxPlotProps) {
  const offset = horizontal ? top : left;
  const center = offset + (boxWidth || 0) / 2;
  const valueRange = valueScale.range();

  const minValue = valueScale(min ?? 0);
  const firstQuartileValue = valueScale(firstQuartile ?? 0);
  const medianValue = valueScale(median ?? 0);
  const thirdQuartileValue = valueScale(thirdQuartile ?? 0);
  const maxValue = valueScale(max ?? 0);

  const boxplot: ChildRenderProps = {
    valueRange,
    center,
    offset,
    boxWidth,
    max: {
      x1: center - (boxWidth || 0) / 4,
      x2: center + (boxWidth || 0) / 4,
      y1: maxValue,
      y2: maxValue,
    },
    maxToThird: {
      x1: center,
      x2: center,
      y1: maxValue,
      y2: thirdQuartileValue,
    },
    median: {
      x1: offset,
      x2: offset + (boxWidth || 0),
      y1: medianValue,
      y2: medianValue,
    },
    minToFirst: {
      x1: center,
      x2: center,
      y1: firstQuartileValue,
      y2: minValue,
    },
    min: {
      x1: center - (boxWidth || 0) / 4,
      x2: center + (boxWidth || 0) / 4,
      y1: minValue,
      y2: minValue,
    },
    box: {
      x1: offset,
      x2: boxWidth || 0,
      y1: thirdQuartileValue,
      y2: Math.abs(thirdQuartileValue - firstQuartileValue),
    },
    container: {
      x1: offset,
      x2: boxWidth || 0,
      y1: Math.min(...valueRange),
      y2: Math.abs(valueRange[0] - valueRange[1]),
    },
  };

  if (horizontal) {
    boxplot.max = verticalToHorizontal(boxplot.max);
    boxplot.maxToThird = verticalToHorizontal(boxplot.maxToThird);
    boxplot.box.y1 = firstQuartileValue;
    boxplot.box = verticalToHorizontal(boxplot.box);
    boxplot.median = verticalToHorizontal(boxplot.median);
    boxplot.minToFirst = verticalToHorizontal(boxplot.minToFirst);
    boxplot.min = verticalToHorizontal(boxplot.min);
    boxplot.container = verticalToHorizontal(boxplot.container);
    boxplot.container.y1 = Math.min(...valueRange);
  }

  if (children) return <>{children(boxplot)}</>;

  return (
    <Group className={classnames('visx-boxplot', className)}>
      {outliers.map((d, i) => {
        const cx = horizontal ? valueScale(d) : center;
        const cy = horizontal ? center : valueScale(d);
        return (
          <circle
            key={`visx-boxplot-outlier-${i}`}
            className="visx-boxplot-outlier"
            cx={cx}
            cy={cy}
            r={4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
            fillOpacity={fillOpacity}
            {...outlierProps}
          />
        );
      })}
      <line
        className="visx-boxplot-max"
        x1={boxplot.max.x1}
        y1={boxplot.max.y1}
        x2={boxplot.max.x2}
        y2={boxplot.max.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...maxProps}
      />
      <line
        className="visx-boxplot-max-to-third"
        x1={boxplot.maxToThird.x1}
        y1={boxplot.maxToThird.y1}
        x2={boxplot.maxToThird.x2}
        y2={boxplot.maxToThird.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <rect
        className="visx-boxplot-box"
        x={boxplot.box.x1}
        y={boxplot.box.y1}
        width={boxplot.box.x2}
        height={boxplot.box.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        fillOpacity={fillOpacity}
        rx={rx}
        ry={ry}
        {...boxProps}
      />
      <line
        className="visx-boxplot-median"
        x1={boxplot.median.x1}
        y1={boxplot.median.y1}
        x2={boxplot.median.x2}
        y2={boxplot.median.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...medianProps}
      />
      <line
        className="visx-boxplot-min-to-first"
        x1={boxplot.minToFirst.x1}
        y1={boxplot.minToFirst.y1}
        x2={boxplot.minToFirst.x2}
        y2={boxplot.minToFirst.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        className="visx-boxplot-min"
        x1={boxplot.min.x1}
        y1={boxplot.min.y1}
        x2={boxplot.min.x2}
        y2={boxplot.min.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...minProps}
      />
      {container && (
        <rect
          x={boxplot.container.x1}
          y={boxplot.container.y1}
          width={boxplot.container.x2}
          height={boxplot.container.y2}
          fillOpacity="0"
          {...containerProps}
        />
      )}
    </Group>
  );
}
