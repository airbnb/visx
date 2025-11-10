import type { ReactNode, Ref } from 'react';

export type ScaleSVGProps = {
  /** Child SVG to scale, rendered as the child of the parent wrappers provided by this component `<div><svg>{children}</svg></div>`. */
  children?: ReactNode;
  /** Width of the desired SVG. */
  width?: number | string;
  /** Height of the desired SVG. */
  height?: number | string;
  /** xOrigin of the desired SVG. */
  xOrigin?: number | string;
  /** yOrigin of the desired SVG. */
  yOrigin?: number | string;
  /** Whether to preserve SVG aspect ratio. */
  preserveAspectRatio?: string;
  /** Ref to the parent `<svg />` used for scaling. */
  innerRef?: Ref<SVGSVGElement>;
};

export default function ScaleSVG({
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
