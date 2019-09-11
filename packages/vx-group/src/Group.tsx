import React from 'react';
import cx from 'classnames';

type GroupProps = {
  top?: number;
  left?: number;
  transform?: string;
  className?: string;
  children?: React.ReactNode;
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
}: GroupProps) {
  return (
    <g
      ref={innerRef}
      className={cx('vx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}
