import React, { useCallback } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX } from "@visx/curve";
import { GridRows, GridColumns } from "@visx/grid";
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { AxisScale } from "@visx/axis";

type TooltipData = AppleStock;

export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

// util
// eslint-disable-next-line quotes
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export type ContextProps = {
  data?: AppleStock[];
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
    xScale,
    yScale,
  }: AreaProps &
    ContextProps &
    WithTooltipProvidedProps<TooltipData> &
    any) => {
    if (width < 10) return null;

    {
      /* No more need of scales calculation in this component, use brush ones */
    }

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
          | React.MouseEvent<SVGForeignObjectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x - 50);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        if (showTooltip) {
          showTooltip({
            tooltipData: d,
            tooltipLeft: x - 50,
            tooltipTop: yScale(getStockValue(d)),
          });
        }
      },
      [showTooltip, yScale, xScale]
    );

    return (
      <g width={width} height={height} style={{ position: "relative" }}>
        <g style={{ position: "relative", zIndex: 20 }}>
          <svg width={width} height={height}>
            {/* here was rect element, taken off to homogenize chart */}

            <LinearGradient
              id="area-background-gradient"
              from={background}
              to={background2}
            />
            <LinearGradient
              id="area-gradient"
              from={accentColor}
              to={accentColor}
              toOpacity={0.1}
            />
            <GridRows
              left={margin.left}
              scale={yScale}
              width={width}
              strokeDasharray="1,3"
              stroke={accentColor}
              strokeOpacity={0}
              pointerEvents="none"
            />
            <GridColumns
              top={margin.top}
              scale={xScale}
              height={height}
              strokeDasharray="1,3"
              stroke={accentColor}
              strokeOpacity={0.2}
              pointerEvents="none"
            />
            <AreaClosed<AppleStock>
              data={data}
              x={(d) => {
                return xScale(getDate(d)) || 0;
              }}
              y={(d) => {
                return yScale(getStockValue(d)) || 0;
              }}
              yScale={yScale}
              strokeWidth={1}
              stroke="url(#gradient)"
              fill="url(#gradient)"
              curve={curveMonotoneX}
            />
            <Bar
              x={margin.left}
              y={margin.top}
              width={width}
              height={height}
              fill="transparent"
              rx={14}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => {
                if (hideTooltip) {
                  return hideTooltip();
                }
              }}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: margin.top }}
                  to={{ x: tooltipLeft, y: height + margin.top }}
                  stroke={accentColorDark}
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill={accentColorDark}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
          </svg>
        </g>

        {tooltipData && (
          <g>
            {/* Use of SVGForeignObject element instead of TooltipWithBounds and Tooltip */}
            {/* Include handling of mouse events  */}

            <foreignObject
              style={{
                width,
                height,
                overflow: "visible",
              }}
              onMouseEnter={(e) => {
                handleTooltip(e);
              }}
              onMouseMove={(e) => {
                handleTooltip(e);
              }}
              onMouseLeave={() => {
                if (hideTooltip) {
                  return hideTooltip();
                }
              }}
            >
              {/* Reversing of tooltip... */}
              <div
                style={{
                  top: tooltipTop - 12,
                  left:
                    tooltipLeft >= width - 70
                      ? tooltipLeft - 70
                      : tooltipLeft + 12,
                  ...tooltipStyles,
                }}
              >
                {`$${getStockValue(tooltipData)}`}
              </div>
            </foreignObject>
            <foreignObject
              style={{
                width,
                height,
                overflow: "visible",
              }}
              onMouseEnter={(e) => {
                handleTooltip(e);
              }}
              onMouseMove={(e) => {
                handleTooltip(e);
              }}
              onMouseLeave={() => {
                if (hideTooltip) {
                  return hideTooltip();
                }
              }}
            >
              <div
                style={{
                  top: height + margin.top - 24,
                  left:
                    tooltipLeft >= width - 70 ? tooltipLeft - 70 : tooltipLeft,
                  ...defaultStyles,
                  minWidth: 72,
                  textAlign: "center",
                  transform: "translateX(-50%)",
                }}
              >
                {formatDate(getDate(tooltipData))}
              </div>
            </foreignObject>
          </g>
        )}
      </g>
    );
  },
  {},
  (children: any, props: any) => {
    return React.createElement(React.Fragment, props, children);
  }
);
