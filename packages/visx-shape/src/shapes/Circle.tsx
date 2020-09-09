import React from 'react';
import cx from 'classnames';
import { AddSVGProps } from '../types';

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
}: AddSVGProps<CircleProps, SVGCircleElement>) {
  return <circle ref={innerRef} className={cx('visx-circle', className)} {...restProps} />;
}
