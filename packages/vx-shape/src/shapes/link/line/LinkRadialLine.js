import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pointRadial } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';

LinkRadialStep.propTypes = {
  innerRef: PropTypes.func
};

export default function LinkRadialStep({
  className,
  innerRef,
  data,
  x = d => d.x,
  y = d => d.y,
  ...restProps
}) {

  const line = (source, target) => {
    const sa = x(source) - Math.PI / 2;
    const sr = y(source);
    const ta = x(target) - Math.PI / 2;
    const tr = y(target);

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);

    return `
      M${sr * sc},${sr * ss}
      L${tr * tc},${tr * ts}
    `;
  };

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={line(data.source, data.target)}
      {...restProps}
    />
  );
}