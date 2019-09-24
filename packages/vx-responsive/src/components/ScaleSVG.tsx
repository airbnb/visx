// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';

type Props = {
  children?: any;
  width?: number | string;
  height?: number | string;
  xOrigin?: number | string;
  yOrigin?: number | string;
  preserveAspectRatio?: string;
  innerRef?: ((...args: any[]) => any) | any;
};

export default function ResponsiveSVG({
  children,
  width,
  height,
  xOrigin = 0,
  yOrigin = 0,
  preserveAspectRatio = 'xMinYMin meet',
  innerRef,
}: Props) {
  return (
    // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        verticalAlign: 'top',
        overflow: 'hidden',
      }}
    >
      {/*
// @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
