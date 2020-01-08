import React from 'react';
import Show from '../components/Show';
import GeoCustom from '../components/tiles/Geo-Custom';

export default () => {
  return (
    <Show events component={GeoCustom} title="Geo Custom">
      {`import React, { useState } from 'react';
import * as topojson from 'topojson-client';
import { scaleQuantize } from '@vx/scale';
import { CustomProjection, Graticule } from '@vx/geo';
import { Projection } from '@vx/geo/lib/types';
import {
  geoConicConformal,
  geoTransverseMercator,
  geoNaturalEarth1,
  geoConicEquidistant,
  geoOrthographic,
  geoStereographic,
} from 'd3-geo';

import topology from '../../static/vx-geo/world-topo.json';
import { ShowProvidedProps } from '../../types';

interface FeatureShape {
  type: 'Feature';
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
  id: string;
}

const bg = '#252b7e';
const purple = '#201c4e';

const world: { type: 'FeatureCollection'; features: FeatureShape[] } = topojson.feature(
  topology,
  topology.objects.units,
);

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map(f => f.geometry.coordinates.length)),
    Math.max(...world.features.map(f => f.geometry.coordinates.length)),
  ],
  range: [
    '#019ece',
    '#f4448b',
    '#fccf35',
    '#82b75d',
    '#b33c88',
    '#fc5e2f',
    '#f94b3a',
    '#f63a48',
    '#dde1fe',
    '#8993f9',
    '#b6c8fb',
    '#65fe8d',
  ],
});

export default function GeoCustom({ width, height, events = false }: ShowProvidedProps) {
  const [projection, setProjection] = useState<Projection>(geoConicConformal);
  const [scaleFactor, setScaleFactor] = useState<number>(630);

  if (width < 10) return <div />;

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / scaleFactor) * 100;

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
        <CustomProjection<FeatureShape>
          projection={projection}
          data={world.features}
          scale={scale}
          translate={[centerX, centerY]}
        >
          {customProjection => (
            <g>
              <Graticule graticule={g => customProjection.path(g) || ''} stroke={purple} />
              {customProjection.features.map(({ feature, path }, i) => (
                <path
                  key={\`map-feature-\${i}\`}
                  d={path || ''}
                  fill={color(feature.geometry.coordinates.length)}
                  stroke={bg}
                  strokeWidth={0.5}
                  onClick={() => {
                    if (events) alert(\`Clicked: \${feature.properties.name} (\${feature.id})\`);
                  }}
                />
              ))}
            </g>
          )}
        </CustomProjection>
      </svg>
      <div>
        <label>
          projection:{' '}
          <select
            onChange={event => {
              const { value } = event.target;
              switch (value) {
                case '1':
                  return setProjection(geoConicConformal);
                case '2':
                  return setProjection(geoTransverseMercator);
                case '3':
                  return setProjection(geoNaturalEarth1);
                case '4':
                  return setProjection(geoOrthographic);
                case '5':
                  return setProjection(geoStereographic);
                case '6':
                default:
                  return setProjection(geoConicEquidistant);
              }
            }}
          >
            <option value={1}>geoConicConformal</option>
            <option value={2}>geoTransverseMercator</option>
            <option value={3}>geoNaturalEarth1</option>
            <option value={4}>geoOrthographic</option>
            <option value={5}>geoStereographic</option>
            <option value={6}>geoConicEquidistant</option>
          </select>
        </label>
        <label>
          {' '}
          scale factor:{' '}
          <input
            onChange={event => {
              const { value } = event.target;
              setScaleFactor(Number(value));
            }}
            type="range"
            defaultValue={scaleFactor}
            max="1000"
            min="100"
            step={10}
          />
        </label>
      </div>
    </div>
  );
}

`}
    </Show>
  );
};
