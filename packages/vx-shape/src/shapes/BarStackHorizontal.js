import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import { stack as d3stack } from 'd3-shape';

export default function BarStackHorizontal({
  data,
  className,
  top,
  left,
  y,
  xScale,
  yScale,
  zScale,
  keys,
  height,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = yScale.tickFormat ? yScale.tickFormat() : d => d;
  const bandwidth = yScale.bandwidth();
  const step = yScale.step();
  const paddingInner = yScale.paddingInner();
  const paddingOuter = yScale.paddingOuter();
  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
      {series &&
        series.map((s, i) => {
          return (
            <Group key={`vx-bar-stack-horizontal-${i}`}>
              {s.map((d, ii) => {
                const barWidth = xScale(d[1]) - xScale(d[0]);
                return (
                  <Bar
                    key={`bar-group-bar-${i}-${ii}-${s.key}`}
                    x={xScale(d[0])}
                    y={yScale(y(d.data))}
                    width={barWidth}
                    height={bandwidth}
                    fill={zScale(s.key)}
                    data={{
                      bandwidth,
                      paddingInner,
                      paddingOuter,
                      step,
                      key: s.key,
                      value: d[0],
                      height: bandwidth,
                      width: barWidth,
                      y: y(d.data),
                      yFormatted: format(y(d.data)),
                      data: d.data,
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

BarStackHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
};
