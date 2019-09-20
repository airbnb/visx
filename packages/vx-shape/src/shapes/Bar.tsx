import React from 'react';
import cx from 'classnames';

export type BarProps = {
  /** className to apply to rect element. */
  className?: string;
  /** reference to rect element. */
  innerRef?: React.Ref<SVGRectElement>;
};

export default function Bar({
  className,
  innerRef,
  ...restProps
}: BarProps & Omit<React.SVGProps<SVGRectElement>, keyof BarProps>) {
  return <rect ref={innerRef} className={cx('vx-bar', className)} {...restProps} />;
}
