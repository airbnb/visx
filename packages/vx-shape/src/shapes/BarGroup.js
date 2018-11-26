import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

BarGroup.propTypes = {
  data: PropTypes.array.isRequired,
  x0: PropTypes.func.isRequired,
  x0Scale: PropTypes.func.isRequired,
  x1Scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func
};

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
