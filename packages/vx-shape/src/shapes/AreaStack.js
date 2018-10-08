import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../util/additionalProps';
import { area, stack as d3stack } from 'd3-shape';

AreaStack.propTypes = {
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  keys: PropTypes.array,
  data: PropTypes.array,
  curve: PropTypes.func,
  defined: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  glyph: PropTypes.bool,
  reverse: PropTypes.bool
};

export default function AreaStack({
  className,
  keys,
  data,
  curve,
  defined,
  x,
  x0,
  x1,
  y0,
  y1,
  glyph,
  reverse = false,
  ...restProps
}) {
  const stack = d3stack();
  if (keys) stack.keys(keys);

  const path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (curve) path.curve(curve);
  if (defined) path.defined(defined);

  const seriesData = stack(data);
  if (reverse) seriesData.reverse();

  return (
    <g>
      {seriesData.map((series, i) => {
        return (
          <path
            className={cx('vx-area-stack', className)}
            key={`area-stack-${i}-${series.key || ''}`}
            d={path(series)}
            {...additionalProps(restProps, {
              datum: series[i],
              index: i,
              series
            })}
          />
        );
      })}
      {!!glyph && <g className="vx-area-stack-glyphs">{data.map(glyph)}</g>}
    </g>
  );
}
