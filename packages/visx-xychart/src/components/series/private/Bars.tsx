import { AxisScale } from '@visx/axis';
import { Bar, BarRounded } from '@visx/shape';
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
  BarComponent,
  ...restProps
}: BarsProps<AxisScale, AxisScale>) {
  const isFocusable = Boolean(restProps.onFocus || restProps.onBlur);

  return (
    <>
      {bars.map(({ key, ...barProps }) =>
        BarComponent ? (
          <BarComponent
            key={key}
            className="visx-bar"
            tabIndex={isFocusable ? 0 : undefined}
            {...barProps}
            {...restProps}
          />
        ) : radius == null ? (
          <Bar key={key} tabIndex={isFocusable ? 0 : undefined} {...barProps} {...restProps} />
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
