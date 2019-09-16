import React from 'react';

export type LegendLabelProps = {
  align?: React.CSSProperties['justifyContent'];
  label?: React.ReactNode;
  flex?: React.CSSProperties['flex'];
  margin?: React.CSSProperties['margin'];
  children?: React.ReactNode;
};

export default function LegendLabel({
  flex = '1',
  label,
  margin = '5px 0',
  align = 'left',
  children,
}: LegendLabelProps) {
  return (
    <div
      className="vx-legend-label"
      style={{
        justifyContent: align,
        display: 'flex',
        flex,
        margin,
      }}
    >
      {children || label}
    </div>
  );
}
