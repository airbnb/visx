import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';

BarGroup.propTypes = {
  data: PropTypes.array.isRequired,
  x0: PropTypes.func.isRequired,
  x0Scale: PropTypes.func.isRequired,
  x1Scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
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
  zScale,
  keys,
  height,
  children,
  ...restProps
}) {
  const barWidth = x1Scale.bandwidth();
  const barGroups = data.map((group, i) => {
    return {
      index: i,
      x0: x0Scale(x0(group)),
      keys: keys.map((key, j) => {
        const value = group[key];
        return {
          index: j,
          key,
          value,
          barWidth,
          x: x1Scale(key),
          y: yScale(value),
          fill: zScale(key),
          barHeight: height - yScale(value)
        };
      })
    };
  });
  if (children) return children({ barGroups });
  return (
    <Group className={cx('vx-bar-group', className)} top={top} left={left}>
      {barGroups.map(barGroup => {
        return (
          <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
            {barGroup.keys.map(key => {
              return (
                <Bar
                  key={`bar-group-bar-${barGroup.index}-${key.index}-${key.value}-${key.key}`}
                  x={key.x}
                  y={key.y}
                  width={key.barWidth}
                  height={key.barHeight}
                  fill={key.fill}
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
