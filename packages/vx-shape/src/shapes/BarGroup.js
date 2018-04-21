import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import additionalProps from '../util/additionalProps';

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
  ...restProps
}) {
  const format = x0Scale.tickFormat ? x0Scale.tickFormat() : d => d;
  return (
    <Group className={cx('vx-bar-group', className)} top={top} left={left}>
      {data &&
        data.map((d, i) => {
          return (
            <Group key={`bar-group-${i}-${x0(d)}`} left={x0Scale(x0(d))}>
              {keys &&
                keys.map((key, i) => {
                  const value = d[key];
                  return (
                    <Bar
                      key={`bar-group-bar-${i}-${value}-${key}`}
                      x={x1Scale(key)}
                      y={yScale(value)}
                      width={x1Scale.bandwidth()}
                      height={height - yScale(value)}
                      fill={zScale(key)}
                      data={{
                        key,
                        value,
                        x: format(x0(d)),
                        data: d
                      }}
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
  left: PropTypes.number
};
