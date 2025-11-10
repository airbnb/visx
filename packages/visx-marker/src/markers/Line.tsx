import type { MarkerComponentProps } from './Marker';
import Marker from './Marker';

export default function MarkerLine({
  id,
  size = 9,
  fill,
  stroke,
  strokeWidth = 1,
  ...restProps
}: MarkerComponentProps) {
  const max = Math.max(size, strokeWidth * 2);
  const midX = max / 2;
  const midY = size / 2;
  return (
    <Marker
      id={id}
      markerWidth={max}
      markerHeight={size}
      refX={midX}
      refY={midY}
      orient="auto"
      markerUnits="strokeWidth"
      fill={fill || stroke}
      stroke="none"
      {...restProps}
    >
      <rect width={strokeWidth} height={size} x={midX} />
    </Marker>
  );
}
