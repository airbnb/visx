import React from 'react';
import { animated, useTransition, interpolate } from 'react-spring';
import cx from 'classnames';
import Orientation from '@visx/axis/lib/constants/orientation';
import { TicksRendererProps, AxisScale } from '@visx/axis/lib/types';
import { Text } from '@visx/text';

import useLineTransitionConfig from '../spring-configs/useLineTransitionConfig';
import { AnimationTrajectory } from '../types';

export default function AnimatedTicks<Scale extends AxisScale>({
  hideTicks,
  horizontal,
  orientation,
  scale,
  tickClassName,
  tickLabelProps: allTickLabelProps,
  tickStroke = '#222',
  tickTransform,
  ticks,
  animationTrajectory,
}: TicksRendererProps<Scale> & { animationTrajectory?: AnimationTrajectory }) {
  const animatedTicks = useTransition(ticks, tick => `${tick.value}-${horizontal}`, {
    unique: true,
    ...useLineTransitionConfig({ scale, animateXOrY: horizontal ? 'x' : 'y', animationTrajectory }),
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedTicks.map(
        (
          {
            item,
            key,
            // @ts-ignore react-spring types only include CSSProperties
            props: { fromX, toX, fromY, toY, opacity },
          },
          index,
        ) => {
          const tickLabelProps = allTickLabelProps[index] ?? allTickLabelProps[0] ?? {};
          return (
            <animated.g
              key={key}
              className={cx('visx-axis-tick', tickClassName)}
              transform={tickTransform}
            >
              {!hideTicks && (
                <animated.line
                  x1={fromX}
                  x2={toX}
                  y1={fromY}
                  y2={toY}
                  stroke={tickStroke}
                  strokeLinecap="square"
                  strokeOpacity={opacity}
                />
              )}
              {/** animate the group, not the Text */}
              <animated.g
                key={index}
                transform={interpolate(
                  [toX, toY],
                  (interpolatedX, interpolatedY) =>
                    `translate(${interpolatedX},${interpolatedY +
                      (orientation === Orientation.bottom &&
                      typeof tickLabelProps.fontSize === 'number'
                        ? tickLabelProps.fontSize ?? 10
                        : 0)})`,
                )}
                opacity={opacity}
              >
                <Text {...tickLabelProps}>{item.formattedValue}</Text>
              </animated.g>
            </animated.g>
          );
        },
      )}
    </>
  );
}
