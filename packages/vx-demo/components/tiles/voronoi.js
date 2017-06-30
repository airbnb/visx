import React from 'react';
import { Group } from '@vx/group';
import { GradientOrangeRed, GradientPinkRed } from '@vx/gradient';
import { RectClipPath } from '@vx/clip-path';

import { voronoi, VoronoiPolygon } from '@vx/voronoi';

export default ({
  width,
  height,
  margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 76,
  },
}) => {
  if (width < 10) return <div />;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const data = Array(150).fill(null).map(() => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    id: Math.random().toString(36).slice(2),
  }));

  const voronoiLayout = voronoi({
    x: d => d.x,
    y: d => d.y,
    width: innerWidth,
    height: innerHeight,
  });

  const polygons = voronoiLayout.polygons(data);

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed id="voronoi_orange_red" />
      <GradientPinkRed id="voronoi_pink_red" />
      <RectClipPath
        id="voronoi_clip"
        width={innerWidth}
        height={innerHeight}
        rx={14}
      />
      <Group
        top={margin.top}
        left={margin.left}
        clipPath="url(#voronoi_clip)"
      >
        {polygons.map(polygon =>
          <VoronoiPolygon
            key={`polygon-${polygon.data.id}`}
            polygon={polygon}
            fill={d =>
              d.id.toLowerCase() <= 'a'
                ? 'url(#voronoi_orange_red)'
                : 'url(#voronoi_pink_red)'}
            stroke="#fff"
            strokeWidth={1}
          />,
        )}
        {data.map(d =>
          <circle
            key={`circle-${d.id}`}
            r={2}
            cx={d.x}
            cy={d.y}
            fill="#ffffff"
            fillOpacity={0.2}
          />,
        )}
      </Group>
    </svg>
  );
};
