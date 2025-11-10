import type { SVGProps } from 'react';

export type NodeProps = {
  cx?: number;
  cy?: number;
  node?: unknown; // Allow node prop for internal usage when used as nodeComponent
};

export default function DefaultNode({
  r = 15,
  fill = '#21D4FD',
  node, // Accept but don't use the node prop
  ...rest
}: NodeProps & Omit<SVGProps<SVGCircleElement>, keyof NodeProps>) {
  return <circle r={r} fill={fill} {...rest} />;
}
