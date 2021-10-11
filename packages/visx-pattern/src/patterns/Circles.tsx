import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';

export type PatternCirclesProps = {
  /** Unique id for the pattern. */
  id: string;
  /** Width of the pattern element. */
  width: number;
  /** Height of the pattern element. */
  height: number;
  /** Radius of the pattern circles. */
  radius?: number;
  /** Fill applied to circles. */
  fill?: string;
  /** className applied to circles. */
  className?: string;
  /** stroke applied to circles. */
  stroke?: string;
  /** strokeWidth applied to circles. */
  strokeWidth?: number | string;
  /** strokeDasharray applied to circles. */
  strokeDasharray?: number | string;
  /** Whether to fill in circles within the pattern gaps to increase pattern density. */
  complement?: boolean;
  /** Background color applied behind cirlces. */
  background?: string;
};

export default function Circles({
  id,
  width,
  height,
  radius = 2,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  background,
  complement = false,
  className,
}: PatternCirclesProps) {
  let corners: [number, number][] | undefined;
  if (complement) {
    corners = [
      [0, 0],
      [0, height],
      [width, 0],
      [width, height],
    ];
  }
  return (
    <Pattern id={id} width={width} height={height}>
      {!!background && <rect width={width} height={height} fill={background} />}
      <circle
        className={cx('visx-pattern-circle', className)}
        cx={width / 2}
        cy={height / 2}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {corners?.map(([cornerX, cornerY]) => (
        <circle
          key={`${id}-complement-${cornerX}-${cornerY}`}
          className={cx('visx-pattern-circle visx-pattern-circle-complement', className)}
          cx={cornerX}
          cy={cornerY}
          r={radius}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
      ))}
    </Pattern>
  );
}
