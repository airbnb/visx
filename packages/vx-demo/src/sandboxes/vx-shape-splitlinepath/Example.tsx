import React, { useMemo } from 'react';
import { scaleLinear } from '@vx/scale';
import { curveCardinal } from '@vx/curve';
import { LinePath, SplitLinePath } from '@vx/shape';
import { LinearGradient } from '@vx/gradient';

import getRibbonPoints from './getRibbonPoints';

type Point = { x: number; y: number };
const getX = (d: Point) => d.x;
const getY = (d: Point) => d.y;

export type SplitLinePathProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  numberOfWaves?: number;
  pointsPerWave?: number;
  numberOfSegments?: number;
};

export default function SplitPath({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 100,
  numberOfSegments = 8,
}: SplitLinePathProps) {
  const data = useMemo(() => getRibbonPoints({ width, height, numberOfWaves, pointsPerWave }), [
    width,
    height,
    numberOfWaves,
    pointsPerWave,
  ]);

  const dividedData = useMemo(() => {
    const segmentLength = Math.floor(data.length / numberOfSegments);
    return new Array(numberOfSegments)
      .fill(null)
      .map((_, i) => data.slice(i * segmentLength, (i + 1) * segmentLength));
  }, [numberOfSegments, data]);

  const getScaledX = useMemo(() => {
    const xScale = scaleLinear({ range: [0, width], domain: [0, width] });
    return (d: Point) => xScale(getX(d));
  }, [width]);

  const getScaledY = useMemo(() => {
    const yScale = scaleLinear({ range: [0, height], domain: [height, 0] });
    return (d: Point) => yScale(getY(d));
  }, [height]);

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <LinearGradient
          id="gradient"
          from="#045275"
          to="#089099"
          fromOpacity={0.8}
          toOpacity={0.8}
        />
        <rect x={0} y={0} width={width} height={height} fill="url(#gradient)" rx={14} />

        <g transform={`rotate(${0})translate(${-0}, ${-height * 0.5})`}>
          <LinePath
            data={data}
            x={getScaledX}
            y={getScaledY}
            strokeWidth={8}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />

          {/* <SplitLinePath<XYDatum>
            data={dividedData}
            x={d => xScale(getXValue(d))}
            y={d => yScale(getYValue(d))}
            curve={curveCardinal}
            styles={[
              { stroke: '#b7e6a5', strokeWidth: 2 },
              { stroke: '#fff', strokeWidth: 2, strokeDasharray: '7,5' },
              { stroke: '#045275', strokeWidth: 2 },
            ]}
          /> */}

          <SplitLinePath
            segments={dividedData}
            x={getScaledX}
            y={getScaledY}
            curve={curveCardinal}
            styles={[
              { stroke: '#b7e6a5', strokeWidth: 3 },
              { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
              { stroke: '#045275', strokeWidth: 2 },
            ]}
          >
            {({ segment, styles, index }) =>
              /** overlay circles to a couple of the segments */
              index === numberOfSegments - 1 || index === 2 ? (
                segment.map(({ x, y }, i) =>
                  i % 8 === 0 ? (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={10 * (i / segment.length)}
                      stroke={styles?.stroke}
                      fill="transparent"
                      strokeWidth={1}
                    />
                  ) : null,
                )
              ) : (
                <LinePath data={segment} x={d => d.x || 0} y={d => d.y || 0} {...styles} />
              )
            }
          </SplitLinePath>
        </g>
      </svg>
    </div>
  );
}
