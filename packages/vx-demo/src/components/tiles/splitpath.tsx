import React from 'react';
import { Line, LinePath } from '@vx/shape';
// import { ribbon } from '@vx/mock-data';
import { curveCardinal } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';

// import { localPoint } from '@vx/event';
// import { bisector } from 'd3-array';
// import { timeFormat } from 'd3-time-format';

const getHypotenuse = (a: number, b: number) => Math.sqrt(a ** 2 + b ** 2);
const getRibbonPoints = ({ width, height, numberOfWaves = 10, pointsPerWave = 10 }: { width: number, height: number, numberOfWaves?: number, pointsPerWave?: number  }) => {
  const hypotenuseLength = getHypotenuse(width, height);
  const waveLength = hypotenuseLength /  numberOfWaves;
  const betweenPointDistance = waveLength / pointsPerWave;

  const ribbonPoints: XYDatum[] = [];

  for (let waveIndex = 0; waveIndex < numberOfWaves; waveIndex += 1) {
    const distFromStart = waveIndex * waveLength;
    const distToEnd = hypotenuseLength - distFromStart;
    const waveHeight = Math.min(distFromStart, distToEnd);

    for (let pointIndex = 0; pointIndex < pointsPerWave; pointIndex += 1) {
      const position = (distFromStart + pointIndex * betweenPointDistance)
      const x = waveHeight * Math.cos(position);
      const y = waveHeight * Math.sin(position);
      
      ribbonPoints.push({ x, y });
    }
  }

  return ribbonPoints;
};

type XYDatum = { x: number; y: number; };

type Props = {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number; };
    numberOfWaves?: number;
    pointsPerWave?: number;
};


const getXValue = (d: XYDatum) => d.x;
const getYValue = (d: XYDatum) => d.y;

    // // bounds
    // const xMax = width - margin.left - margin.right;
    // const yMax = height - margin.top - margin.bottom;

    // // scales
    // const xScale = scaleTime({
    //   range: [0, xMax],
    //   domain: extent(stock, xStock),
    // });
    // const yScale = scaleLinear({
    //   range: [yMax, 0],
    //   domain: [0, max(stock, yStock) + yMax / 3],
    //   nice: true,
    // });

function SplitPath({ width, height, margin, hideTooltip, tooltipData, tooltipTop, tooltipLeft, numberOfWaves = 10, pointsPerWave = 10 }: Props & WithTooltipProvidedProps) {
    if (width < 10) return null;
  const data = getRibbonPoints({ width, height, numberOfWaves, pointsPerWave });
  
  const xScale = scaleLinear({ range: [ 0, width ], domain: [0, width] });
  const yScale = scaleLinear({ range: [ 0, height ], domain: [height, 0] });

    return (
      <div>
        <svg
          width={width}
          height={height}
        >
          <rect x={0} y={0} width={width} height={height} fill="violet" rx={14} />
    
          
            <g transform={`rotate(-45)`}>
            <LinePath<XYDatum>
              data={data}
              x={d => xScale(getXValue(d))}
              x={d => yScale(getYValue(d))}
              strokeWidth={1}
              stroke="url(#gradient)"
              fill="url(#gradient)"
              curve={curveCardinal}
            />
            
            {tooltipData && typeof tooltipTop === 'number' && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 }}
                  to={{ x: tooltipLeft, y: 100 }}
                  stroke="rgba(92, 119, 235, 1.000)"
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                  strokeDasharray="2,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill="rgba(92, 119, 235, 1.000)"
                  stroke="white"
                  strokeWidth={2}
                  style={{ pointerEvents: 'none' }}
                />
              </g>
            )}
          </g>
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={(tooltipTop || 0) - 12}
              left={(tooltipLeft  || 0)+ 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white',
              }}
            >
              Tooltip
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}

export default withTooltip(SplitPath);