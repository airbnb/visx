import React from 'react';

export default function Pattern({
  id,
  width,
  height,
  children,
}) {
  return (
    <defs>
      <pattern
        id={id}
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
      >
        {children}
      </pattern>
    </defs>
  );
}
