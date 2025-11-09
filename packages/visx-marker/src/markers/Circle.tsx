import type { MarkerComponentProps } from './Marker';
import Marker from './Marker';

export default function MarkerCircle({
  id,
  size = 9,
  strokeWidth = 1,
  ...restProps
}: MarkerComponentProps) {
  const diameter = size * 2;
  const bounds = diameter + strokeWidth;
  const mid = bounds / 2;
  return (
    <Marker
      id={id}
      markerWidth={bounds}
      markerHeight={bounds}
      refX={0}
      refY={mid}
      orient="auto-start-reverse"
      markerUnits="strokeWidth"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <circle r={size} cx={mid} cy={mid} />
    </Marker>
  );
}
