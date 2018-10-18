import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { area, stack as d3stack } from 'd3-shape';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';

Stack.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  curve: PropTypes.func,
  color: PropTypes.func,
  keys: PropTypes.array,
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

export default function Stack({
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
  const stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) stack.value(value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (curve) path.curve(curve);
  if (defined) path.defined(defined);

  const stacks = stack(data);

  if (children) return children({ stacks, path, stack });

  return (
    <Group top={top} left={left}>
      {stacks.map((series, i) => {
        return (
          <path
            className={cx('vx-stack', className)}
            key={`stack-${i}-${series.key || ''}`}
            d={path(series)}
            fill={color(series.key, i)}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
