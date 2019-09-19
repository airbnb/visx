import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data: $TSFixMe[];
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x0: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x0Scale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x1Scale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  yScale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  color: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  keys: $TSFixMe[];
  height: number;
  className?: string;
  top?: number;
  left?: number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
};

/**
 * Generates bar groups as an array of objects and renders `<rect />`s for each datum grouped by `key`. A general setup might look like this:
 *
 * ```js
 * const data = [{
 *  date: date1,
 *  key1: value,
 *  key2: value,
 *  key3: value
 * }, {
 *  date: date2,
 *  key1: value,
 *  key2: value,
 *  key3: value,
 * }];
 *
 * const x0 = d => d.date;
 * const keys = [key1, key2, key3];
 *
 * const x0Scale = scaleBand({
 *  domain: data.map(x0),
 *  padding: 0.2
 * });
 * const x1Scale = scaleBand({
 *  domain: keys,
 *  padding: 0.1
 * });
 * const yScale = scaleLinear({
 *   domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
 * });
 * const color = scaleOrdinal({
 *   domain: keys,
 *   range: [blue, green, purple]
 * });
 * ```
 *
 * Example: [https://vx-demo.now.sh/bargroup](https://vx-demo.now.sh/bargroup)
 */
export default function BarGroup({
  data,
  className,
  top,
  left,
  x0,
  x0Scale,
  x1Scale,
  yScale,
  color,
  keys,
  height,
  children,
  ...restProps
}: Props) {
  const x1Range = x1Scale.range();
  const x1Domain = x1Scale.domain();

  const barWidth = objHasMethod(x1Scale, 'bandwidth')
    ? x1Scale.bandwidth()
    : Math.abs(x1Range[x1Range.length - 1] - x1Range[0]) / x1Domain.length;

  const barGroups = data.map((group, i) => {
    return {
      index: i,
      x0: x0Scale(x0(group)),
      bars: keys.map((key, j) => {
        const value = group[key];
        return {
          index: j,
          key,
          value,
          width: barWidth,
          x: x1Scale(key),
          y: yScale(value),
          color: color(key, j),
          height: height - yScale(value),
        };
      }),
    };
  });

  if (children) return children(barGroups);

  return (
    <Group className={cx('vx-bar-group', className)} top={top} left={left}>
      {barGroups.map(barGroup => {
        return (
          <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
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
