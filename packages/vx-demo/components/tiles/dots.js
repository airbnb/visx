import React from 'react';
import { Group } from '@vx/group';
import { Circle } from '@vx/shape';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';

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
    <div>
      <svg width={width} height={height}>
        <GradientPinkRed id="pink" />
        <rect width={width} height={height} rx={14} fill={`url(#pink)`} />
        <Group
          onTouchStart={event => {
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
            props.hideTooltip();
          }}
        >
          {points.map((point, i) => {
            const cx = xScale(x(point));
            const cy = yScale(y(point));
            const r = i % 3 === 0 ? 2 : 2.765;
            return (
              <Circle
                key={`point-${point.x}-${i}`}
                className="dot"
                cx={cx}
                cy={cy}
                r={r}
                fill="#f6c431"
                onMouseEnter={event => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  props.showTooltip({
                    tooltipLeft: cx,
                    tooltipTop: cy + 20,
                    tooltipData: point
                  });
                }}
                onMouseLeave={event => {
                  tooltipTimeout = setTimeout(() => {
                    props.hideTooltip();
                  }, 300);
                }}
                onTouchStart={event => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  props.showTooltip({
                    tooltipLeft: cx,
                    tooltipTop: cy - 30,
                    tooltipData: point
                  });
                }}
              />
            );
          })}
        </Group>
      </svg>
      {props.tooltipOpen && (
        <Tooltip left={props.tooltipLeft} top={props.tooltipTop}>
          <div>
            <strong>x:</strong> {x(props.tooltipData)}
          </div>
          <div>
            <strong>y:</strong> {y(props.tooltipData)}
          </div>
        </Tooltip>
      )}
    </div>
  );
});
