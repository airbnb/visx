import React, { useState } from 'react';
import { AlbersUsa } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './usa-topo.json';
import stateAbbrs from './us-abbr.json';
import { geoCentroid } from 'd3-geo';

export const background = '#EBF4F3';

export type GeoAlbersUsaProps = {
  width: number;
  height: number;
  fullSize: boolean;
};

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

// @ts-ignore
const { features: unitedStates } = topojson.feature(topology, topology.objects.states) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

export const colors: Array<string> = ['#744DCA', '#3D009C', '#9020FF', '#C630FD']

const nudges = {
  'FL': [11, 3],
  'AK': [0, -4],
  'CA': [-7, 0],
  'NY': [5, 0],
  'MI': [13, 20],
  'LA': [-10, -3],
  'HI': [-10, 10],
  'ID': [0, 10],
  'WV': [-2, 4],
  'KY': [10, 0],
  'TN': [0, 4]
}

const GeoAlbersUsa = ({ width, height, fullSize = true }: GeoAlbersUsaProps) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) / 1.55;

  const [ displayLabels, setDisplayLabels ] = useState(fullSize)

  return width < 10 ? null : (
    <>
      <svg width={width} height={height} style={{background, borderRadius: '14px'}}>
        <AlbersUsa<FeatureShape>
          data={unitedStates}
          scale={scale}
          translate={[centerX, centerY - 25]}
        >
          {({ features }) => features.map(({ feature, path, projection }, i) => {
            let coords = projection(geoCentroid(feature))
            let abbr:string = stateAbbrs[feature.id]

            if(nudges[abbr]) {
              coords[0] += nudges[abbr][0]
              coords[1] += nudges[abbr][1]
            }

            let stylesObj = {
              fill: '#FFF',
              fontFamily: 'sans-serif',
              cursor: 'default'
            }

            if(abbr === 'HI') {
              stylesObj.fill = '#3C019C'
            }

            const ignore = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD']

            if(ignore.includes(abbr)) {
              return (
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={(i % 2 === 0) ? colors[0] : colors[1]}
                  stroke={background}
                  strokeWidth={0.5}
                />
              )
            }

            return (
              <>
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={(i % 2 === 0) ? colors[0] : colors[1]}
                  stroke={background}
                  strokeWidth={0.5}
                />
                {displayLabels && <text
                  transform={`translate(${coords})`}
                  fontSize={Math.max( (width / 75), 9)}
                  style={stylesObj}
                  textAnchor="middle"
                >{abbr}</text>}
            </>
              )
          })}
        </AlbersUsa>
      </svg>
      {fullSize && <label style={{position: 'relative', left: '20px', top: '-60px', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" checked={displayLabels} onChange={() => { setDisplayLabels(!displayLabels) }} />
        &nbsp;Display labels
      </label>}
    </>
  );
};

export default GeoAlbersUsa;