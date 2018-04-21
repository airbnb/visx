import React from 'react';

export default ({ id, children, ...restProps }) => (
  <defs>
    <clipPath id={id} {...restProps}>
      {children}
    </clipPath>
  </defs>
);
