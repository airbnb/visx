import React, { useContext, useCallback, useMemo, useEffect } from 'react';
import BarGroup from '@vx/shape/lib/shapes/BarGroup';
import BarGroupHorizontal from '@vx/shape/lib/shapes/BarGroupHorizontal';
import { Group as VxGroup } from '@vx/group';
import { scaleBand } from '@vx/scale';
import ChartContext from '../../context/ChartContext';
import { DataRegistry, ChartContext as ChartContextType } from '../../types';

import BarSeries from './BarSeries';

const GROUP_ACCESSOR = d => d.group;

// import { animated, useTransition } from 'react-spring';
// import ChartContext from '../../context/ChartContext';
// import { ChartContext as ChartContextType, SeriesProps } from '../../types';
// import withRegisteredData from '../../enhancers/withRegisteredData';
// import isValidNumber from '../../typeguards/isValidNumber';
// import useRegisteredData from '../../hooks/useRegisteredData';

// props for tuning the group
// export type BarGroupProps<Datum, Key> = {
//   /** Array of data for which to generate grouped bars. */
//   data: Datum[];
//   /** Returns the value mapped to the x0 (group position) of a bar */
//   x0: (d: Datum) => $TSFIXME;
//   /** @vx/scale or d3-scale that takes an x0 value (position of group) and maps it to an x0 axis position of the group. */
//   x0Scale: ScaleType;
//   /** @vx/scale or d3-scale that takes a group key and maps it to an x axis position (within a group). */
//   x1Scale: ScaleType;
//   /** @vx/scale or d3-scale that takes an y value (Datum[key]) and maps it to a y axis position. */
//   yScale: ScaleType;
//   /** Returns the desired color for a bar with a given key and index. */
//   color: (key: Key, index: number) => string;
//   /** Array of keys corresponding to stack layers. */
//   keys: Key[];
//   /** Total height of the y-axis. */
//   height: number;
//   /** className applied to Bars. */
//   className?: string;
//   /** Top offset of rendered Bars. */
//   top?: number;
//   /** Left offset of rendered Bars. */
//   left?: number;
//   /** Override render function which is passed the computed BarGroups. */
//   children?: (barGroups: BarGroup<Key>[]) => React.ReactNode;
// };

export type GroupProps = {
  horizontal?: boolean;
  children: typeof BarSeries;
};

export default function Group<Datum, XScaleInput, YScaleInput>({
  horizontal,
  children,
}: GroupProps) {
  const {
    width,
    height,
    margin,
    xScale,
    yScale,
    colorScale,
    dataRegistry,
    registerData,
  } = useContext(ChartContext) as ChartContextType<Datum, XScaleInput, YScaleInput>;

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => React.Children.map(children, child => child.props.dataKey),
    [children],
  );

  // register all child data
  useEffect(() => {
    const dataToRegister: DataRegistry<Datum> = {};

    React.Children.map(children, child => {
      const { dataKey: key, data, xAccessor, yAccessor, mouseEvents } = child.props;
      dataToRegister[key] = { key, data, xAccessor, yAccessor, mouseEvents };
    });

    registerData(dataToRegister);
  }, [registerData, children]);

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

  const withinGroupScale = useMemo(
    () =>
      scaleBand<string>({
        domain: [...dataKeys],
        range: [0, (horizontal ? yScale : xScale)?.bandwidth?.()],
        padding: 0.1,
      }),
    [dataKeys, xScale, yScale, horizontal],
  );

  // if scales and data are not available in the registry, bail
  if (dataKeys.some(key => dataRegistry[key] == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  // @TODO handle NaNs from non-number inputs, prob fallback to 0
  const scaledZeroPosition = (horizontal ? xScale : yScale)(0);

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
            {barGroup.bars.map(bar => (
              <rect
                key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                x={Math.min(scaledZeroPosition, bar.x)}
                y={bar.y}
                width={Math.abs(bar.width - scaledZeroPosition)}
                height={bar.height}
                fill={bar.color}
                rx={2}
              />
            ))}
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
            {barGroup.bars.map(bar => (
              <rect
                key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                x={bar.x}
                y={Math.min(scaledZeroPosition, bar.y)}
                width={bar.width}
                height={Math.abs(scaledZeroPosition - bar.y)}
                fill={bar.color}
                rx={2}
              />
            ))}
          </VxGroup>
        ))
      }
    </BarGroup>
  );
}
