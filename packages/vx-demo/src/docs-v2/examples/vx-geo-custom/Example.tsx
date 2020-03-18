import React, { useState } from 'react';
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
import topology from './world-topo.json';

type Props = {
  width: number;
  height: number;
  events?: boolean;
};

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

const background = '#252b7e';
const purple = '#201c4e';
const PROJECTIONS: { [projection: string]: Projection } = {
  geoConicConformal,
  geoTransverseMercator,
  geoNaturalEarth1,
  geoConicEquidistant,
  geoOrthographic,
  geoStereographic,
}

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

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

export default function GeoCustom({ width, height, events = false }: Props) {
  const [projection, setProjection] = useState<keyof typeof PROJECTIONS>('geoConicConformal');
  const [scaleFactor, setScaleFactor] = useState<number>(630);

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / scaleFactor) * 100;

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <CustomProjection<FeatureShape>
          projection={PROJECTIONS[projection]}
          data={world.features}
          scale={scale}
          translate={[centerX, centerY]}
        >
          {customProjection => (
            <g>
              <Graticule graticule={g => customProjection.path(g) || ''} stroke={purple} />
              {customProjection.features.map(({ feature, path }, i) => (
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={color(feature.geometry.coordinates.length)}
                  stroke={background}
                  strokeWidth={0.5}
                  onClick={() => {
                    if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
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
            onChange={event => setProjection(event.target.value)}
          >
            {Object.keys(PROJECTIONS).map((projectionName) => (
              <option key={projectionName} value={projectionName}>{projectionName}</option>
            )}
          </select>
        </label>
        <label>
          {' '}
          scale factor:{' '}
          <input
            onChange={event => setScaleFactor(Number(event.target.value))}
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
