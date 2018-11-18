import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

BarGroupHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y0: PropTypes.func.isRequired,
  y0Scale: PropTypes.func.isRequired,
  y1Scale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  x: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func
};

export default function BarGroupHorizontal({
  data,
  className,
  top,
  left,
  x = val => 0,
  y0,
  y0Scale,
  y1Scale,
  xScale,
  color,
  keys,
  width,
  children,
  ...restProps
}) {
  const y1Range = y1Scale.range();
  const y1Domain = y1Scale.domain();
  const barHeight = objHasMethod(y1Scale, 'bandwidth')
    ? y1Scale.bandwidth()
    : Math.abs(y1Range[y1Range.length - 1] - y1Range[0]) / y1Domain.length;

  const barGroups = data.map((group, i) => {
    return {
      index: i,
      y0: y0Scale(y0(group)),
      bars: keys.map((key, j) => {
        const value = group[key];
        return {
          index: j,
          key,
          value,
          height: barHeight,
          x: x(value),
          y: y1Scale(key),
          color: color(key, j),
          width: width - xScale(value)
        };
      })
    };
  });

  if (children) return children(barGroups);

  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {barGroups.map(barGroup => {
        return (
          <Group key={`bar-group-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
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
