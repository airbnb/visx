import React, { useMemo } from 'react';
import { curveCardinal } from '@visx/curve';
import { LinePath, SplitLinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { SplitLinePathChildren } from '@visx/shape/lib/shapes/SplitLinePath';
import generateSinSegments from './generateSinSegments';

type Point = { x: number; y: number };
const getX = (d: Point) => d.x;
const getY = (d: Point) => d.y;
export const background = '#045275';
export const backgroundLight = '#089099';
export const foreground = '#b7e6a5';

export type SplitLinePathExampleProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  numberOfWaves?: number;
  pointsPerWave?: number;
  numberOfSegments?: number;
};

const CustomSegment: SplitLinePathChildren = ({ segment, styles }) => (
  <g>
    {segment.map(({ x, y }, i) =>
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
    )}
  </g>
);

export default function SplitLinePathExample({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 100,
}: SplitLinePathExampleProps) {
  const data = useMemo(
    () => ({
      leftToRight: generateSinSegments({
        width: width / 2,
        height: height / 2,
        numberOfWaves,
        pointsPerWave,
      }),
      rightToLeft: generateSinSegments({
        width: width / 2,
        height: height / 2,
        numberOfWaves,
        pointsPerWave,
        direction: 'right-to-left',
      }),
    }),
    [width, height, numberOfWaves, pointsPerWave],
  );

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        {/* Background */}
        <LinearGradient
          id="visx-shape-splitlinepath-gradient"
          from={background}
          to={backgroundLight}
          fromOpacity={0.8}
          toOpacity={0.8}
        />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#visx-shape-splitlinepath-gradient)"
          rx={14}
        />

        {/* left to right */}
        <g transform={`translate(${width / 2}, ${height / 4})`}>
          <LinePath
            data={data.leftToRight.flat()}
            x={getX}
            y={getY}
            strokeWidth={8}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />

          <SplitLinePath
            sampleRate={2}
            segments={data.leftToRight}
            x={getX}
            y={getY}
            curve={curveCardinal}
            styles={[
              { stroke: foreground, strokeWidth: 3 },
              { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
              { stroke: background, strokeWidth: 2 },
            ]}
          >
            {({ segment, styles, index }) =>
              /** overlay circles to a couple of the segments */
              index === numberOfWaves - 1 || index === 2 ? (
                <CustomSegment segment={segment} styles={styles} index={index} />
              ) : (
                <LinePath data={segment} x={getX} y={getY} {...styles} />
              )
            }
          </SplitLinePath>
        </g>

        {/* right to left */}
        <g transform={`translate(${width}, ${(height * 3) / 4})`}>
          <LinePath
            data={data.rightToLeft.flat()}
            x={getX}
            y={getY}
            strokeWidth={8}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />

          <SplitLinePath
            sampleRate={1}
            segments={data.rightToLeft}
            x={getX}
            y={getY}
            curve={curveCardinal}
            styles={[
              { stroke: foreground, strokeWidth: 3 },
              { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
              { stroke: background, strokeWidth: 2 },
            ]}
          >
            {({ segment, styles, index }) =>
              /** overlay circles to a couple of the segments */
              index === numberOfWaves - 1 || index === 2 ? (
                <CustomSegment segment={segment} styles={styles} index={index} />
              ) : (
                <LinePath data={segment} x={getX} y={getY} {...styles} />
              )
            }
          </SplitLinePath>
        </g>
      </svg>
    </div>
  );
}
