import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';
import { PatternOrientation, PatternOrientationType } from '../constants';

export function pathForOrientation({
  height,
  orientation,
}: {
  height: number;
  orientation: PatternOrientationType;
}) {
  switch (orientation) {
    case PatternOrientation.horizontal:
      return `M 0,${height / 2} l ${height},0`;
    case PatternOrientation.diagonal:
      return `M 0,${height} l ${height},${-height} M ${-height / 4},${height / 4} l ${height / 2},${
        -height / 2
      }
             M ${(3 / 4) * height},${(5 / 4) * height} l ${height / 2},${-height / 2}`;
    case PatternOrientation.diagonalRightToLeft:
      return `M 0,0 l ${height},${height}
        M ${-height / 4},${(3 / 4) * height} l ${height / 2},${height / 2}
        M ${(3 / 4) * height},${-height / 4} l ${height / 2},${height / 2}`;
    case PatternOrientation.vertical:
    default:
      return `M ${height / 2}, 0 l 0, ${height}`;
  }
}

export type PatternLinesProps = {
  /** Unique id for the pattern. */
  id: string;
  /** Width of the pattern element. */
  width: number;
  /** Height of the pattern element. */
  height: number;
  /** className applied to line path element. */
  className?: string;
  /** Background color applied behind lines. */
  background?: string;
  /** Stroke color applied to path elements. */
  stroke?: string;
  /** strokeWidth applied to path elements. */
  strokeWidth?: number | string;
  /** strokeDasharray applied to path elements. */
  strokeDasharray?: string | number;
  /** strokeLinecap applied to path elements. */
  strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
  /** shapeRendering applied to path elements. */
  shapeRendering?: string | number;
  /** Array of orientations to render (can mix multiple). */
  orientation?: PatternOrientationType[];
};

export default function Lines({
  id,
  width,
  height,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap = 'square',
  shapeRendering = 'auto',
  orientation = ['vertical'],
  background,
  className,
}: PatternLinesProps) {
  const orientations = Array.isArray(orientation) ? orientation : [orientation];

  return (
    <Pattern id={id} width={width} height={height}>
      {!!background && (
        <rect
          className={cx('visx-pattern-line-background')}
          width={width}
          height={height}
          fill={background}
        />
      )}
      {orientations.map((o, i) => {
        return (
          <path
            key={`visx-${id}-line-${o}-${i}`}
            className={cx('visx-pattern-line', className)}
            d={pathForOrientation({ orientation: o, height })}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap={strokeLinecap}
            shapeRendering={shapeRendering}
          />
        );
      })}
    </Pattern>
  );
}
