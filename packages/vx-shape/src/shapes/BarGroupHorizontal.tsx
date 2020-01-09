import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import { BarGroupProps } from './BarGroup';
import { ScaleType, BarGroupHorizontal, $TSFIXME, GroupKey } from '../types';

export type BarGroupHorizontalProps<Datum, Key> = Pick<
  BarGroupProps<Datum, Key>,
  'data' | 'className' | 'top' | 'left' | 'keys' | 'color'
> & {
  /** Returns the value (Datum[key]) mapped to the x of a bar */
  x?: (barValue: number) => number;
  /** Returns the value mapped to the y0 (position of group) of a bar */
  y0: (d: Datum) => $TSFIXME;
  /** @vx/scale or d3-scale that takes a key value (Datum[key]) and maps it to an x axis position (width of bar). */
  xScale: ScaleType;
  /** @vx/scale or d3-scale that takes a y0 value (position of group) and maps it to a y axis position. */
  y0Scale: ScaleType;
  /** @vx/scale or d3-scale that takes a group key and maps it to an y axis position (within a group). */
  y1Scale: ScaleType;
  /** Total width of the x-axis. */
  width: number;
  /** Override render function which is passed the computed Ba/rGroups. */
  children?: (barGroups: BarGroupHorizontal<Key>[]) => React.ReactNode;
};

export default function BarGroupHorizontalComponent<
  Datum extends { [key: string]: $TSFIXME },
  Key extends GroupKey = GroupKey
>({
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
}: BarGroupHorizontalProps<Datum, Key> &
  Omit<React.SVGProps<SVGRectElement>, keyof BarGroupHorizontalProps<Datum, Key>>) {
  const y1Range = y1Scale.range();
  const y1Domain = y1Scale.domain();
  const barHeight =
    'bandwidth' in y1Scale && typeof y1Scale.bandwidth === 'function'
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
          width: xScale(value),
        };
      }),
    };
  });

  if (children) return <>{children(barGroups)}</>;

  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {barGroups.map(barGroup => (
        <Group key={`bar-group-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
          {barGroup.bars.map(bar => (
            <Bar
              key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              {...restProps}
            />
          ))}
        </Group>
      ))}
    </Group>
  );
}
