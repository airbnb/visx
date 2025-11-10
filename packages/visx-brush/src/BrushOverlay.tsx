import type { CSSProperties, PointerEvent } from 'react';
import { Bar } from '@visx/shape';

type BrushOverlayProps = {
  width: number;
  height: number;
  style?: CSSProperties;
  onClick?: (event: PointerEvent<SVGRectElement>) => void;
  onDoubleClick?: (event: PointerEvent<SVGRectElement>) => void;
  onPointerDown?: (event: PointerEvent<SVGRectElement>) => void;
  onPointerLeave?: (event: PointerEvent<SVGRectElement>) => void;
  onPointerMove?: (event: PointerEvent<SVGRectElement>) => void;
  onPointerUp?: (event: PointerEvent<SVGRectElement>) => void;
};

export default function BrushOverlay(props: BrushOverlayProps) {
  return <Bar className="visx-brush-overlay" fill="transparent" x={0} y={0} {...props} />;
}
