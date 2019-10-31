import React from 'react';

export type LegendLabelProps = {
  align?: string;
  label?: React.ReactNode;
  flex?: string | number;
  margin?: string | number;
  children?: React.ReactNode;
};

export default function LegendLabel({
  flex = '1',
  label,
  margin = '5px 0',
  align = 'left',
  children,
  ...restProps
}: LegendLabelProps & Omit<React.HTMLProps<HTMLDivElement>, keyof LegendLabelProps>) {
  return (
    <div
      className="vx-legend-label"
      style={{
        justifyContent: align,
        display: 'flex',
        flex,
        margin,
      }}
      {...restProps}
    >
      {children || label}
    </div>
  );
}
