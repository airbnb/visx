import React from 'react';
import { BarsProps } from '../../types';

export default function Bars({ bars, ...rest }: BarsProps) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {bars.map(({ key, ...bar }) => (
        <rect key={key} {...bar} {...rest} />
      ))}
    </>
  );
}
