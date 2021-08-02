import { AxisScale } from '@visx/axis';
import React, { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import { Bar, BarsProps } from '../../../types';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';
import getScaleBaseline from '../../../utils/getScaleBaseline';

function enterUpdate({ x, y, width, height, fill }: Bar) {
  return {
    x,
    y,
    width,
    height,
    fill: cleanColor(fill),
    opacity: 1,
  };
}

type BarTransitionConfig<Scale extends AxisScale> = {
  scale: Scale;
  horizontal?: boolean;
};

function useBarTransitionConfig<Scale extends AxisScale>({
  scale,
  horizontal,
}: BarTransitionConfig<Scale>) {
  const shouldAnimateX = !!horizontal;
  return useMemo(() => {
    const scaleBaseline = getScaleBaseline(scale);

    function fromLeave({ x, y, width, height, fill }: Bar) {
      return {
        x: shouldAnimateX ? scaleBaseline ?? 0 : x,
        y: shouldAnimateX ? y : scaleBaseline ?? 0,
        width: shouldAnimateX ? 0 : width,
        height: shouldAnimateX ? height : 0,
        fill: cleanColor(fill),
        opacity: 0,
      };
    }

    return {
      unique: true,
      from: fromLeave,
      leave: fromLeave,
      enter: enterUpdate,
      update: enterUpdate,
      keys: (bar: Bar) => bar.key,
    };
  }, [scale, shouldAnimateX]);
}

export default function AnimatedBars<XScale extends AxisScale, YScale extends AxisScale>({
  bars,
  xScale,
  yScale,
  horizontal,
  ...rectProps
}: BarsProps<XScale, YScale>) {
  const animatedBars = useTransition(bars, {
    ...useBarTransitionConfig({ horizontal, scale: horizontal ? xScale : yScale }),
  });
  const isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);

  return (
    <>
      {animatedBars(
        (
          // @ts-expect-error x/y aren't in react-spring types (which are HTML CSS properties)
          { x, y, width, height, fill, opacity },
          item,
          { key },
        ) =>
          item == null || key == null ? null : (
            <animated.rect
              key={key}
              tabIndex={isFocusable ? 0 : undefined}
              className="visx-bar"
              x={x}
              y={y}
              width={width}
              height={height}
              // use the item's fill directly if it's not animate-able
              fill={colorHasUrl(item.fill) ? item.fill : fill}
              opacity={opacity}
              {...rectProps}
            />
          ),
      )}
    </>
  );
}
