import React from 'react';
import ShapeRect from '../shapes/Rect';
import renderShape from '../util/renderShape';
import { FormattedLabel, LegendShape, BaseInput, BaseOutput } from '../types';

export type LegendShapeProps<Data, Output> = {
  label: FormattedLabel<Data, Output>;
  margin?: string | number;
  shape?: LegendShape<Data, Output>;
  fill?: (label: FormattedLabel<Data, Output>) => any;
  size?: (label: FormattedLabel<Data, Output>) => any;
  shapeStyle?: (label: FormattedLabel<Data, Output>) => any;
  width?: string | number;
  height?: string | number;
};

export default function LegendShape<Data extends BaseInput, Output extends BaseOutput>({
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
