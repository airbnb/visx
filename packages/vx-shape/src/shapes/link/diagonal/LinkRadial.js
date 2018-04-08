import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkRadial } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';

export function pathRadialDiagonal({ source, target, angle, radius }) {
  return data => {
    const link = linkRadial();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkRadial.propTypes = {
  innerRef: PropTypes.func,
  angle: PropTypes.func,
  radius: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkRadial({
  className,
  innerRef,
  data,
  path,
  angle = d => d.x,
  radius = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  path = path || pathRadialDiagonal({ source, target, angle, radius });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link-radius', className)}
      d={path(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
