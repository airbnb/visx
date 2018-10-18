import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Stack from './Stack';

AreaStack.propTypes = {
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  keys: PropTypes.array,
  data: PropTypes.array,
  curve: PropTypes.func,
  color: PropTypes.func,
  children: PropTypes.func,
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  defined: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  order: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string])
};

export default function AreaStack({
  className,
  top,
  left,
  keys,
  data,
  curve,
  defined,
  x,
  x0,
  x1,
  y0,
  y1,
  value,
  order,
  offset,
  color,
  children,
  ...restProps
}) {
  return (
    <Stack
      className={className}
      top={top}
      left={left}
      keys={keys}
      data={data}
      curve={curve}
      defined={defined}
      x={x}
      x0={x0}
      x1={x1}
      y0={y0}
      y1={y1}
      value={value}
      order={order}
      offset={offset}
      color={color}
      {...restProps}
    >
      {!!children
        ? children
        : ({ stacks, path, stack }) => {
            return stacks.map((series, i) => {
              return (
                <path
                  className={cx('vx-area-stack', className)}
                  key={`area-stack-${i}-${series.key || ''}`}
                  d={path(series)}
                  fill={color(series.key, i)}
                  {...restProps}
                />
              );
            });
          }}
    </Stack>
  );
}
