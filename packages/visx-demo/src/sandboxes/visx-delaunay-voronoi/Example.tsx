import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientOrangeRed, GradientPinkRed } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { voronoi, Polygon } from '@visx/delaunay';
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
  top: 0,
  left: 0,
  right: 0,
  bottom: 76,
};

export type VoronoiProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function Example({ width, height, margin = defaultMargin }: VoronoiProps) {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const voronoiDiagram = useMemo(
    () =>
      voronoi<Datum>({
        data,
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      }),
    [innerWidth, innerHeight],
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [neighborIds, setNeighborIds] = useState<Set<string>>(new Set());

  return width < 10 ? null : (
    <svg width={width} height={height} ref={svgRef}>
      <GradientOrangeRed id="voronoi_orange_red" />
      <GradientPinkRed id="voronoi_pink_red" />
      <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} rx={14} />
      <Group
        top={margin.top}
        left={margin.left}
        clipPath="url(#voronoi_clip)"
        onMouseMove={(event) => {
          if (!svgRef.current) return;

          // find the nearest polygon to the current mouse position
          const point = localPoint(svgRef.current, event);
          if (!point) return;

          const closest = voronoiDiagram.delaunay.find(point.x, point.y);
          // find neighboring polygons to hightlight
          if (data[closest].id !== hoveredId) {
            const neighbors = Array.from(voronoiDiagram.neighbors(closest));
            setNeighborIds(new Set(neighbors.map((d) => data[d].id)));
            setHoveredId(data[closest].id);
          }
        }}
        onMouseLeave={() => {
          setHoveredId(null);
          setNeighborIds(new Set());
        }}
      >
        {data.map((d, i) => (
          <Polygon
            key={`polygon-${d.id}`}
            polygon={voronoiDiagram.cellPolygon(i)}
            fill={
              hoveredId && (d.id === hoveredId || neighborIds.has(d.id))
                ? 'url(#voronoi_orange_red)'
                : 'url(#voronoi_pink_red)'
            }
            stroke="#fff"
            strokeWidth={1}
            fillOpacity={hoveredId && neighborIds.has(d.id) ? 0.5 : 1}
          />
        ))}
        {data.map(({ x, y, id }) => (
          <circle
            key={`circle-${id}`}
            r={2}
            cx={x * innerWidth}
            cy={y * innerHeight}
            fill={id === hoveredId ? 'fuchsia' : '#fff'}
            fillOpacity={0.8}
          />
        ))}
      </Group>
    </svg>
  );
}

export default Example;
