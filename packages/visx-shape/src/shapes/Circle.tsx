import type { Ref } from 'react';
import cx from 'classnames';
import type { AddSVGProps } from '../types';

export type CircleProps = {
  /** className to apply to circle element. */
  className?: string;
  /** reference to circle element. */
  innerRef?: Ref<SVGCircleElement>;
};

export default function Circle({
  className,
  innerRef,
  ...restProps
}: AddSVGProps<CircleProps, SVGCircleElement>) {
  return <circle ref={innerRef} className={cx('visx-circle', className)} {...restProps} />;
}
