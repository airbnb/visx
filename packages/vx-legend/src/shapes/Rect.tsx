import React from 'react';

export type ShapeRectProps = {
  fill?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
};

export default function ShapeRect({ fill, width, height, style }: ShapeRectProps) {
  return (
    <div
      style={{
        width,
        height,
        background: fill,
        ...style,
      }}
    />
  );
}
