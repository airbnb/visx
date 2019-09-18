import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack } from 'd3-shape';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

BarStack.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  order: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
};

export default function BarStack({
  data,
  className,
  top,
  left,
  x,
  y0 = d => d[0],
  y1 = d => d[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}) {
  const stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) stack.value(value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);

  const xRange = xScale.range();
  const xDomain = xScale.domain();
  const barWidth = objHasMethod(xScale, 'bandwidth')
    ? xScale.bandwidth()
    : Math.abs(xRange[xRange.length - 1] - xRange[0]) / xDomain.length;

  const barStacks = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barHeight = yScale(y0(bar)) - yScale(y1(bar));
        const barY = yScale(y1(bar));
        const barX = objHasMethod(xScale, 'bandwidth')
          ? xScale(x(bar.data))
          : Math.max(xScale(x(bar.data)) - barWidth / 2);
        return {
          bar,
          key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX,
          y: barY,
          color: color(barStack.key, j),
        };
      }),
    };
  });

  if (children) return children(barStacks);

  return (
    <Group className={cx('vx-bar-stack', className)} top={top} left={left}>
      {barStacks.map(barStack => {
        return barStack.bars.map(bar => {
          return (
            <Bar
              key={`bar-stack-${barStack.index}-${bar.index}`}
              x={bar.x}
              y={bar.y}
              height={bar.height}
              width={bar.width}
              fill={bar.color}
              {...restProps}
            />
          );
        });
      })}
    </Group>
  );
}
