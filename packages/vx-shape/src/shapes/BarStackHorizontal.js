import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack } from 'd3-shape';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

BarStackHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y: PropTypes.func.isRequired,
  x0: PropTypes.func,
  x1: PropTypes.func,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  order: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  children: PropTypes.func
};

export default function BarStackHorizontal({
  data,
  className,
  top,
  left,
  y,
  x0 = d => d[0],
  x1 = d => d[1],
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

  const yRange = yScale.range();
  const yDomain = yScale.domain();
  const barHeight = objHasMethod(yScale, 'bandwidth')
    ? yScale.bandwidth()
    : Math.abs(yRange[yRange.length - 1] - yRange[0]) / yDomain.length;

  const barStacks = stacks.map((barStack, i) => {
    const key = barStack.key;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barWidth = xScale(x1(bar)) - xScale(x0(bar));
        const barX = xScale(x0(bar));
        const barY = objHasMethod(yScale, 'bandwidth')
          ? yScale(y(bar.data))
          : Math.max(yScale(y(bar.data)) - barWidth / 2);
        return {
          bar,
          key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX,
          y: barY,
          color: color(barStack.key, j)
        };
      })
    };
  });

  if (children) return children({ barStacks });

  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
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
