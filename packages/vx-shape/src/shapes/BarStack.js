import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import { stack as d3stack } from 'd3-shape';
import { isScaleBand, isScalePoint } from '@vx/scale';

function scaleHasBandwidth(scale) {
  return isScaleBand(scale) || isScalePoint(scale);
}

function scaleHasStep(scale) {
  return isScaleBand(scale) || isScalePoint(scale);
}

export default function BarStack({
  data,
  className,
  top,
  left,
  x,
  xScale,
  yScale,
  zScale,
  keys,
  width,
  height,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = xScale.tickFormat ? xScale.tickFormat() : d => d;
  const xRange = xScale.range();
  const xDomain = xScale.domain();
  return (
    <Group className={cx('vx-bar-stack', className)} top={top} left={left}>
      {series &&
        series.map((s, i) => {
          return (
            <Group key={`vx-bar-stack-${i}`}>
              {s.map((d, ii) => {
                const barHeight = yScale(d[0]) - yScale(d[1]);
                const barWidth =
                  width ||
                  (scaleHasBandwidth(xScale)
                    ? xScale.bandwidth()
                    : Math.abs(xRange[xRange.length - 1] - xRange[0]) / xDomain.length);

                const barX = scaleHasBandwidth(xScale)
                  ? xScale(x(d.data))
                  : xScale(x(d.data)) - barWidth / 2;
                return (
                  <Bar
                    key={`bar-group-bar-${i}-${ii}-${s.key}`}
                    x={barX}
                    y={yScale(d[1])}
                    width={barWidth}
                    height={barHeight}
                    fill={zScale(s.key)}
                    data={{
                      paddingInner: isScaleBand(xScale) && xScale.paddingInner(),
                      paddingOuter: isScaleBand(xScale) && xScale.paddingOuter(),
                      step: scaleHasStep(xScale) && xScale.step(),
                      key: s.key,
                      value: d[1],
                      height: barHeight,
                      width: barWidth,
                      x: x(d.data),
                      xFormatted: format(x(d.data)),
                      data: d.data
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

BarStack.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};
