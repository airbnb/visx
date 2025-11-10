import type { ReactNode, Ref } from 'react';
import cx from 'classnames';
import type { AddSVGProps } from '../types';

export type BarRoundedProps = {
  /** className to apply to path element. */
  className?: string;
  /** reference to path element. */
  innerRef?: Ref<SVGPathElement>;
  /** left position of the bar */
  x: number;
  /** top position of the bar */
  y: number;
  /** width of the bar starting from x */
  width: number;
  /** height of the bar starting from y */
  height: number;
  /** corner radius of the bar. clamped to center of the shorter side of the bar (Math.min(width,height) / 2) */
  radius: number;
  /** apply corner radius to top left corner, top right corner, bottom right corner, and bottom left corner */
  all?: boolean;
  /** apply corner radius to top left corner, and top right corner */
  top?: boolean;
  /** apply corner radius to bottom right corner, and bottom left corner */
  bottom?: boolean;
  /** apply corner radius to top left corner, and bottom left corner */
  left?: boolean;
  /** apply corner radius to top right corner, and bottom right corner */
  right?: boolean;
  /** apply corner radius to top left corner */
  topLeft?: boolean;
  /** apply corner radius to top right corner */
  topRight?: boolean;
  /** apply corner radius to bottom left corner */
  bottomLeft?: boolean;
  /** apply corner radius to bottom right */
  bottomRight?: boolean;
  /** Optional children override. */
  children?: ({ path }: { path: string }) => ReactNode;
};

/** Hook that returns a BarRounded path. */
export function useBarRoundedPath({
  all,
  bottom,
  bottomLeft,
  bottomRight,
  height,
  left,
  radius,
  right,
  top,
  topLeft,
  topRight,
  width,
  x,
  y,
}: Pick<
  BarRoundedProps,
  | 'all'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'x'
  | 'y'
  | 'width'
  | 'height'
  | 'radius'
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
>) {
  topRight = all || top || right || topRight;
  bottomRight = all || bottom || right || bottomRight;
  bottomLeft = all || bottom || left || bottomLeft;
  topLeft = all || top || left || topLeft;

  // clamp radius to center of shortest side of the rect
  radius = Math.max(1, Math.min(radius, Math.min(width, height) / 2));

  const diameter = 2 * radius;
  const path = `M${x + radius},${y} h${width - diameter}
 ${topRight ? `a${radius},${radius} 0 0 1 ${radius},${radius}` : `h${radius}v${radius}`}
 v${height - diameter}
 ${bottomRight ? `a${radius},${radius} 0 0 1 ${-radius},${radius}` : `v${radius}h${-radius}`}
 h${diameter - width}
 ${bottomLeft ? `a${radius},${radius} 0 0 1 ${-radius},${-radius}` : `h${-radius}v${-radius}`}
 v${diameter - height}
 ${topLeft ? `a${radius},${radius} 0 0 1 ${radius},${-radius}` : `v${-radius}h${radius}`}
z`
    .split('\n')
    .join('');

  return path;
}

export default function BarRounded({
  children,
  className,
  innerRef,
  x,
  y,
  width,
  height,
  radius,
  all = false,
  top = false,
  bottom = false,
  left = false,
  right = false,
  topLeft = false,
  topRight = false,
  bottomLeft = false,
  bottomRight = false,
  ...restProps
}: AddSVGProps<BarRoundedProps, SVGPathElement>) {
  const path = useBarRoundedPath({
    x,
    y,
    width,
    height,
    radius,
    all,
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  });

  if (children) return <>{children({ path })}</>;

  return (
    <path ref={innerRef} className={cx('visx-bar-rounded', className)} d={path} {...restProps} />
  );
}
