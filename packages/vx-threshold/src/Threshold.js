import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Area } from '@vx/shape';
import { ClipPath } from '@vx/clip-path';

Threshold.propTypes = {
  className: PropTypes.string,
  curve: PropTypes.func,
  clipAboveTo: PropTypes.func,
  clipBelowTo: PropTypes.func,
  id: PropTypes.string,
  data: PropTypes.any.isRequired,
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  aboveAreaProps: PropTypes.object,
  belowAreaProps: PropTypes.object
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
