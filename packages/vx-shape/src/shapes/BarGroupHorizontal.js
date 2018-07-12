import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import additionalProps from '../util/additionalProps';

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
  ...restProps
}) {
  const format = y0Scale.tickFormat ? y0Scale.tickFormat() : d => d;
  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {data &&
        data.map((d, i) => {
          return (
            <Group key={`bar-group-${i}-${y0(d)}`} top={y0Scale(y0(d))}>
              {keys &&
                keys.map((key, i) => {
                  const value = d[key];
                  return (
                    <Bar
                      key={`bar-group-bar-${i}-${value}-${key}`}
                      x={0}
                      y={y1Scale(key)}
                      width={width - xScale(value)}
                      height={y1Scale.bandwidth()}
                      fill={zScale(key)}
                      data={{
                        key,
                        value,
                        y: format(y0(d)),
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
  left: PropTypes.number
};
