import React from 'react';
import { FlexDirection } from '../../types';

export type LegendItemProps = {
  flexDirection?: FlexDirection;
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
      className="visx-legend-item"
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
