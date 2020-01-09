import React from 'react';
import { Group } from '@vx/group';
import { Circle } from '@vx/shape';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import genRandomNormalPoints, {
  PointsRange,
} from '@vx/mock-data/lib/generators/genRandomNormalPoints';
import { withTooltip, Tooltip } from '@vx/tooltip';

import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { ShowProvidedProps } from '../../types';

const points: PointsRange[] = genRandomNormalPoints(600).filter((d, i) => i < 600);

const x = (d: PointsRange) => d[0];
const y = (d: PointsRange) => d[1];

let tooltipTimeout;

export default withTooltip(
  ({
    width,
    height,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  }: ShowProvidedProps & WithTooltipProvidedProps) => {
    const xMax = width;
    const yMax = height - 80;
    if (width < 10) return null;

    const xScale = scaleLinear<number>({
      domain: [1.3, 2.2],
      range: [0, xMax],
      clamp: true,
    });
    const yScale = scaleLinear<number>({
      domain: [0.75, 1.6],
      range: [yMax, 0],
      clamp: true,
    });

    return (
      <div>
        <svg width={width} height={height}>
          <GradientPinkRed id="pink" />
          <rect width={width} height={height} rx={14} fill="url(#pink)" />
          <Group
            onTouchStart={() => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              hideTooltip();
            }}
          >
            {points.map((point, i) => {
              const cx = xScale(x(point));
              const cy = yScale(y(point));
              const r = i % 3 === 0 ? 2 : 2.765;
              return (
                <Circle
                  key={`point-${point[0]}-${i}`}
                  className="dot"
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#f6c431"
                  onMouseEnter={() => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    showTooltip({
                      tooltipLeft: cx,
                      tooltipTop: cy + 20,
                      tooltipData: point,
                    });
                  }}
                  onMouseLeave={() => {
                    tooltipTimeout = setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}
                  onTouchStart={() => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    showTooltip({
                      tooltipLeft: cx,
                      tooltipTop: cy - 30,
                      tooltipData: point,
                    });
                  }}
                />
              );
            })}
          </Group>
        </svg>
        {tooltipOpen &&
          tooltipData(
            <Tooltip left={tooltipLeft} top={tooltipTop}>
              <div>
                <strong>x:</strong> {x(tooltipData)}
              </div>
              <div>
                <strong>y:</strong> {y(tooltipData)}
              </div>
            </Tooltip>,
          )}
      </div>
    );
  },
);
