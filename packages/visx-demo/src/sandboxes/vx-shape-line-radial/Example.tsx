/**
 * Animated radial line example using svg dash offset trick. See here for more
 * https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html
 */
import React, { useRef, useState, useEffect } from 'react';
import { Group } from '@vx/group';
import { LineRadial } from '@vx/shape';
import { scaleTime, scaleLog } from '@vx/scale';
import { curveBasisOpen } from '@vx/curve';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { LinearGradient } from '@vx/gradient';
import { animated, useSpring } from 'react-spring';

const green = '#e5fd3d';
export const blue = '#aeeef8';
const darkgreen = '#dff84d';
export const background = '#744cca';
const darkbackground = '#603FA8';
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

// scales
const xScale = scaleTime<number>({
  range: [0, Math.PI * 2],
  domain: extent(appleStock, date),
});
const yScale = scaleLog<number>({
  domain: extent(appleStock, close),
});

const angle = (d: AppleStock) => xScale(date(d));
const radius = (d: AppleStock) => yScale(close(d));

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export type LineRadialProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export default ({ width, height, animate = true }: LineRadialProps) => {
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
  yScale.range([0, height / 2 - 20]);

  const yScaleTicks = yScale.ticks();
  const handlePress = () => setShouldAnimate(true);

  return (
    <>
      {animate && (
        <>
          <button onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>
      )}
      <svg width={width} height={height} onClick={() => setShouldAnimate(!shouldAnimate)}>
        <LinearGradient from={green} to={blue} id="line-gradient" />
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={height / 2} left={width / 2}>
          {/** Radial circles */}
          {yScaleTicks.map((tick, i) => (
            <circle
              key={`radial-grid-${i}`}
              r={yScale(tick)}
              stroke={blue}
              strokeWidth={1}
              fill={blue}
              fillOpacity={1 / (i + 1) - (1 / i) * 0.2}
              strokeOpacity={0.2}
            />
          ))}
          {/** Labels on top */}
          {yScaleTicks.map((tick, i) => (
            <text
              key={`radial-grid-${i}`}
              y={-yScale(tick)}
              dy="-.33em"
              fontSize={8}
              fill={blue}
              textAnchor="middle"
            >
              {tick}
            </text>
          ))}

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
                      strokeDashoffset={spring.frame.interpolate(v => v * lineLength)}
                      strokeDasharray={lineLength}
                    />
                  )}
                </>
              );
            }}
          </LineRadial>

          {[firstPoint, lastPoint].map((d, i) => {
            const cx = (xScale(date(d)) * Math.PI) / 180;
            const cy = -yScale(close(d));
            return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
          })}
        </Group>
      </svg>
    </>
  );
};
