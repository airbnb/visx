import React from 'react';
import cx from 'classnames';

export type CircleProps = {
  /** className to apply to circle element. */
  className?: string;
  /** reference to circle element. */
  innerRef?: React.Ref<SVGCircleElement>;
};

export default function Circle({
  className,
  innerRef,
  ...restProps
}: CircleProps & Omit<React.SVGProps<SVGCircleElement>, keyof CircleProps>) {
  return <circle ref={innerRef} className={cx('vx-circle', className)} {...restProps} />;
}
