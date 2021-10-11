import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientOrangeRed, GradientPinkRed } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
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

const neighborRadius = 75;

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

const Example = ({ width, height, margin = defaultMargin }: VoronoiProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const voronoiLayout = useMemo(
    () =>
      voronoi<Datum>({
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      })(data),
    [innerWidth, innerHeight],
  );

  const polygons = voronoiLayout.polygons();
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

          const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
          // find neighboring polygons to hightlight
          if (closest && closest.data.id !== hoveredId) {
            const neighbors = new Set<string>();
            const cell = voronoiLayout.cells[closest.index];
            if (!cell) return;

            cell.halfedges.forEach((index) => {
              const edge = voronoiLayout.edges[index];
              const { left, right } = edge;
              if (left && left !== closest) neighbors.add(left.data.id);
              else if (right && right !== closest) neighbors.add(right.data.id);
            });

            setNeighborIds(neighbors);
            setHoveredId(closest.data.id);
          }
        }}
        onMouseLeave={() => {
          setHoveredId(null);
          setNeighborIds(new Set());
        }}
      >
        {polygons.map((polygon) => (
          <VoronoiPolygon
            key={`polygon-${polygon.data.id}`}
            polygon={polygon}
            fill={
              hoveredId && (polygon.data.id === hoveredId || neighborIds.has(polygon.data.id))
                ? 'url(#voronoi_orange_red)'
                : 'url(#voronoi_pink_red)'
            }
            stroke="#fff"
            strokeWidth={1}
            fillOpacity={hoveredId && neighborIds.has(polygon.data.id) ? 0.5 : 1}
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
};

export default Example;
