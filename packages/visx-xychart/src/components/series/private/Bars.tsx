/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxisScale } from '@visx/axis';
import { BarRounded } from '@visx/shape';
import React from 'react';
import { BarsProps } from '../../../types';

export default function Bars({
  bars,
  horizontal,
  xScale,
  yScale,
  radius,
  radiusAll,
  radiusTop,
  radiusRight,
  radiusBottom,
  radiusLeft,
  ...restProps
}: BarsProps<AxisScale, AxisScale>) {
  const isFocusable = Boolean(restProps.onFocus || restProps.onBlur);
  return (
    <>
      {bars.map(({ key, ...barProps }) =>
        radius == null ? (
          <rect
            key={key}
            className="visx-bar"
            tabIndex={isFocusable ? 0 : undefined}
            {...barProps}
            {...restProps}
          />
        ) : (
          <BarRounded
            key={key}
            className="visx-bar"
            tabIndex={isFocusable ? 0 : undefined}
            radius={radius}
            all={radiusAll}
            top={radiusTop}
            right={radiusRight}
            bottom={radiusBottom}
            left={radiusLeft}
            {...barProps}
            {...restProps}
          />
        ),
      )}
    </>
  );
}
