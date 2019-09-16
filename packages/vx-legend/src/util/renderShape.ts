import React from 'react';
import ShapeRect from '../shapes/Rect';
import ShapeCircle from '../shapes/Circle';
import valueOrIdentity from './valueOrIdentity';
import {
  LegendShape,
  FormattedLabel,
  FillAccessor,
  SizeAccessor,
  ShapeStyleAccessor,
} from '../types';

interface RenderShape<Data, Output> {
  shape?: LegendShape;
  label: FormattedLabel<Data, Output>;
  fill?: FillAccessor<Data, Output>;
  size?: SizeAccessor<Data, Output>;
  shapeStyle?: ShapeStyleAccessor<Data, Output>;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

const NO_OP = () => undefined;

export default function renderShape<Data = any, Output = any>({
  shape = 'rect',
  fill = NO_OP,
  size = NO_OP,
  width,
  height,
  label,
  shapeStyle = NO_OP,
}: RenderShape<Data, Output>) {
  const props = {
    width,
    height,
    label,
    fill: fill({ ...label }),
    size: size({ ...label }),
    style: shapeStyle({ ...label }),
  };
  if (typeof shape === 'string') {
    if (shape === 'rect') {
      return <ShapeRect {...props} />;
    }
    return <ShapeCircle {...props} />;
  }
  if (React.isValidElement(shape)) {
    return React.cloneElement(shape, props);
  }
  if (shape) {
    return React.createElement(shape, props as React.Attributes);
  }
  return null;
}
