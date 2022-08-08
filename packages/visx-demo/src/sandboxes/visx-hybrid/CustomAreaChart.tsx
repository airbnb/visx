import React, { ReactElement, useEffect, useState } from "react";
import { Group } from "@visx/group";
import { AreaClosed } from "@visx/shape";
import { AxisLeft, AxisBottom, AxisScale } from "@visx/axis";
import { LinearGradient } from "@visx/gradient";
import { curveMonotoneX } from "@visx/curve";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { getTicks, coerceNumber } from "@visx/scale";
import CustomAreaClosed from "./CustomAreaClosed";

// Initialize some variables
const axisColor = "#fff";
const axisBottomTickLabelProps = {
  textAnchor: "middle" as const,
  fontFamily: "Arial",
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: "-0.25em",
  dy: "0.25em",
  fontFamily: "Arial",
  fontSize: 10,
  textAnchor: "end" as const,
  fill: axisColor,
};

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export default function AreaChart({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children,
  main = false,
  height,
}: {
  data: AppleStock[];
  gradientColor: string;
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  width: number;
  yMax: number;
  margin: { top: number; right: number; bottom: number; left: number };
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
  main?: boolean;
  height?: number;
}) {
  const [componentRenderAfterHydration, setComponentRenderAfterHydration] =
    useState<ReactElement | undefined>();

  if (width < 10) return null;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const ticks = getTicks(yScale, 10);
  const areaChartHeight = coerceNumber(yScale(ticks[0]) || 0);

  const component = (
    <CustomAreaClosed
      data={data}
      width={innerWidth}
      height={areaChartHeight}
      xScale={xScale}
      yScale={yScale}
    />
  );

  useEffect(() => {
    setComponentRenderAfterHydration(component);
  }, [data]);

  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient
        id="gradient"
        from={gradientColor}
        fromOpacity={1}
        to={gradientColor}
        toOpacity={0.2}
      />

      {main && componentRenderAfterHydration}

      {!main && (
        <AreaClosed<AppleStock>
          data={data}
          x={(d) => xScale(getDate(d)) || 0}
          y={(d) => yScale(getStockValue(d)) || 0}
          yScale={yScale}
          strokeWidth={1}
          stroke="url(#gradient)"
          fill="url(#gradient)"
          curve={curveMonotoneX}
        />
      )}

      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      {children}
    </Group>
  );
}
