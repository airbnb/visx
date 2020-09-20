import React from 'react';
import cx from 'classnames';

type GroupProps = {
  /** Top offset applied to `<g/>`. */
  top?: number;
  /** Left offset applied to `<g/>`. */
  left?: number;
  /** Override `top` and `left` to provide the entire `transform` string. */
  transform?: string;
  /** className to apply to `<g/>`. */
  className?: string;
  children?: React.ReactNode;
  /** ref to underlying `<g/>`. */
  innerRef?: React.Ref<SVGGElement>;
};

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  innerRef,
  ...restProps
}: GroupProps & Omit<React.SVGProps<SVGGElement>, keyof GroupProps>) {
  return (
    <g
      ref={innerRef}
      className={cx('visx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}
