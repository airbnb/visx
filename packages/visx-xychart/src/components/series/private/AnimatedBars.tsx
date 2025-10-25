import { AxisScale } from '@visx/axis';
import { BarRounded } from '@visx/shape';
import React, { useMemo } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { Bar, BarsProps } from '../../../types';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import AnimatedPath from './AnimatedPath';

function enterUpdate<Datum extends object>({ x, y, width, height, fill }: Bar<Datum>) {
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

function useBarTransitionConfig<Scale extends AxisScale, Datum extends object>({
  scale,
  horizontal,
}: BarTransitionConfig<Scale>) {
  const shouldAnimateX = !!horizontal;
  return useMemo(() => {
    const scaleBaseline = getScaleBaseline(scale);

    function fromLeave({ x, y, width, height, fill }: Bar<Datum>) {
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
      keys: (bar: Bar<Datum>) => bar.key,
    };
  }, [scale, shouldAnimateX]);
}

function AnimatedBarsRounded<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  bars,
  xScale,
  yScale,
  horizontal,
  radius,
  radiusAll,
  radiusTop,
  radiusRight,
  radiusBottom,
  radiusLeft,
  ...pathProps
}: Omit<BarsProps<XScale, YScale, Datum>, 'radius'> &
  Required<Pick<BarsProps<XScale, YScale, Datum>, 'radius'>>) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {bars.map(({ key, ...barProps }) => (
        <BarRounded
          key={key}
          x={barProps.x}
          y={barProps.y}
          width={barProps.width}
          height={barProps.height}
          radius={typeof radius === 'function' ? radius(barProps) : radius}
          all={typeof radiusAll === 'function' ? radiusAll(barProps) : radiusAll}
          top={typeof radiusTop === 'function' ? radiusTop(barProps) : radiusTop}
          right={typeof radiusRight === 'function' ? radiusRight(barProps) : radiusRight}
          bottom={typeof radiusBottom === 'function' ? radiusBottom(barProps) : radiusBottom}
          left={typeof radiusLeft === 'function' ? radiusLeft(barProps) : radiusLeft}
        >
          {({ path }) => (
            <AnimatedPath
              className="visx-bar visx-bar-rounded"
              d={path}
              fill={barProps.fill}
              {...pathProps}
            />
          )}
        </BarRounded>
      ))}
    </>
  );
}

function AnimatedBarsUnrounded<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  bars,
  xScale,
  yScale,
  horizontal,
  radius,
  radiusAll,
  radiusTop,
  radiusRight,
  radiusBottom,
  radiusLeft,
  ...rectProps
}: BarsProps<XScale, YScale, Datum>) {
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

/** Wrapper component which renders a Bars component depending on whether it needs rounded corners. */
export default function AnimatedBars<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: BarsProps<XScale, YScale, Datum>) {
  return props.radius == null ? (
    <AnimatedBarsUnrounded {...props} />
  ) : (
    <AnimatedBarsRounded {...props} radius={props.radius} />
  );
}
