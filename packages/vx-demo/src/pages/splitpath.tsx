import React from 'react';
// @ts-ignore
import Show from '../components/show';
// import SplitPathDemo from '../components/tiles/splitpath.tsx';

// import React from 'react';
import { LinearGradient } from '@vx/gradient';
import { LinePath } from '@vx/shape';
import SplitLinePath from '@vx/shape/lib/shapes/SplitLinePath';
// import { ribbon } from '@vx/mock-data'; // @TODO move generator to mock-data
import { curveCardinal } from '@vx/curve';
import { scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';

// import { localPoint } from '@vx/event';
// import { bisector } from 'd3-array';
// import { timeFormat } from 'd3-time-format';

// const getHypotxenuse = (a: number, b: number) => Math.sqrt(a ** 2 + b ** 2);

const getRibbonPoints = ({
  width,
  height,
  numberOfWaves,
  pointsPerWave,
}: {
  width: number;
  height: number;
  numberOfWaves: number;
  pointsPerWave: number;
}) => {
  const hypotenuseLength = width; //getHypotenuse(width, height);
  const waveLength = hypotenuseLength / numberOfWaves;
  const distanceBetweenPoints = waveLength / pointsPerWave;

  const ribbonPoints: XYDatum[] = [];

  for (let waveIndex = 0; waveIndex <= numberOfWaves; waveIndex += 1) {
    const waveDistFromStart = waveIndex * waveLength;

    for (let pointIndex = 0; pointIndex <= pointsPerWave; pointIndex += 1) {
      const waveFraction = pointIndex / pointsPerWave;
      const positionWithinWave = pointIndex * distanceBetweenPoints;
      const globalPosition = waveDistFromStart + positionWithinWave;

      const waveHeight =
        0.5 * Math.max(1, Math.min(globalPosition, hypotenuseLength - globalPosition));

      const x = globalPosition; // point along hypotenuse exactly
      const y = waveHeight * Math.sin(waveFraction * (2 * Math.PI));

      ribbonPoints.push({ x, y });
    }
  }

  return ribbonPoints;
};

type XYDatum = { x: number; y: number };

type Props = {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  numberOfWaves?: number;
  pointsPerWave?: number;
  numberOfSegments?: number;
};

const getXValue = (d: XYDatum) => d.x;
const getYValue = (d: XYDatum) => d.y;
// #f7feae,#b7e6a5,#7ccba2,#46aea0,#089099,#00718b,#045275

function SplitPath({
  width,
  height,
  margin,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
  numberOfWaves = 5,
  pointsPerWave = 100,
  numberOfSegments = 8,
}: Props & WithTooltipProvidedProps) {
  if (width < 10) return null;

  const data = getRibbonPoints({ width, height, numberOfWaves, pointsPerWave });
  const segmentLength = Math.floor(data.length / numberOfSegments);
  const dividedData = new Array(numberOfSegments)
    .fill(null)
    .map((_, i) => data.slice(i * segmentLength, (i + 1) * segmentLength));
  const xScale = scaleLinear({ range: [0, width], domain: [0, width] });
  const yScale = scaleLinear({ range: [0, height], domain: [height, 0] });

  console.log({ segmentLength, data: data.length, dividedData });
  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient
          id="gradient"
          from="violet"
          to="#089099"
          fromOpacity={0.8}
          toOpacity={0.8}
        />
        <rect x={0} y={0} width={width} height={height} fill="url(#gradient)" rx={14} />

        <g transform={`rotate(${(height / width) * 45})translate(${-0}, ${-height * 0.9})`}>
          {/* <g transform={`rotate(${0})translate(${-0}, ${-height * 0.5})`}> */}
          <LinePath<XYDatum>
            data={data}
            x={d => xScale(getXValue(d)) - 10}
            y={d => yScale(getYValue(d)) - 12}
            strokeWidth={12}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />
          <SplitLinePath<XYDatum>
            data={dividedData}
            x={d => xScale(getXValue(d))}
            y={d => yScale(getYValue(d))}
            curve={curveCardinal}
            styles={[
              { stroke: '#b7e6a5', strokeWidth: 3 },
              { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
              { stroke: '#045275', strokeWidth: 2 },
            ]}
          >
            {({ segment, styles, index }) =>
              index === numberOfSegments - 1 || index === 2 ? (
                segment.map(({ x, y }, i) =>
                  i % 8 === 0 ? (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={10 * (i / segment.length)}
                      stroke={styles.stroke}
                      fill="transparent"
                      strokeWidth={1}
                    />
                  ) : null,
                )
              ) : (
                <LinePath
                  data={segment}
                  x={(d: XYDatum) => d.x || 0}
                  y={(d: XYDatum) => d.y || 0}
                  {...styles}
                />
              )
            }
          </SplitLinePath>

          {/* <g transform={`translate(${-0}, ${height * 0.3})`}>
            <SplitLinePath<XYDatum>
              data={dividedData}
              x={d => xScale(getXValue(d))}
              y={d => yScale(getYValue(d))}
              curve={curveCardinal}
              styles={[
                { stroke: '#b7e6a5', strokeWidth: 3 },
                { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
                { stroke: '#045275', strokeWidth: 2 },
              ]}
            >
              {({ segment, styles, index }) =>
                index === numberOfSegments - 1 || index === 2 ? (
                  segment.map(({ x, y }, i) =>
                    i % 8 === 0 ? (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={10 * (i / segment.length)}
                        stroke={styles.stroke}
                        fill="transparent"
                        strokeWidth={1}
                      />
                    ) : null,
                  )
                ) : (
                  <LinePath
                    data={segment}
                    x={(d: XYDatum) => d.x || 0}
                    y={(d: XYDatum) => d.y || 0}
                    {...styles}
                  />
                )
              }
            </SplitLinePath>
          </g> */}
        </g>

        {/* <g transform={`rotate(${(height / width) * 45})translate(${-30}, ${-height * 0.9 + 30})`}>
          <LinePath<XYDatum>
            data={data}
            x={d => xScale(getXValue(d))}
            y={d => yScale(getYValue(d))}
            strokeWidth={2}
            stroke="rgba(92, 119, 235, 1.000)"
            curve={curveCardinal}
          />

          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(getXValue(d))}
              cy={yScale(getYValue(d))}
              r={4}
              stroke="rgba(92, 119, 235, 1.000)"
              strokeWidth={1}
              fill="violet"
            />
          ))}
        </g> */}
      </svg>
      {tooltipData && (
        <div>
          <Tooltip
            top={(tooltipTop || 0) - 12}
            left={(tooltipLeft || 0) + 12}
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

// export default withTooltip(SplitPath);
const SplitPathWithTooltip = withTooltip(SplitPath);

export default () => {
  return (
    <Show
      component={SplitPathWithTooltip}
      title="SplitPath"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {`import React from 'react';`}
    </Show>
  );
};
