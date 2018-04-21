import React from 'react';
import PropTypes from 'prop-types';

LinearGradient.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  x1: PropTypes.string,
  y1: PropTypes.string,
  y2: PropTypes.string,
  fromOffset: PropTypes.string,
  fromOpacity: PropTypes.number,
  toOffset: PropTypes.string,
  toOpacity: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.string
};

export default function LinearGradient({
  children,
  id,
  from,
  to,
  x1,
  y1,
  x2,
  y2,
  fromOffset = '0%',
  fromOpacity = 1,
  toOffset = '100%',
  toOpacity = 1,
  rotate,
  transform,
  vertical = true,
  ...restProps
}) {
  if (vertical && !x1 && !x2 && !y1 && !y2) {
    x1 = '0';
    x2 = '0';
    y1 = '0';
    y2 = '1';
  }
  return (
    <defs>
      <linearGradient
        id={id}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        gradientTransform={rotate ? `rotate(${rotate})` : transform}
        {...restProps}
      >
        {!!children && children}
        {!children && <stop offset={fromOffset} stopColor={from} stopOpacity={fromOpacity} />}
        {!children && <stop offset={toOffset} stopColor={to} stopOpacity={toOpacity} />}
      </linearGradient>
    </defs>
  );
}
