import React from 'react';
import Show from '../components/show';
import Chords from '../components/tiles/chord';

export default () => {
  return (
    <Show
      component={Chords}
      title="Chords"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { Chord, Ribbon } from '@vx/chord';
import { Arc } from '@vx/shape';
import { scaleOrdinal } from '@vx/scale';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907]
];

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

export default function Chords({
  width,
  height
}) {
  const outerRadius = Math.min(width, height) * 0.5 - 40;
  const innerRadius = outerRadius - 30;

  const zScale = scaleOrdinal({
    domain: [1, 2, 3, 4],
    range: [
      'url(#gpinkorange)',
      'url(#gpurplered)',
      'url(#gpurplegreen)',
      'url(#gbluelime)'
    ]
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id="gpinkorange" from={'#ff2fab'} to={'#ffc62e'} vertical={false} />
      <LinearGradient id="gpurplered" from={'#dc04ff'} to={'#d04376'} vertical={false} />
      <LinearGradient id="gpurplegreen" from={'#7324ff'} to={'#52f091'} vertical={false} />
      <LinearGradient id="gbluelime" from={'#04a6ff'} to={'#00ddc6'} vertical={false} />
      <rect x={0} y={0} width={width} height={height} fill={'#e4e3d8'} rx={14} />

      <Group top={height / 2} left={width / 2}>
        <Chord matrix={matrix} padAngle={0.05} sortSubgroups={descending}>
          {({ chords }) => {
            return (
              <React.Fragment>
                {chords.groups.map((group, i) => {
                  return (
                    <Arc
                      key={\`key-\${i}\`}
                      data={group}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius}
                      fill={zScale(i)}
                      onClick={data => event => {
                        alert(\`\${JSON.stringify(group)}\`);
                      }}
                    />
                  );
                })}
                {chords.map((chord, i) => {
                  return (
                    <Ribbon
                      key={\`ribbon-\${i}\`}
                      chord={chord}
                      radius={innerRadius}
                      fill={zScale(i)}
                      fillOpacity={0.75}
                      onClick={event => {
                        alert(\`\${JSON.stringify(chord)}\`);
                      }}
                    />
                  );
                })}
              </React.Fragment>
            );
          }}
        </Chord>
      </Group>
    </svg>
  );
};`}
    </Show>
  );
};
