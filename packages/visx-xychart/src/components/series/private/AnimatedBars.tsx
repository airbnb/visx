import { AxisScale } from '@visx/axis';
import React, { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import { Bar, BarsProps } from '../../../types';
import getScaleBaseline from '../../../utils/getScaleBaseline';

function enterUpdate({ x, y, width, height, fill }: Bar) {
  return {
    x,
    y,
    width,
    height,
    fill,
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
        fill,
        opacity: 0,
      };
    }

    return { from: fromLeave, leave: fromLeave, enter: enterUpdate, update: enterUpdate };
  }, [scale, shouldAnimateX]);
}

export default function AnimatedBars<XScale extends AxisScale, YScale extends AxisScale>({
  bars,
  xScale,
  yScale,
  horizontal,
  ...rectProps
}: BarsProps<XScale, YScale>) {
  const animatedBars = useTransition(bars, bar => bar.key, {
    unique: true,
    ...useBarTransitionConfig({ horizontal, scale: horizontal ? xScale : yScale }),
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedBars.map((
        // @ts-ignore x/y aren't in react-spring types (which are HTML CSS properties)
        { item, key, props: { x, y, width, height, fill, opacity } },
      ) =>
        item == null || key == null ? null : (
          <animated.rect
            key={key}
            className="visx-bar"
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            opacity={opacity}
            {...rectProps}
          />
        ),
      )}
    </>
  );
}
