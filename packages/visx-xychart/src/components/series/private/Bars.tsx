/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxisScale } from '@visx/axis';
import { BarRounded } from '@visx/shape';
import React from 'react';
import { BarsProps } from '../../../types';

export default function Bars<Datum extends object>({
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
}: BarsProps<AxisScale, AxisScale, Datum>) {
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
            radius={typeof radius === 'function' ? radius(barProps) : radius}
            all={typeof radiusAll === 'function' ? radiusAll(barProps) : radiusAll}
            top={typeof radiusTop === 'function' ? radiusTop(barProps) : radiusTop}
            right={typeof radiusRight === 'function' ? radiusRight(barProps) : radiusRight}
            bottom={typeof radiusBottom === 'function' ? radiusBottom(barProps) : radiusBottom}
            left={typeof radiusLeft === 'function' ? radiusLeft(barProps) : radiusLeft}
            {...barProps}
            {...restProps}
          />
        ),
      )}
    </>
  );
}
