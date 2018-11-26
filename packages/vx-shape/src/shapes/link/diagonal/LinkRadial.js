import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkRadial } from 'd3-shape';

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
  path: PropTypes.func,
  children: PropTypes.func
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
  children,
  ...restProps
}) {
  path = path || pathRadialDiagonal({ source, target, angle, radius });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-diagonal', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
