import React, { ReactNode } from 'react';
import cx from 'classnames';
import { Platform, G } from '@vx/primitives';

type GroupProps = {
  top?: number;
  left?: number;
  transform?: string;
  className?: string;
  children?: ReactNode;
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
    <G
      ref={innerRef as React.Ref<any>}
      className={Platform.OS === 'web' ? cx('vx-group', className) : undefined}
      transform={transform || `translate(${left}, ${top})`}
      {...(restProps as any)}
    >
      {children}
    </G>
  );
}
