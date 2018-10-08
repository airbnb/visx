import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import additionalProps from '../util/additionalProps';

HeatmapCircle.propTypes = {
  data: PropTypes.array,
  gap: PropTypes.number,
  radius: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  className: PropTypes.string
};

export default function HeatmapCircle({
  className,
  data,
  gap = 1,
  radius = 6,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  bins = d => d.bins,
  count = d => d.count,
  ...restProps
}) {
  const r = radius - gap;
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(i)}>
            {bins(d).map((b, j) => {
              return (
                <circle
                  key={`heatmap-tile-circle-${j}`}
                  className={cx('vx-heatmap-circle', className)}
                  fill={colorScale(count(b))}
                  r={r}
                  cx={radius}
                  cy={yScale(j) + gap + radius}
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
