import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

BarGroup.propTypes = {
  /**
   * An array of bar group objects. Typically, this looks like:
   * ```js
   * const data = [{
   *  date: value,
   *  key1: value,
   *  key2: value,
   *  key3: value
   * }, ...];
   * const x0 = d => d.date;
   * const keys = [key1, key2, key3];
   * ```
   */
  data: PropTypes.array.isRequired,
  /**
   * ```js
   * x0(barGroup)
   * ```
   * An accessor function that returns the `x0` value for each datum in *props*.**data**.
   */
  x0: PropTypes.func.isRequired,
  /**
   * ```js
   * x0Scale(x0(barGroup))
   * ```
   * A scale function that returns the x position of the bar group.
   */
  x0Scale: PropTypes.func.isRequired,
  /**
   * ```js
   * x1Scale(key)
   * ```
   * A scale function that returns the x position of the bar within a bar group.
   */
  x1Scale: PropTypes.func.isRequired,
  /**
   * ```js
   * yScale(value)
   * ```
   * A scale function that retuns the y position of the bar within a bar group. `value` is the value of the `key` in the bar group.
   */
  yScale: PropTypes.func.isRequired,
  /**
   * ```js
   * color(key, barIndex)
   * ```
   * A function that returns color for each bar within a bar group.
   */
  color: PropTypes.func.isRequired,
  /**
   * An array of strings containing the key for each bar group. Each bar within a bar group will follow the order of this array.
   */
  keys: PropTypes.array.isRequired,
  /**
   * Height is used to align the bottom of the the bars. barHeight = height - yScale(bar.value), where bar.y = yScale(bar.value).
   */
  height: PropTypes.number.isRequired,
  /**
   * Add a class name to the containing `<g>` element.
   */
  className: PropTypes.string,
  /**
   * A top pixel offset applied to the entire bar group.
   */
  top: PropTypes.number,
  /**
   * A left pixel offset applied to the entire bar group.
   */
  left: PropTypes.number,
  /**
   * A function that returns a react component. Useful for generating the bar group data with full control over what is rendered. The functions first argument will be the bar groups data as an array of objects with the following properties:
   *
   *  - `index<number>` - the index of the group based on *props*.**data** array.
   *  - `x0<number>` - the position of the group based on *props*.**x0** & *props*.**x0Scale**.
   *  - `bars<array>` - array of objects, ordered by *props*.**keys**, with the following properties:
   *    + `index<number>` - the index of the bar for the current group.
   *    + `key<string>` - the key of the bar.
   *    + `width<number>` - the width of the bar. This will be `x1Scale.bandwidth()`. If `x1Scale` does not have a bandwidth property, then it becomes:
   *      ```js
   *      x1Range = x1Scale.range();
   *      x1Domain = x1Scale.domain();
   *      barWidth = Math.abs(x1Range[x1Range.length - 1] - x1Range[0]) / x1Domain.length
   *      ```
   *    + `height<number>` - the height of the bar.
   *    + `x<number>` - the x position of the bar.
   *    + `y<number>` - the y position of the bar.
   *    + `color<string>` - the color of the bar.
   */
  children: PropTypes.func
};

/**
 * Generates bar groups as an array of objects and renders `<rect />`s for each datum grouped by `key`.
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
}) {
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
          height: height - yScale(value)
        };
      })
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
