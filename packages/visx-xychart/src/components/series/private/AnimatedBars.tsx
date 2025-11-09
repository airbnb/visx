import type { AxisScale } from '@visx/axis';
import { BarRounded } from '@visx/shape';
import { useMemo } from 'react';
import { animated, useTransition } from '@react-spring/web';
import type { Bar, BarsProps } from '../../../types';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import AnimatedPath from './AnimatedPath';

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

function AnimatedBarsRounded<XScale extends AxisScale, YScale extends AxisScale>({
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
}: BarsProps<XScale, YScale> & { radius: number }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {bars.map(({ key, fill, x, y, width, height }) => (
        <BarRounded
          key={key}
          x={x}
          y={y}
          width={width}
          height={height}
          radius={radius}
          all={radiusAll}
          top={radiusTop}
          right={radiusRight}
          bottom={radiusBottom}
          left={radiusLeft}
        >
          {({ path }) => (
            <AnimatedPath
              className="visx-bar visx-bar-rounded"
              d={path}
              fill={fill}
              {...pathProps}
            />
          )}
        </BarRounded>
      ))}
    </>
  );
}

function AnimatedBarsUnrounded<XScale extends AxisScale, YScale extends AxisScale>({
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

/** Wrapper component which renders a Bars component depending on whether it needs rounded corners. */
export default function AnimatedBars<XScale extends AxisScale, YScale extends AxisScale>(
  props: BarsProps<XScale, YScale>,
) {
  return props.radius == null ? (
    <AnimatedBarsUnrounded {...props} />
  ) : (
    <AnimatedBarsRounded {...props} radius={props.radius} />
  );
}
