import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';

BarGroupHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y0: PropTypes.func.isRequired,
  y0Scale: PropTypes.func.isRequired,
  y1Scale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func
};

export default function BarGroupHorizontal({
  data,
  className,
  top,
  left,
  y0,
  y0Scale,
  y1Scale,
  xScale,
  zScale,
  keys,
  width,
  children,
  ...restProps
}) {
  const barHeight = y1Scale.bandwidth();
  const barGroups = data.map((group, i) => {
    return {
      index: i,
      y0: y0Scale(y0(group)),
      keys: keys.map((key, j) => {
        const value = group[key];
        return {
          index: j,
          key,
          value,
          barHeight,
          x: xScale(value),
          y: y1Scale(key),
          fill: zScale(key),
          barWidth: width - xScale(value)
        };
      })
    };
  });
  if (children) return children({ barGroups });
  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {barGroups.map(barGroup => {
        return (
          <Group key={`bar-group-${barGroup.index}-${barGroup.y0}`} left={barGroup.y0}>
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
