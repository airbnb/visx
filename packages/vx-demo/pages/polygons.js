import React from 'react';
import Show from '../components/show';
import Polygons from '../components/tiles/polygons';

export default () => (
  <Show component={Polygons} title="Polygons">
    {`import React from 'react';
import { Polygon } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';

const additionalProps = [
  {
    fill: 'rgb(174, 238, 248)',
    rotate: 90
  },
  {
    fill: 'rgb(229, 253, 61)',
    rotate: 45
  },
  {
    fill: 'rgb(229, 130, 255)',
    rotate: 0
  },
  {
    fill: 'url(#pink)',
    rotate: 0
  }
];

export default ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="gradients" />
      {[3, 4, 6, 8].map((n, i) => (
        <Group top={i * 70 + 50} left={width / 2}>
          <Polygon sides={n} size={25} {...additionalProps[i]} />
        </Group>
      ))}
    </svg>
  );
};
`}
  </Show>
);
