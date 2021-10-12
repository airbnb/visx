/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarsProps } from '../../../types';

export default function Bars({
  bars,
  horizontal,
  xScale,
  yScale,
  ...rectProps
}: BarsProps<any, any>) {
  const isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);
  return (
    <>
      {bars.map(({ key, ...barProps }) => (
        <rect
          key={key}
          className="visx-bar"
          tabIndex={isFocusable ? 0 : undefined}
          {...barProps}
          {...rectProps}
        />
      ))}
    </>
  );
}
