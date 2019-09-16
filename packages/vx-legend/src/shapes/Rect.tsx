import React from 'react';

export type ShapeRectProps = {
  fill: React.CSSProperties['background'];
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  style: React.CSSProperties;
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
