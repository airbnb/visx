import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';
import { PatternOrientation, PatternOrientationType } from '../constants';

function pathForOrientation({
  height,
  orientation,
}: {
  height: number;
  orientation: PatternOrientationType;
}) {
  let path;

  switch (orientation) {
    case PatternOrientation.vertical:
      path = `M ${height / 2}, 0 l 0, ${height}`;
      break;
    case PatternOrientation.horizontal:
      path = `M 0,${height / 2} l ${height},0`;
      break;
    case PatternOrientation.diagonal:
      path = `M 0,${height} l ${height},${-height} M ${-height / 4},${height / 4} l ${height /
        2},${-height / 2}
             M ${(3 / 4) * height},${(5 / 4) * height} l ${height / 2},${-height / 2}`;
      break;
    default:
      path = `M ${height / 2}, 0 l 0, ${height}`;
  }

  return path;
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

export default function PatternLines({
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
          className={cx('vx-pattern-line-background')}
          width={width}
          height={height}
          fill={background}
        />
      )}
      {orientations.map((o, i) => {
        return (
          <path
            key={`vx-${id}-line-${o}-${i}`}
            className={cx('vx-pattern-line', className)}
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
