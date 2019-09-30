import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';

HeatmapCircle.propTypes = {
  data: PropTypes.array,
  left: PropTypes.number,
  top: PropTypes.number,
  gap: PropTypes.number,
  radius: PropTypes.number,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.func,
};

export default function HeatmapCircle({
  className,
  top,
  left,
  data,
  gap = 1,
  radius = 6,
  xScale,
  yScale,
  colorScale = (/** d */) => undefined,
  opacityScale = (/** d */) => 1,
  bins = d => d.bins,
  count = d => d.count,
  children,
  ...restProps
}) {
  const r = radius - gap;
  const heatmap = data.map((datum, column) => {
    const x = xScale(column);
    return bins(datum).map((bin, row) => {
      const countValue = count(bin);
      return {
        bin,
        row,
        column,
        datum,
        r,
        radius,
        gap,
        count: countValue,
        cx: radius + x,
        cy: yScale(row) + gap + radius,
        opacity: opacityScale(countValue),
        color: colorScale(countValue),
      };
    });
  });
  if (children) return children(heatmap);
  return (
    <Group className="vx-heatmap-circles" top={top} left={left}>
      {heatmap.map(_bins => {
        return _bins.map(bin => {
          return (
            <circle
              key={`heatmap-tile-circle-${bin.row}-${bin.column}`}
              className={cx('vx-heatmap-circle', className)}
              r={bin.r}
              cx={bin.cx}
              cy={bin.cy}
              fill={bin.color}
              fillOpacity={bin.opacity}
              {...restProps}
            />
          );
        });
      })}
    </Group>
  );
}
