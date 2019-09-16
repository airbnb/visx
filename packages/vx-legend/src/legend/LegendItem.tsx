import React from 'react';

export type LegendItemProps = {
  flexDirection?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  margin?: React.CSSProperties['margin'];
  children?: React.ReactNode;
  display?: React.CSSProperties['display'];
};

export default function LegendItem({
  flexDirection = 'row',
  alignItems = 'center',
  margin = '0',
  display = 'flex',
  children,
  ...restProps
}: LegendItemProps) {
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
