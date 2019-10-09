import React from 'react';

export type ScaleSVGProps = {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  xOrigin?: number | string;
  yOrigin?: number | string;
  preserveAspectRatio?: string;
  innerRef?: React.Ref<SVGSVGElement>;
};

export default function ResponsiveSVG({
  children,
  width,
  height,
  xOrigin = 0,
  yOrigin = 0,
  preserveAspectRatio = 'xMinYMin meet',
  innerRef,
}: ScaleSVGProps) {
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
        ref={innerRef}
      >
        {children}
      </svg>
    </div>
  );
}
