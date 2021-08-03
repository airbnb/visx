import React from 'react';
import cx from 'classnames';
import Path from './Path';

export type PatternHexagonsProps = {
  /** Unique id for the pattern. */
  id: string;
  /** Height of the pattern element. */
  height: number;
  /** Size of the hexagon shape. */
  size?: number;
  /** Fill applied to hexagons. */
  fill?: string;
  /** className applied to hexagon path element. */
  className?: string;
  /** Background color applied behind hexagons. */
  background?: string;
  /** Stroke color applied to hexagon paths. */
  stroke?: string;
  /** strokeWidth applied to hexagon paths. */
  strokeWidth?: number | string;
  /** strokeDasharray applied to hexagon paths. */
  strokeDasharray?: string | number;
  /** strokeLinecap applied to hexagon paths. */
  strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
  /** shapeRendering applied to hexagon paths. */
  shapeRendering?: string | number;
};

export default function Hexagons({
  id,
  height,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap,
  shapeRendering,
  background,
  className,
  size = 3,
}: PatternHexagonsProps) {
  const sqrtSize = Math.sqrt(size);
  return (
    <Path
      className={cx('visx-pattern-hexagon', className)}
      path={`M ${height},0 l ${height},0 l ${height / 2},${(height * sqrtSize) / 2} l ${
        -height / 2
      },${(height * sqrtSize) / 2} l ${-height},0 l ${-height / 2},${
        (-height * sqrtSize) / 2
      } Z M 0,${(height * sqrtSize) / 2} l ${height / 2},0 M ${3 * height},${
        (height * sqrtSize) / 2
      } l ${-height / 2},0`}
      id={id}
      width={size}
      height={sqrtSize}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap={strokeLinecap}
      shapeRendering={shapeRendering}
      background={background}
    />
  );
}
