import React from 'react';
import { animated, useTransition, interpolate } from 'react-spring';
import cx from 'classnames';
import { Text } from '@vx/text';

import Orientation from '../../constants/orientation';
import { TicksRendererProps, AxisScale } from '../../types';
import useTickTransitionConfig from './useTickTransitionConfig';

export default function TicksRenderer<Scale extends AxisScale>({
  hideTicks,
  horizontal,
  orientation,
  scale,
  tickClassName,
  tickLabelProps: allTickLabelProps,
  tickStroke = '#222',
  tickTransform,
  ticks,
}: TicksRendererProps<Scale>) {
  const transitionConfig = useTickTransitionConfig({ horizontal, scale });
  const animatedTicks = useTransition(ticks, tick => `${tick.value}-${horizontal}`, {
    unique: true,
    ...transitionConfig,
  });

  return animatedTicks.map(({ item, key, props }, index) => {
    // @ts-ignore react-spring types don't handle fromX, etc.
    const { fromX, toX, fromY, toY, opacity } = props;
    const tickLabelProps = allTickLabelProps[index] ?? allTickLabelProps[0] ?? {};
    return (
      <animated.g key={key} className={cx('vx-axis-tick', tickClassName)} transform={tickTransform}>
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
                (orientation === Orientation.bottom && typeof tickLabelProps.fontSize === 'number'
                  ? tickLabelProps.fontSize ?? 10
                  : 0)})`,
          )}
          opacity={opacity}
        >
          <Text {...tickLabelProps}>{item.formattedValue}</Text>
        </animated.g>
      </animated.g>
    );
  });
}
