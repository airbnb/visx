import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data: $TSFixMe[];
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y0: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y0Scale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y1Scale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  xScale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  color: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  keys: $TSFixMe[];
  width: number;
  className?: string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x?: $TSFixMeFunction;
  top?: number;
  left?: number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
};

export default function BarGroupHorizontal({
  data,
  className,
  top,
  left,
  x = (/** val */) => 0,
  y0,
  y0Scale,
  y1Scale,
  xScale,
  color,
  keys,
  width,
  children,
  ...restProps
}: Props) {
  const y1Range = y1Scale.range();
  const y1Domain = y1Scale.domain();
  const barHeight = objHasMethod(y1Scale, 'bandwidth')
    ? y1Scale.bandwidth()
    : Math.abs(y1Range[y1Range.length - 1] - y1Range[0]) / y1Domain.length;

  const barGroups = data.map((group, i) => {
    return {
      index: i,
      y0: y0Scale(y0(group)),
      bars: keys.map((key, j) => {
        const value = group[key];
        return {
          index: j,
          key,
          value,
          height: barHeight,
          x: x(value),
          y: y1Scale(key),
          color: color(key, j),
          width: width - xScale(value),
        };
      }),
    };
  });

  if (children) return children(barGroups);

  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {barGroups.map(barGroup => {
        return (
          <Group key={`bar-group-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
            {barGroup.bars.map(bar => {
              return (
                // @ts-ignore ts-migrate(2322) FIXME: Property 'x' does not exist on type 'IntrinsicAttr... Remove this comment to see the full error message
                <Bar
                  key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={bar.color}
                  {...restProps}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}
