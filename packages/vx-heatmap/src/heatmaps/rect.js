import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import additionalProps from '../util/additionalProps';

HeatmapRect.propTypes = {
  data: PropTypes.array,
  binWidth: PropTypes.number,
  binHeight: PropTypes.number,
  x: PropTypes.number,
  gap: PropTypes.number,
  step: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  yBin: PropTypes.func,
  bin: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func
};

export default function HeatmapRect({
  className,
  data,
  binWidth,
  binHeight,
  x = 0,
  gap = 1,
  step = 0,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  yBin,
  bin = (d, i) => d.bin,
  bins = (d, i) => d.bins,
  count = d => d.count,
  ...restProps
}) {
  yBin = yBin || bin;
  const width = binWidth - gap;
  const height = binHeight - gap;
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(bin(d, i))}>
            {bins(d, i).map((b, j) => {
              return (
                <rect
                  key={`heatmap-tile-rect-${j}`}
                  className={cx('vx-heatmap-rect', className)}
                  fill={colorScale(count(b))}
                  width={width}
                  height={height}
                  x={x}
                  y={yScale(yBin(b, j) + step) + gap}
                  fillOpacity={opacityScale(count(b))}
                  {...additionalProps(restProps, {
                    bin: b,
                    index: j,
                    datum: d,
                    datumIndex: i,
                    data
                  })}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}
