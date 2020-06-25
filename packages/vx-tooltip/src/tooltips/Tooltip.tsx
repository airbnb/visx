import React from 'react';
import cx from 'classnames';

export type TooltipProps = {
  left?: number;
  top?: number;
  offsetLeft?: number;
  offsetTop?: number;
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
  offsetLeft = 10,
  offsetTop = 10,
  style = defaultStyles,
  children,
  unstyled = false,
  ...restProps
}: TooltipProps & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx('vx-tooltip-portal', className)}
      style={{
        top: top == null || offsetTop == null ? top : top + offsetTop,
        left: left == null || offsetLeft == null ? left : left + offsetLeft,
        ...(!unstyled && style),
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
