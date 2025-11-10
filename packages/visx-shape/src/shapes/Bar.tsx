import type { Ref } from 'react';
import cx from 'classnames';
import type { AddSVGProps } from '../types';

export type BarProps = {
  /** className to apply to rect element. */
  className?: string;
  /** reference to rect element. */
  innerRef?: Ref<SVGRectElement>;
};

export default function Bar({
  className,
  innerRef,
  ...restProps
}: AddSVGProps<BarProps, SVGRectElement>) {
  return <rect ref={innerRef} className={cx('visx-bar', className)} {...restProps} />;
}
