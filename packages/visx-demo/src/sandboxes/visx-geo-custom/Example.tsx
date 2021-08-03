/* eslint-disable react/jsx-handler-names */
import React, { useState } from 'react';
import * as topojson from 'topojson-client';
import { scaleQuantize } from '@visx/scale';
import { CustomProjection, Graticule } from '@visx/geo';
import { Projection } from '@visx/geo/lib/types';
import { Zoom } from '@visx/zoom';
import {
  geoConicConformal,
  geoTransverseMercator,
  geoNaturalEarth1,
  geoConicEquidistant,
  geoOrthographic,
  geoStereographic,
} from 'd3-geo';
import topology from './world-topo.json';

export type GeoCustomProps = {
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

export const background = '#252b7e';
const purple = '#201c4e';
const PROJECTIONS: { [projection: string]: Projection } = {
  geoConicConformal,
  geoTransverseMercator,
  geoNaturalEarth1,
  geoConicEquidistant,
  geoOrthographic,
  geoStereographic,
};

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
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

export default function GeoCustom({ width, height, events = true }: GeoCustomProps) {
  const [projection, setProjection] = useState<keyof typeof PROJECTIONS>('geoConicConformal');

  const centerX = width / 2;
  const centerY = height / 2;
  const initialScale = (width / 630) * 100;

  return width < 10 ? null : (
    <>
      <Zoom
        width={width}
        height={height}
        scaleXMin={100}
        scaleXMax={1000}
        scaleYMin={100}
        scaleYMax={1000}
        transformMatrix={{
          scaleX: initialScale,
          scaleY: initialScale,
          translateX: centerX,
          translateY: centerY,
          skewX: 0,
          skewY: 0,
        }}
      >
        {(zoom) => (
          <div className="container">
            <svg width={width} height={height} className={zoom.isDragging ? 'dragging' : undefined}>
              <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
              <CustomProjection<FeatureShape>
                projection={PROJECTIONS[projection]}
                data={world.features}
                scale={zoom.transformMatrix.scaleX}
                translate={[zoom.transformMatrix.translateX, zoom.transformMatrix.translateY]}
              >
                {(customProjection) => (
                  <g>
                    <Graticule graticule={(g) => customProjection.path(g) || ''} stroke={purple} />
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

              {/** intercept all mouse events */}
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
              />
            </svg>
            {events && (
              <div className="controls">
                <button
                  className="btn btn-zoom"
                  onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                >
                  +
                </button>
                <button
                  className="btn btn-zoom btn-bottom"
                  onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                >
                  -
                </button>
                <button className="btn btn-lg" onClick={zoom.reset}>
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </Zoom>
      <label>
        projection:{' '}
        <select onChange={(event) => setProjection(event.target.value)}>
          {Object.keys(PROJECTIONS).map((projectionName) => (
            <option key={projectionName} value={projectionName}>
              {projectionName}
            </option>
          ))}
        </select>
      </label>
      <style jsx>{`
        .container {
          position: relative;
        }
        svg {
          cursor: grab;
        }
        svg.dragging {
          cursor: grabbing;
        }
        .btn {
          margin: 0;
          text-align: center;
          border: none;
          background: #dde1fe;
          color: #222;
          padding: 0 4px;
          border-top: 1px solid #8993f9;
        }
        .btn-lg {
          font-size: 12px;
          line-height: 1;
          padding: 4px;
        }
        .btn-zoom {
          width: 26px;
          font-size: 22px;
        }
        .btn-bottom {
          margin-bottom: 1rem;
        }
        .controls {
          position: absolute;
          bottom: 20px;
          right: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        label {
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
