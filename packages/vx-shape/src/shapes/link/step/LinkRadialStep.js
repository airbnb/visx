import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pointRadial } from 'd3-shape';
import { path as d3Path } from 'd3-path';
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
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  
  const link = (data) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const sa = sx - Math.PI / 2;
    const sr = sy;
    const ta = tx - Math.PI / 2;
    const tr = ty;

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);
    const sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa;

    return `
      M${sr * sc},${sr * ss}
      A${sr},${sr},0,0,${sf ? 1 : 0},${sr * tc},${sr * ts}
      L${tr * tc},${tr * ts}
    `;

    // TODO: Port to d3-path
    // const path =  d3Path();
    // path.moveTo(sr * sc, sr * ss)
    // path.arcTo(/* TODO */);
    // path.lineTo(tr * tc, tr * ts)

    // return path.toString();
  };

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={link(data)}
      {...restProps}
    />
  );
}