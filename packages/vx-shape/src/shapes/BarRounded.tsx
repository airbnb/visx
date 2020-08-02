import React from 'react';
import cx from 'classnames';

export type BarRoundedProps = {
  /** className to apply to path element. */
  className?: string;
  /** reference to path element. */
  innerRef?: React.Ref<SVGPathElement>;
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
};

export default function BarRounded({
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
}: BarRoundedProps & Omit<React.SVGProps<SVGPathElement>, keyof BarRoundedProps>) {
  topRight = all || top || right || topRight;
  bottomRight = all || bottom || right || bottomRight;
  bottomLeft = all || bottom || left || bottomLeft;
  topLeft = all || top || left || topLeft;

  // clamp radius to center of shortest side of the rect
  radius = Math.min(radius, Math.min(width, height) / 2);

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

  return (
    <path ref={innerRef} className={cx('vx-bar-rounded', className)} d={path} {...restProps} />
  );
}
