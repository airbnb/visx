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
  width,
  height,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = yScale.tickFormat ? yScale.tickFormat() : d => d;
  const yRange = yScale.range();
  const yDomain = yScale.domain();
  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
      {series &&
        series.map((s, i) => {
          return (
            <Group key={`vx-bar-stack-horizontal-${i}`}>
              {s.map((d, ii) => {
                const barWidth = xScale(d[1]) - xScale(d[0]);
                const barHeight =
                  width ||
                  (scaleHasBandwidth(yScale)
                    ? yScale.bandwidth()
                    : Math.abs(yRange[yRange.length - 1] - yRange[0]) / yDomain.length);

                const barY = scaleHasBandwidth(yScale)
                  ? yScale(y(d.data))
                  : yScale(y(d.data)) - barHeight / 2;
                return (
                  <Bar
                    key={`bar-group-bar-${i}-${ii}-${s.key}`}
                    x={xScale(d[0])}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={zScale(s.key)}
                    data={{
                      paddingInner: isScaleBand(yScale) && yScale.paddingInner(),
                      paddingOuter: isScaleBand(yScale) && yScale.paddingOuter(),
                      step: scaleHasStep(yScale) && yScale.step(),
                      key: s.key,
                      value: d[0],
                      height: barHeight,
                      width: barWidth,
                      y: y(d.data),
                      yFormatted: format(y(d.data)),
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

BarStackHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};
