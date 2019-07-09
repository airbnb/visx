import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';

HeatmapRect.propTypes = {
  data: PropTypes.array,
  top: PropTypes.number,
  left: PropTypes.number,
  binWidth: PropTypes.number,
  binHeight: PropTypes.number,
  x0: PropTypes.number,
  gap: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.func
};

export default function HeatmapRect({
  className,
  top,
  left,
  data,
  binWidth,
  binHeight,
  x0 = 0,
  gap = 1,
  xScale,
  yScale,
  colorScale = d => undefined,
  opacityScale = d => 1,
  bins = d => d.bins,
  count = d => d.count,
  children,
  ...restProps
}) {
  const width = binWidth - gap;
  const height = binHeight - gap;
  const heatmap = data.map((datum, column) => {
    const x = xScale(column);
    return bins(datum).map((bin, row) => {
      const countValue = count(bin);
      return {
        bin,
        row,
        column,
        datum,
        width,
        height,
        gap,
        count: countValue,
        x: x + x0,
        y: yScale(row) + gap,
        color: colorScale(countValue),
        opacity: opacityScale(countValue)
      };
    });
  });
  if (children) return children(heatmap);
  return (
    <Group className="vx-heatmap-rects" top={top} left={left}>
      {heatmap.map((_bins, column) => {
        return _bins.map(bin => {
          return (
            <rect
              key={`heatmap-tile-rect-${bin.row}-${bin.column}`}
              className={cx('vx-heatmap-rect', className)}
              width={bin.width}
              height={bin.height}
              x={bin.x}
              y={bin.y}
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
