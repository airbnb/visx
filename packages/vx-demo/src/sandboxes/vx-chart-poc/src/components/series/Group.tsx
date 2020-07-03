import React, { useContext, useMemo, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';
import {
  BarGroup as BarGroupType,
  BarGroupHorizontal as BarGroupHorizontalType,
} from '@vx/shape/lib/types';
import BarGroup from '@vx/shape/lib/shapes/BarGroup';
import BarGroupHorizontal from '@vx/shape/lib/shapes/BarGroupHorizontal';
import { Group as VxGroup } from '@vx/group';
import { scaleBand } from '@vx/scale';
import ChartContext from '../../context/ChartContext';
import { DataRegistry, ChartContext as ChartContextType, NearestDatumArgs } from '../../types';

import BarSeries from './BarSeries';
import findNearestDatumX from '../../util/findNearestDatumX';
import findNearestDatumY from '../../util/findNearestDatumY';

const GROUP_ACCESSOR = d => d.group;

export type GroupProps = {
  horizontal?: boolean;
  children: typeof BarSeries;
};

// @TODO add GroupKeys type
export default function Group<Datum, XScaleInput, YScaleInput>({
  horizontal,
  children,
}: GroupProps) {
  console.log('render Group');

  const {
    width,
    height,
    margin,
    xScale,
    yScale,
    colorScale,
    dataRegistry,
    registerData,
    unregisterData,
  } = useContext(ChartContext) as ChartContextType<Datum, XScaleInput, YScaleInput>;

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => React.Children.map(children, child => child.props.dataKey),
    [children],
  );

  const withinGroupScale = useMemo(
    () =>
      scaleBand<string>({
        domain: [...dataKeys],
        range: [0, (horizontal ? yScale : xScale)?.bandwidth?.()],
        padding: 0.1,
      }),
    [dataKeys, xScale, yScale, horizontal],
  );

  // @todo, this should be refactored such that it can be memoized.
  // currently it references withinGroupScale which depends on xScale, yScale,
  // and thus causes an infinite loop for updating the data registry.
  const findNearestDatum = (args: NearestDatumArgs<Datum, XScaleInput, YScaleInput>) => {
    const nearestDatum = horizontal
      ? findNearestDatumY<Datum, XScaleInput, YScaleInput>(args)
      : findNearestDatumX<Datum, XScaleInput, YScaleInput>(args);

    if (!nearestDatum) return null;

    const distanceX = horizontal
      ? nearestDatum.distanceX
      : Math.abs(
          args.svgMouseX -
            (args.xScale(args.xAccessor(nearestDatum.datum)) +
              withinGroupScale(args.key) +
              withinGroupScale.bandwidth() / 2),
        );

    const distanceY = horizontal
      ? Math.abs(
          args.svgMouseY -
            (args.yScale(args.yAccessor(nearestDatum.datum)) +
              withinGroupScale(args.key) +
              withinGroupScale.bandwidth() / 2),
        )
      : nearestDatum.distanceY;

    return {
      ...nearestDatum,
      distanceX,
      distanceY,
    };
  };

  useEffect(
    // register all child data
    () => {
      const dataToRegister: DataRegistry<Datum> = {};

      React.Children.map(children, child => {
        const { dataKey: key, data, xAccessor, yAccessor, mouseEvents } = child.props;
        dataToRegister[key] = { key, data, xAccessor, yAccessor, mouseEvents, findNearestDatum };
      });

      registerData(dataToRegister);
      return () => unregisterData(Object.keys(dataToRegister));
    },
    // @TODO fix findNearestDatum
    // can't include findNearestDatum as it depends on withinGroupScale which depends
    // on the registry so will cause an infinite loop.
    [registerData, unregisterData, children],
  );

  // merge all child data by x value
  const combinedData: {
    [dataKey in string | 'group']: YScaleInput | XScaleInput;
  }[] = useMemo(() => {
    const dataByGroupValue = {};
    dataKeys.forEach(key => {
      const { data = [], xAccessor, yAccessor } = dataRegistry[key] || {};

      // this should exist but double check
      if (!xAccessor || !yAccessor) return;

      data.forEach(d => {
        const group = (horizontal ? yAccessor : xAccessor)(d);
        const groupKey = String(group);
        if (!dataByGroupValue[groupKey]) dataByGroupValue[groupKey] = { group };
        dataByGroupValue[groupKey][key] = (horizontal ? xAccessor : yAccessor)(d);
      });
    });
    return Object.values(dataByGroupValue);
  }, [horizontal, dataKeys, dataRegistry]);

  // if scales and data are not available in the registry, bail
  if (dataKeys.some(key => dataRegistry[key] == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  // @TODO handle NaNs from non-number inputs, prob fallback to 0
  const scaledZeroPosition = (horizontal ? xScale : yScale)(0);

  // @TODO should consider refactoring base shapes to handle negative values better
  return horizontal ? (
    <BarGroupHorizontal<unknown, string>
      data={combinedData}
      keys={dataKeys}
      width={width - margin.left - margin.right} // this is unused, should be removed in component
      x={xValue => xScale(xValue)}
      y0={GROUP_ACCESSOR}
      y0Scale={yScale} // group position
      y1Scale={withinGroupScale}
      xScale={xScale}
      color={colorScale}
    >
      {barGroups =>
        barGroups.map(barGroup => (
          <VxGroup key={`bar-group-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
            <AnimatedBarGroup
              barGroup={barGroup}
              x={bar => Math.min(scaledZeroPosition, bar.x)}
              y={bar => bar.y}
              width={bar => Math.abs(bar.width - scaledZeroPosition)}
              height={bar => bar.height}
            />
          </VxGroup>
        ))
      }
    </BarGroupHorizontal>
  ) : (
    <BarGroup<unknown, string>
      data={combinedData}
      keys={dataKeys}
      height={height - margin.top - margin.bottom} // BarGroup should figure this out from yScale
      x0={GROUP_ACCESSOR}
      x0Scale={xScale} // group position
      x1Scale={withinGroupScale}
      yScale={yScale}
      color={dataKey => colorScale(dataKey) as string}
    >
      {barGroups =>
        barGroups.map(barGroup => (
          <VxGroup key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
            <AnimatedBarGroup
              barGroup={barGroup}
              x={bar => bar.x}
              y={bar => Math.min(scaledZeroPosition, bar.y)}
              width={bar => bar.width}
              height={bar => Math.abs(scaledZeroPosition - bar.y)}
            />
          </VxGroup>
        ))
      }
    </BarGroup>
  );
}

type Bar = (BarGroupType<string> | BarGroupHorizontalType<string>)['bars'][number];
type DimensionAccessor = (bar: Bar) => number;

function AnimatedBarGroup({
  barGroup,
  x,
  y,
  width,
  height,
}: {
  barGroup: BarGroupType<string> | BarGroupHorizontalType<string>;
  x: DimensionAccessor;
  y: DimensionAccessor;
  width: DimensionAccessor;
  height: DimensionAccessor;
}) {
  const animatedBarGroup = useSprings(
    barGroup.bars.length,
    barGroup.bars.map(bar => {
      return {
        x: x(bar),
        y: y(bar),
        width: width(bar),
        height: height(bar),
        color: bar.color,
      };
    }),
  ) as { x: number; y: number; width: number; height: number; color: string }[];

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedBarGroup.map((bar, index) => (
        <animated.rect
          key={`${index}`}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          fill={bar.color}
          rx={2}
        />
      ))}
    </>
  );
}
