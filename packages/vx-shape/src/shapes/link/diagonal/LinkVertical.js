import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkVertical } from 'd3-shape';

export function pathVerticalDiagonal({ source, target, x, y }) {
  return data => {
    const link = linkVertical();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkVertical.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkVertical({
  className,
  innerRef,
  data,
  path,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  children,
  ...restProps
}) {
  path = path || pathVerticalDiagonal({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-diagonal', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
