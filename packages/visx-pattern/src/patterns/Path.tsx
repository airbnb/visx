import cx from 'classnames';
import Pattern from './Pattern';

export type PatternPathProps = {
  /** Unique id for the pattern. */
  id: string;
  /** Width of the pattern element. */
  width: number;
  /** Height of the pattern element. */
  height: number;
  /** d attribute of the path element */
  path?: string;
  /** fill color applied to path. */
  fill?: string;
  /** className applied to the path element. */
  className?: string;
  /** Background color applied behind path. */
  background?: string;
  /** Stroke color applied to path. */
  stroke?: string;
  /** strokeWidth applied to path. */
  strokeWidth?: number | string;
  /** strokeDasharray applied to path. */
  strokeDasharray?: string | number;
  /** strokeLinecap applied to path. */
  strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit';
  /** shapeRendering applied to path. */
  shapeRendering?: string | number;
};

export default function Path({
  id,
  width,
  height,
  path,
  fill = 'transparent',
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap = 'square',
  shapeRendering = 'auto',
  background,
  className,
}: PatternPathProps) {
  return (
    <Pattern id={id} width={width} height={height}>
      {!!background && <rect width={width} height={height} fill={background} />}
      <path
        className={cx('visx-pattern-path', className)}
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap={strokeLinecap}
        shapeRendering={shapeRendering}
      />
    </Pattern>
  );
}
