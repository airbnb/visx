import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientPurpleTeal as Gradient } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { delaunay, Polygon } from '@visx/delaunay';
import { localPoint } from '@visx/event';
import { getSeededRandom } from '@visx/mock-data';

type Datum = {
  x: number;
  y: number;
  id: string;
};

const seededRandom = getSeededRandom(0.88);

const data: Datum[] = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
}));

const defaultMargin = {
  top: 16,
  left: 16,
  right: 16,
  bottom: 92,
};

export type DelaunayTriangulationProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function Example({ width, height, margin = defaultMargin }: DelaunayTriangulationProps) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const delaunayDiagram = useMemo(
    () =>
      delaunay<Datum>({
        data,
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
      }),
    [innerWidth, innerHeight],
  );
  const triangles = Array.from(delaunayDiagram.trianglePolygons());

  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return width < 10 ? null : (
    <div className="delaunay-triangulation">
      <svg width={width} height={height} ref={svgRef}>
        <Gradient id="delaunay_purple_teal" />
        <RectClipPath id="delaunay_clip" width={innerWidth} height={innerHeight} rx={14} />
        <Group
          top={margin.top}
          left={margin.left}
          clipPath="url(#delaunay_clip)"
          onMouseMove={(event) => {
            if (!svgRef.current) return;

            // find the nearest point to the current mouse position.
            const point = localPoint(svgRef.current, event);
            if (!point) return;

            const closest = delaunayDiagram.find(point.x - margin.left, point.y - margin.top);
            setHoveredId(data[closest].id);
          }}
          onMouseLeave={() => {
            setHoveredId(null);
          }}
        >
          {triangles.map((triangle, i) => (
            <Polygon
              key={`triangle-${i}`}
              polygon={triangle}
              fill="url(#delaunay_purple_teal)"
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
          {data.map(({ x, y, id }) => (
            <circle
              key={`circle-${id}`}
              r={2}
              cx={x * innerWidth}
              cy={y * innerHeight}
              fill={id === hoveredId ? '#5B247A' : '#fff'}
              fillOpacity={0.8}
            />
          ))}
        </Group>
      </svg>
      <style jsx>{`
        .delaunay-triangulation {
          background-color: black;
          border-radius: 14px;
        }
      `}</style>
    </div>
  );
}

export default Example;
