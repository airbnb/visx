import React from 'react';
import cx from 'classnames';
import { Area } from '@vx/shape';
import PropTypes from 'prop-types';
import { ClipPath } from '@vx/clip-path';

Threshold.propTypes = {
  className: PropTypes.string,
  curve: PropTypes.func,
  clipAboveTo: PropTypes.number,
  clipBelowTo: PropTypes.number,
  data: PropTypes.any,
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  aboveAreaProps: PropTypes.object,
  belowAreaProps: PropTypes.object,
  id: PropTypes.string
};

export default function Threshold({
  className,
  curve,
  clipAboveTo,
  clipBelowTo,
  data,
  x,
  y0,
  y1,
  aboveAreaProps,
  belowAreaProps,
  id = ''
}) {
  return (
    <g className={cx('vx-threshold', className)}>
      <Area curve={curve} data={data} x={x} y1={y1}>
        {({ path }) => {
          return (
            <g>
              <ClipPath id={`threshold-clip-below-${id}`}>
                <path d={path.y0(clipBelowTo)(data)} />
              </ClipPath>
              <ClipPath id={`threshold-clip-above-${id}`}>
                <path d={path.y0(clipAboveTo)(data)} />
              </ClipPath>
            </g>
          );
        }}
      </Area>
      <Area
        curve={curve}
        data={data}
        x={x}
        y0={y0}
        y1={y1}
        strokeWidth={0}
        clipPath={`url(#threshold-clip-below-${id})`}
        {...belowAreaProps}
      />
      <Area
        curve={curve}
        data={data}
        x={x}
        y0={y0}
        y1={y1}
        strokeWidth={0}
        clipPath={`url(#threshold-clip-above-${id})`}
        {...aboveAreaProps}
      />
    </g>
  );
}
