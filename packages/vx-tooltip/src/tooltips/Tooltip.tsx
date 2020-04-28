import React from 'react';
import cx from 'classnames';

export type TooltipProps = {
  left?: number;
  top?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  unstyled?: boolean;
};

export const defaultStyles: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: 'white',
  color: '#666666',
  padding: '.3rem .5rem',
  borderRadius: '3px',
  fontSize: '14px',
  boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
  lineHeight: '1em',
  pointerEvents: 'none',
};

export default function Tooltip({
  className,
  top,
  left,
  style = defaultStyles,
  children,
  unstyled = false,
  ...restProps
}: TooltipProps & JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cx('vx-tooltip-portal', className)}
      style={{ top, left, ...(!unstyled && style) }}
      {...restProps}
    >
      {children}
    </div>
  );
}
