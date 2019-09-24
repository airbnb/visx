import React from 'react';
import { LinkProvidedProps, Link as DefaultLink, DefaultNode } from './types';

export default function DefaultLink({ link }: LinkProvidedProps<DefaultLink<DefaultNode>>) {
  return link ? (
    <line
      x1={link && link.source && link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
    />
  ) : null;
}
