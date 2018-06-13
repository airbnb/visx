import React from 'react';
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

export default ({ width, height, centerSize = 20, events = false }) => {
  if (width < 10) return null;
  const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10);
  const innerRadius = outerRadius - centerSize;
  const zScale = scaleOrdinal({
    domain: [1, 2, 3, 4],
    range: ['url(#gpinkorange)', 'url(#gpurplered)', 'url(#gpurplegreen)', 'url(#gbluelime)']
  });
  return (
    <div className="Chords">
      <svg width={width} height={height}>
        <LinearGradient id="gpinkorange" from={'#ff2fab'} to={'#ffc62e'} vertical={false} />
        <LinearGradient id="gpurplered" from={'#dc04ff'} to={'#d04376'} vertical={false} />
        <LinearGradient id="gpurplegreen" from={'#7324ff'} to={'#52f091'} vertical={false} />
        <LinearGradient id="gbluelime" from={'#04a6ff'} to={'#00ddc6'} vertical={false} />
        <rect x={0} y={0} width={width} height={height} fill={`#e4e3d8`} rx={14} />

        <Group top={height / 2} left={width / 2}>
          <Chord matrix={matrix} padAngle={0.05} sortSubgroups={descending}>
            {({ chords }) => {
              return (
                <React.Fragment>
                  {chords.groups.map((group, i) => {
                    return (
                      <Arc
                        key={`key-${i}`}
                        data={group}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        fill={zScale(i)}
                        onClick={data => event => {
                          alert(`${JSON.stringify(group)}`);
                        }}
                      />
                    );
                  })}
                  {chords.map((chord, i) => {
                    return (
                      <Ribbon
                        key={`ribbon-${i}`}
                        chord={chord}
                        radius={innerRadius}
                        fill={zScale(i)}
                        fillOpacity={0.75}
                        onClick={event => {
                          alert(`${JSON.stringify(chord)}`);
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
      <div className="deets">
        <div>
          Based on Mike Bostock's <a href="https://bl.ocks.org/mbostock/4062006">Chord Diagram</a>
        </div>
      </div>

      <style jsx>{`
        .Chords {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
};
