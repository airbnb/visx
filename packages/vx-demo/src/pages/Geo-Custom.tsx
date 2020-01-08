import React from 'react';
import Show from '../components/Show';
import GeoCustom from '../components/tiles/Geo-Custom';

export default () => {
  return (
    <Show events component={GeoCustom} title="Geo Custom">
      {`import React from 'react';
import * as topojson from 'topojson-client';
import { scaleQuantize } from '@vx/scale';
import { CustomProjection, Graticule } from '@vx/geo';
import {
  geoConicConformal,
  geoTransverseMercator,
  geoNaturalEarth1,
  geoConicEquidistant,
  geoOrthographic,
  geoStereographic
} from 'd3-geo';

import topology from '../../static/vx-geo/world-topo.json';

const bg = '#252b7e';
const purple = '#201c4e';

const world = topojson.feature(topology, topology.objects.units);
const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map(f => f.geometry.coordinates.length)),
    Math.max(...world.features.map(f => f.geometry.coordinates.length))
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
    '#65fe8d'
  ]
});

export default class GeoCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projection: geoConicConformal, scaleFactor: 630 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  handleSelect(event) {
    const { value } = event.target;
    let nextProjection;
    if (value === '1') {
      nextProjection = geoConicConformal;
    } else if (value === '2') {
      nextProjection = geoTransverseMercator;
    } else if (value === '3') {
      nextProjection = geoNaturalEarth1;
    } else if (value === '4') {
      nextProjection = geoOrthographic;
    } else if (value === '5') {
      nextProjection = geoStereographic;
    } else if (value === '6') {
      nextProjection = geoConicEquidistant;
    }
    this.setState({ projection: nextProjection });
  }

  handleSlider(event) {
    const { value } = event.target;
    this.setState({ scaleFactor: value });
  }

  render() {
    const { width, height, events = false } = this.props;
    const { projection, scaleFactor } = this.state;

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / scaleFactor) * 100;

    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
          <CustomProjection
            projection={projection}
            data={world.features}
            scale={scale}
            translate={[centerX, centerY]}
          >
            {customProjection => {
              return (
                <g>
                  <Graticule graticule={g => customProjection.path(g)} stroke={purple} />
                  {customProjection.features.map((feature, i) => {
                    const { feature: f } = feature;
                    return (
                      <path
                        key={\`map-feature-\${i}\`}
                        d={feature.path}
                        fill={color(f.geometry.coordinates.length)}
                        stroke={bg}
                        strokeWidth={0.5}
                        onClick={event => {
                          alert(\`Clicked: \${f.properties.name} (\${f.id})\`);
                        }}
                      />
                    );
                  })}
                </g>
              );
            }}
          </CustomProjection>
        </svg>
        <div>
          <label>
            projection:{' '}
            <select onChange={this.handleSelect}>
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
              onChange={this.handleSlider}
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
}
`}
    </Show>
  );
};
