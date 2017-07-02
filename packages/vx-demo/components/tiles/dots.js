import React from 'react';
import { Group } from '@vx/group';
import { GlyphCircle } from '@vx/glyph';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';
import { withTooltip } from '@vx/tooltip';

const points = genRandomNormalPoints(600).filter((d, i) => {
  return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

let tooltipTimeout;

export default withTooltip(props => {
  const { width, height } = props;
  const xMax = width;
  const yMax = height - 80;
  if (width < 10) return null;

  const xScale = scaleLinear({
    domain: [1.3, 2.2],
    range: [0, xMax],
    clamp: true
  });
  const yScale = scaleLinear({
    domain: [0.75, 1.6],
    range: [yMax, 0],
    clamp: true
  });

  return (
    <svg width={width} height={height}>
      <GradientPinkRed id="pink" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill={`url(#pink)`}
      />
      <Group
        onTouchStart={() => event => {
          if (tooltipTimeout) clearTimeout(tooltipTimeout);
          props.updateTooltip({
            tooltipOpen: false
          });
        }}
      >
        {points.map((point, i) => {
          return (
            <GlyphCircle
              key={`point-${point.x}-${i}`}
              fill={'#f6c431'}
              left={xScale(x(point))}
              top={yScale(y(point))}
              size={i % 3 === 0 ? 12 : 24}
              onMouseEnter={() => event => {
                event.preventDefault();
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                props.updateTooltip({
                  tooltipOpen: true,
                  tooltipLeft: xScale(x(point)),
                  tooltipTop: yScale(y(point)) - 30,
                  tooltipData: point[0]
                });
              }}
              onTouchStart={() => event => {
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                props.updateTooltip({
                  tooltipOpen: true,
                  tooltipLeft: xScale(x(point)),
                  tooltipTop: yScale(y(point)) - 30,
                  tooltipData: point[0]
                });
              }}
              onMouseLeave={() => event => {
                tooltipTimeout = setTimeout(() => {
                  props.updateTooltip({
                    tooltipOpen: false,
                    tooltipLeft: undefined,
                    tooltipRight: undefined
                  });
                }, 300);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
});
