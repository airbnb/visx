import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';
import { Text } from '@vx/text';

import Orientation from '../constants/orientation';
import { TicksRendererProps, AxisScale } from '../types';

export default function TicksRenderer<Scale extends AxisScale>({
  hideTicks,
  horizontal,
  orientation,
  tickClassName,
  tickComponent,
  tickLabelProps: allTickLabelProps,
  tickStroke = '#222',
  tickTransform,
  ticks,
}: TicksRendererProps<Scale>) {
  return ticks.map(({ value, index, from, to, formattedValue }) => {
    const tickLabelProps = allTickLabelProps[index] ?? {};
    const tickLabelFontSize = Math.max(
      10,
      (typeof tickLabelProps.fontSize === 'number' && tickLabelProps.fontSize) || 0,
    );

    const tickYCoord =
      to.y + (horizontal && orientation !== Orientation.top ? tickLabelFontSize : 0);

    return (
      <Group
        key={`vx-tick-${value}-${index}`}
        className={cx('vx-axis-tick', tickClassName)}
        transform={tickTransform}
      >
        {!hideTicks && <Line from={from} to={to} stroke={tickStroke} strokeLinecap="square" />}
        {tickComponent ? (
          tickComponent({
            ...tickLabelProps,
            x: to.x,
            y: tickYCoord,
            formattedValue,
          })
        ) : (
          <Text x={to.x} y={tickYCoord} {...tickLabelProps}>
            {formattedValue}
          </Text>
        )}
      </Group>
    );
  });
}
