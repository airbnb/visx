import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../../../util/additionalProps';

export function pathRadialStep({ source, target, x, y }) {
  return data => {
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
  };
}

LinkRadialStep.propTypes = {
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkRadialStep({
  className,
  innerRef,
  data,
  path,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  path = path || pathRadialStep({ source, target, x, y });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={path(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
