import React from 'react';

export default function ResponsiveSVG({
  children,
  preserveAspectRatio = 'xMinYMin meet',
  viewBox = '0 0 300 300',
}) {
  return (
    <div style={{
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      verticalAling: 'top',
      overflow: 'hidden',
    }}>
      <svg
        preserveAspectRatio={preserveAspectRatio}
        viewBox={viewBox}
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </svg>
    </div>
  );
}
