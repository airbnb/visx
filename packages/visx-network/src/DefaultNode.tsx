import React from 'react';

export type NodeProps = {
  cx?: number;
  cy?: number;
};

export default function DefaultNode({
  r = 15,
  fill = '#21D4FD',
  ...rest
}: NodeProps & Omit<React.SVGProps<SVGCircleElement>, keyof NodeProps>) {
  return <circle r={r} fill={fill} {...rest} />;
}
