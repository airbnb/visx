import React from 'react';

export default ({
  id,
  from,
  to,
  fromOffset = "0%",
  toOffset = "100%",
  ...restProps
}) => {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%" {...restProps}>
        <stop offset={fromOffset} stopColor={from} />
        <stop offset={toOffset} stopColor={to} />
      </linearGradient>
    </defs>
  );
}
