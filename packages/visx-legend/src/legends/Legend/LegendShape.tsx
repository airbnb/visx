import ShapeRect from '../../shapes/Rect';
import renderShape from '../../util/renderShape';
import type {
  FillAccessor,
  FormattedLabel,
  LegendShape as LegendShapeType,
  SizeAccessor,
  ShapeStyleAccessor,
} from '../../types';

export type LegendShapeProps<Data, Output> = {
  /** The formatted label object containing datum, index, text, and optional value */
  label: FormattedLabel<Data, Output>;
  /** The data item for this legend entry */
  item: Data;
  /** The index of this item in the legend */
  itemIndex: number;
  /** Margin around the shape */
  margin?: string | number;
  /** The shape component or function to render. Defaults to ShapeRect if not provided. */
  shape?: LegendShapeType<Data, Output>;
  /** Accessor function for the fill color of the shape */
  fill?: FillAccessor<Data, Output>;
  /** Accessor function for the size of the shape */
  size?: SizeAccessor<Data, Output>;
  /** Accessor function for additional shape styling */
  shapeStyle?: ShapeStyleAccessor<Data, Output>;
  /** Width of the shape container */
  width?: string | number;
  /** Height of the shape container */
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
