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
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {bars.map(({ key, ...barProps }) => (
        <rect key={key} {...barProps} {...rectProps} />
      ))}
    </>
  );
}
