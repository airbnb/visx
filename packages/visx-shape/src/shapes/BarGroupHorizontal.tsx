import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { ScaleInput } from '@visx/scale';
import Bar from './Bar';
import {
  PositionScale,
  AnyScaleBand,
  DatumObject,
  AddSVGProps,
  BarGroupHorizontal as BarGroupHorizontalType,
  BaseBarGroupProps,
  GroupKey,
  Accessor,
} from '../types';
import getBandwidth from '../util/getBandwidth';

export type BarGroupHorizontalProps<
  Datum extends DatumObject,
  Key extends GroupKey = GroupKey,
  Y0Scale extends AnyScaleBand = AnyScaleBand,
  Y1Scale extends AnyScaleBand = AnyScaleBand,
> = BaseBarGroupProps<Datum, Key> & {
  /** Returns the value (Datum[key]) mapped to the x of a bar */
  x?: (barValue: number) => number;
  /** Returns the value mapped to the y0 (position of group) of a bar */
  y0: Accessor<Datum, ScaleInput<Y0Scale>>;
  /** @visx/scale or d3-scale that takes a key value (Datum[key]) and maps it to an x axis position (width of bar). */
  xScale: PositionScale;
  /** @visx/scale or d3-scale that takes a y0 value (position of group) and maps it to a y axis position. */
  y0Scale: Y0Scale;
  /** @visx/scale or d3-scale that takes a group key and maps it to an y axis position (within a group). */
  y1Scale: Y1Scale;
  /** Total width of the x-axis. */
  width: number;
  /** Override render function which is passed the computed Ba/rGroups. */
  children?: (barGroups: BarGroupHorizontalType<Key>[]) => React.ReactNode;
};

export default function BarGroupHorizontal<
  Datum extends DatumObject,
  Key extends GroupKey = GroupKey,
  Y0Scale extends AnyScaleBand = AnyScaleBand,
  Y1Scale extends AnyScaleBand = AnyScaleBand,
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
}: AddSVGProps<BarGroupHorizontalProps<Datum, Key, Y0Scale, Y1Scale>, SVGRectElement>) {
  const barHeight = getBandwidth(y1Scale);

  const barGroups: BarGroupHorizontalType<Key>[] = data.map((group, i) => ({
    index: i,
    y0: y0Scale(y0(group)) || 0,
    bars: keys.map((key, j) => {
      const value = group[key];
      return {
        index: j,
        key,
        value,
        height: barHeight,
        x: x(value) || 0,
        y: y1Scale(key) || 0,
        color: color(key, j),
        width: xScale(value) || 0,
      };
    }),
  }));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children(barGroups)}</>;

  return (
    <Group className={cx('visx-bar-group-horizontal', className)} top={top} left={left}>
      {barGroups.map((barGroup) => (
        <Group key={`bar-group-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
          {barGroup.bars.map((bar) => (
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
