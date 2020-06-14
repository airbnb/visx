import React, { useContext, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import LinePath, { LinePathProps } from '@vx/shape/lib/shapes/LinePath';
import ChartContext from '../../context/ChartContext';
import { SeriesProps } from '../../types';
import withRegisteredData from '../../enhancers/withRegisteredData';
import isValidNumber from '../../typeguards/isValidNumber';
import useRegisteredData from '../../hooks/useRegisteredData';

type LineSeriesProps<Datum, XScaleInput, YScaleInput> = SeriesProps<
  Datum,
  XScaleInput,
  YScaleInput
> &
  Omit<LinePathProps<Datum>, 'x' | 'y' | 'data' | 'innerRef'> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinePathProps<Datum>>;

function LineSeries<Datum = unknown, XScaleInput = unknown, YScaleInput = unknown>({
  data: _,
  xAccessor: __,
  yAccessor: ___,
  dataKey,
  mouseEvents,
  ...lineProps
}: LineSeriesProps<Datum, XScaleInput, YScaleInput>) {
  const { xScale, yScale, colorScale } = useContext(ChartContext);
  const { data, xAccessor, yAccessor } = useRegisteredData<Datum, XScaleInput, YScaleInput>(
    dataKey,
  );

  const getScaledX = useCallback(
    (d: Datum) => {
      const x = xScale(xAccessor(d));
      return isValidNumber(x) ? x + (xScale.bandwidth?.() ?? 0) / 2 : null;
    },
    [xScale, xAccessor],
  );

  const getScaledY = useCallback(
    (d: Datum) => {
      const y = yScale(yAccessor(d));
      return isValidNumber(y) ? y + (yScale.bandwidth?.() ?? 0) / 2 : null;
    },
    [yScale, yAccessor],
  );

  const color = colorScale(dataKey) ?? '#222';

  return (
    <g>
      <LinePath<Datum> data={data} x={getScaledX} y={getScaledY} {...lineProps}>
        {({ path }) => <AnimatedPath stroke={color} {...lineProps} d={path(data) || ''} />}
      </LinePath>
    </g>
  );
}

/** Separate component so that we don't use the `useSpring` hook in a render function callback. */
function AnimatedPath({
  d,
  ...lineProps
}: { d: string } & Partial<Omit<React.SVGProps<SVGPathElement>, 'ref'>>) {
  const tweenedPath = useSpring({ d, config: { precision: 0.01 } });
  return <animated.path d={tweenedPath.d} fill="transparent" {...lineProps} />;
}

export default React.memo(withRegisteredData(LineSeries));
