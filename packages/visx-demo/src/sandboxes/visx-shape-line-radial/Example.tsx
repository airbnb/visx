/**
 * Animated radial line example using svg dash offset trick. See here for more
 * https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html
 */
import React, { useRef, useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { LineRadial } from '@visx/shape';
import { scaleTime, scaleLog, NumberLike } from '@visx/scale';
import { curveBasisOpen } from '@visx/curve';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft } from '@visx/axis';
import { GridRadial, GridAngle } from '@visx/grid';
import { animated, useSpring } from 'react-spring';

const green = '#e5fd3d';
export const blue = '#aeeef8';
const darkgreen = '#dff84d';
export const background = '#744cca';
const darkbackground = '#603FA8';
const strokeColor = '#744cca';
const springConfig = {
  tension: 20,
};

// utils
function extent<Datum>(data: Datum[], value: (d: Datum) => number) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

// accessors
const date = (d: AppleStock) => new Date(d.date).valueOf();
const close = (d: AppleStock) => d.close;
const formatTicks = (val: NumberLike) => String(val);

// scales
const xScale = scaleTime({
  range: [0, Math.PI * 2],
  domain: extent(appleStock, date),
});
const yScale = scaleLog<number>({
  domain: extent(appleStock, close),
});

const angle = (d: AppleStock) => xScale(date(d)) ?? 0;
const radius = (d: AppleStock) => yScale(close(d)) ?? 0;
const padding = 20;

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export type LineRadialProps = {
  width: number;
  height: number;
  animate?: boolean;
};

const Example = ({ width, height, animate = true }: LineRadialProps) => {
  const lineRef = useRef<SVGPathElement>(null);
  const [lineLength, setLineLength] = useState<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  const spring = useSpring({
    frame: shouldAnimate ? 0 : 1,
    config: springConfig,
    onRest: () => setShouldAnimate(false),
  });

  // set line length once it is known after initial render
  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  if (width < 10) return null;

  // Update scale output to match component dimensions
  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());
  const handlePress = () => setShouldAnimate(true);

  return (
    <>
      {animate && (
        <>
          <button type="button" onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>
      )}
      <svg width={width} height={height} onClick={() => setShouldAnimate(!shouldAnimate)}>
        <LinearGradient from={green} to={blue} id="line-gradient" />
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <GridAngle
            scale={xScale}
            outerRadius={height / 2 - padding}
            stroke={green}
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="5,2"
            numTicks={20}
          />
          <GridRadial
            scale={yScale}
            numTicks={5}
            stroke={blue}
            strokeWidth={1}
            fill={blue}
            fillOpacity={0.1}
            strokeOpacity={0.2}
          />
          <AxisLeft
            top={-height / 2 + padding}
            scale={reverseYScale}
            numTicks={5}
            tickStroke="none"
            tickLabelProps={(val) => ({
              fontSize: 8,
              fill: blue,
              fillOpacity: 1,
              textAnchor: 'middle',
              dx: '1em',
              dy: '-0.5em',
              stroke: strokeColor,
              strokeWidth: 0.5,
              paintOrder: 'stroke',
            })}
            tickFormat={formatTicks}
            hideAxisLine
          />
          <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
            {({ path }) => {
              const d = path(appleStock) || '';
              return (
                <>
                  <animated.path
                    d={d}
                    ref={lineRef}
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    strokeLinecap="round"
                    fill="none"
                    stroke={animate ? darkbackground : 'url(#line-gradient)'}
                  />
                  {shouldAnimate && (
                    <animated.path
                      d={d}
                      strokeWidth={2}
                      strokeOpacity={0.8}
                      strokeLinecap="round"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeDashoffset={spring.frame.interpolate((v) => v * lineLength)}
                      strokeDasharray={lineLength}
                    />
                  )}
                </>
              );
            }}
          </LineRadial>

          {[firstPoint, lastPoint].map((d, i) => {
            const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
            const cy = -(yScale(close(d)) ?? 0);
            return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
          })}
        </Group>
      </svg>
    </>
  );
};

export default Example;
