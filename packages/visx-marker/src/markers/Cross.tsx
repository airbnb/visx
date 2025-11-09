import type { MarkerComponentProps } from './Marker';
import Marker from './Marker';

export default function MarkerCross({
  id,
  size = 9,
  strokeWidth = 1,
  ...restProps
}: MarkerComponentProps) {
  const bounds = size + strokeWidth;
  const mid = size / 2;
  const points = `0 ${mid}, ${mid} ${mid}, ${mid} 0, ${mid} ${size}, ${mid} ${mid}, ${size} ${mid}`;
  return (
    <Marker
      id={id}
      markerWidth={bounds}
      markerHeight={bounds}
      refX={mid}
      refY={mid}
      orient="auto"
      markerUnits="strokeWidth"
      fill="none"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <polyline points={points} />
    </Marker>
  );
}
