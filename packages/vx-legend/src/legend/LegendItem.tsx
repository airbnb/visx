import React from 'react';

export type LegendItemProps = {
  flexDirection?:
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'column'
    | 'column-reverse'
    | 'row'
    | 'row-reverse';
  alignItems?: string;
  margin?: string | number;
  children?: React.ReactNode;
  display?: string;
};

export default function LegendItem({
  flexDirection = 'row',
  alignItems = 'center',
  margin = '0',
  display = 'flex',
  children,
  ...restProps
}: LegendItemProps & Omit<React.HTMLProps<HTMLDivElement>, keyof LegendItemProps>) {
  return (
    <div
      className="vx-legend-item"
      style={{
        display,
        alignItems,
        flexDirection,
        margin,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
