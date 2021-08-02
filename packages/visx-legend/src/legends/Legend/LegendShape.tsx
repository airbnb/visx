import React from 'react';
import ShapeRect from '../../shapes/Rect';
import renderShape from '../../util/renderShape';
import {
  FillAccessor,
  FormattedLabel,
  LegendShape as LegendShapeType,
  SizeAccessor,
  ShapeStyleAccessor,
} from '../../types';

export type LegendShapeProps<Data, Output> = {
  label: FormattedLabel<Data, Output>;
  item: Data;
  itemIndex: number;
  margin?: string | number;
  shape?: LegendShapeType<Data, Output>;
  fill?: FillAccessor<Data, Output>;
  size?: SizeAccessor<Data, Output>;
  shapeStyle?: ShapeStyleAccessor<Data, Output>;
  width?: string | number;
  height?: string | number;
};

export default function LegendShape<Data, Output>({
  shape = ShapeRect,
  width,
  height,
  margin,
  label,
  item,
  itemIndex,
  fill,
  size,
  shapeStyle,
}: LegendShapeProps<Data, Output>) {
  return (
    <div
      className="visx-legend-shape"
      style={{
        display: 'flex',
        width: size ? size({ ...label }) : width,
        height: size ? size({ ...label }) : height,
        margin,
      }}
    >
      {renderShape<Data, Output>({
        shape,
        item,
        itemIndex,
        label,
        width,
        height,
        fill,
        shapeStyle,
      })}
    </div>
  );
}
