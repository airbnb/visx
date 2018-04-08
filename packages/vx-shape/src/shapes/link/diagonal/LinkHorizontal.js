import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkHorizontal } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';

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
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
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
  ...restProps
}) {
  path = path || pathHorizontalDiagonal({ source, target, x, y });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link-horizontal', className)}
      d={path(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
