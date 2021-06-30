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

const NumberSegment: SplitLinePathChildren = ({ segment, styles }) => (
  <g>
    {segment.map(({ x, y }, i) =>
      i % 10 === 0 ? (
        <text key={i} x={x} y={y} dy={3} fontSize={8} textAnchor="middle">
          {i}
        </text>
      ) : null,
    )}
  </g>
);

/** Overlay growing circles instead of drawing a line */
const CircleSegment: SplitLinePathChildren = ({ segment, styles }) => (
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

const PADDING = 20;

export default function SplitLinePathExample({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 100,
}: SplitLinePathExampleProps) {
  const data = useMemo(
    () => ({
      leftToRight: generateSinSegments({
        width: width / 2 - PADDING * 2,
        height: height / 2 - PADDING * 2,
        numberOfWaves,
        pointsPerWave,
      }),
      rightToLeft: generateSinSegments({
        width: width / 2 - PADDING * 2,
        height: height / 2 - PADDING * 2,
        numberOfWaves,
        pointsPerWave,
        direction: 'right-to-left',
      }),
      topToBottom: generateSinSegments({
        width: width / 2 - PADDING * 2,
        height: height / 2 - PADDING * 2,
        numberOfWaves,
        pointsPerWave,
        direction: 'top-to-bottom',
      }),
      bottomToTop: generateSinSegments({
        width: width / 2 - PADDING * 2,
        height: height / 2 - PADDING * 2,
        numberOfWaves,
        pointsPerWave,
        direction: 'bottom-to-top',
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
        <g transform={`translate(${PADDING}, ${height / 4})`}>
          {/* Render all segments as a single line for comparison */}
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
              index === numberOfWaves - 1 || index === 2 ? (
                <CircleSegment segment={segment} styles={styles} index={index} />
              ) : (
                <LinePath data={segment} x={getX} y={getY} {...styles} />
              )
            }
          </SplitLinePath>
        </g>

        {/* right to left */}
        <g transform={`translate(${width / 2 - PADDING}, ${(height * 3) / 4})`}>
          {/* Render all segments as a single line for comparison */}
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
              index === numberOfWaves - 1 || index === 2 ? (
                <NumberSegment segment={segment} styles={styles} index={index} />
              ) : (
                <LinePath data={segment} x={getX} y={getY} {...styles} />
              )
            }
          </SplitLinePath>
        </g>

        {/* top to bottom */}
        <g transform={`translate(${(width * 3) / 4}, ${PADDING})`}>
          {/* Render all segments as a single line for comparison */}
          <LinePath
            data={data.topToBottom.flat()}
            x={getX}
            y={getY}
            strokeWidth={8}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />

          <SplitLinePath
            sampleRate={1}
            segments={data.topToBottom}
            segmentation="y"
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
              index === numberOfWaves - 1 || index === 2 ? (
                <CircleSegment segment={segment} styles={styles} index={index} />
              ) : (
                <LinePath data={segment} x={getX} y={getY} {...styles} />
              )
            }
          </SplitLinePath>
        </g>

        {/* bottom to top */}
        <g transform={`translate(${(width * 3) / 4}, ${height - PADDING})`}>
          {/* Render all segments as a single line for comparison */}
          <LinePath
            data={data.bottomToTop.flat()}
            x={getX}
            y={getY}
            strokeWidth={8}
            stroke="#fff"
            strokeOpacity={0.15}
            curve={curveCardinal}
          />

          <SplitLinePath
            sampleRate={1}
            segments={data.bottomToTop}
            segmentation="y"
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
              index === numberOfWaves - 1 || index === 2 ? (
                <CircleSegment segment={segment} styles={styles} index={index} />
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
