import React from 'react';
import ShapeRect from '../shapes/Rect';
import renderShape from '../util/renderShape';
import { FormattedLabel, LegendShape } from '../types';

export type LegendShapeProps<Data, Output> = {
  label: FormattedLabel<Data, Output>;
  margin?: React.CSSProperties['margin'];
  shape?: LegendShape;
  fill?: (label: FormattedLabel<Data, Output>) => any;
  size?: (label: FormattedLabel<Data, Output>) => any;
  shapeStyle?: (label: FormattedLabel<Data, Output>) => any;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
};

export default function LegendShape<Data, Output>({
  shape = ShapeRect,
  width,
  height,
  margin,
  label,
  fill,
  size,
  shapeStyle,
}: LegendShapeProps<Data, Output>) {
  return (
    <div
      className="vx-legend-shape"
      style={{
        display: 'flex',
        width: size ? size({ ...label }) : width,
        height: size ? size({ ...label }) : height,
        margin,
      }}
    >
      {renderShape<Data, Output>({
        shape,
        label,
        width,
        height,
        fill,
        shapeStyle,
      })}
    </div>
  );
}
