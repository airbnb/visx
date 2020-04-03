import React from 'react';
import cx from 'classnames';
import { Platform, Rect } from '@vx/primitives';

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
  return (
    <Rect
      ref={innerRef as any}
      className={Platform.OS === 'web' && cx('vx-bar', className)}
      {...(restProps as any)}
    />
  );
}
