import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';

export default function BarGroup({
  data,
  className,
  top,
  left,
  x0,
  y,
  z,
  x0Scale,
  x1Scale,
  yScale,
  zScale,
  keys,
  height,
}) {
  return (
    <Group
      className={cx('vx-bar-group', className)}
      top={top}
      left={left}
    >
      {data && data.map((d, i) => {
        return (
          <Group
            key={`bar-group-${i}-${x0(d)}`}
            left={x0Scale(x0(d))}
          >
            {keys && keys.map((key, i) => {
              const value = d[key];
              return (
                <Bar
                  key={`bar-group-bar-${i}-${value}-${key}`}
                  x={x1Scale(key)}
                  y={yScale(value)}
                  width={x1Scale.bandwidth()}
                  height={height - yScale(value)}
                  fill={zScale(key)}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}

BarGroup.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  x0: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  x0Scale: PropTypes.func.isRequired,
  x1Scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  z: PropTypes.func,
  zScale: PropTypes.func,
  keys: PropTypes.array.isRequired,
};
