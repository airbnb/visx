import React from 'react';
import { RenderShapeProvidedProps } from '@vx/legend/src/types';

/** Example of rendering of a custom legend shape */
export default function CustomLegendShape({
  itemIndex,
  fill,
  size,
}: RenderShapeProvidedProps<string, string>) {
  return (
    <div style={{ color: fill, pointerEvents: 'none', fontSize: size }}>
      {[...new Array(itemIndex + 1)].map(() => '$')}
    </div>
  );
}
