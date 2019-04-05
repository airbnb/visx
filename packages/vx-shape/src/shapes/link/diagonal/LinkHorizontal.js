import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkHorizontal } from 'd3-shape';

export function pathHorizontalDiagonal({ source, target, x, y }) {
  return data => {
    const link = linkHorizontal();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkHorizontal.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func,
  children: PropTypes.func
};

export default function LinkHorizontal({
  className,
  innerRef,
  data,
  path,
  x = d => d.y,
  y = d => d.x,
  source = d => d.source,
  target = d => d.target,
  children,
  ...restProps
}) {
  path = path || pathHorizontalDiagonal({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-diagonal', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
