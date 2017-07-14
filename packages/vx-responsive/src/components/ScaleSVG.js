import React from 'react';

export default function ResponsiveSVG({
  children,
  width,
  height,
  xOrigin = 0,
  yOrigin = 0,
  preserveAspectRatio = 'xMinYMin meet',
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        verticalAlign: 'top',
        overflow: 'hidden',
      }}
    >
      <svg
        preserveAspectRatio={preserveAspectRatio}
        viewBox={`${xOrigin} ${yOrigin} ${width} ${height}`}
      >
        {children}
      </svg>
    </div>
  );
}
