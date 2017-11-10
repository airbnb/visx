import React from 'react';
import classnames from 'classnames';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';

function verticalToHorizontal([x1, y1, x2, y2]){
  return [y1, x1, y2, x2];
}

export default function BoxPlot({
  left = 0,
  top = 0,
  className,
  data,
  max,
  min,
  firstQuartile,
  thirdQuartile,
  median,
  boxWidth,
  fill,
  fillOpacity,
  stroke,
  strokeWidth,
  rx = 2,
  ry = 2,
  valueScale,
  outliers,
  horizontal,
  medianProps = {},
  maxProps = {},
  minProps = {},
  boxProps = {},
  outlierProps = {},
  container = false,
  containerProps = {},
  ...restProps
}) {
  const offset = horizontal? top: left;
  const center = offset + boxWidth / 2;
  let maxLinePos = Array(4).fill(0);
  let maxToBoxLinePos = Array(4).fill(0);
  let boxPos = Array(4).fill(0);
  let medianLinePos = Array(4).fill(0);
  let minToBoxLinePos = Array(4).fill(0);
  let minLinePos = Array(4).fill(0);
  maxLinePos[0] = center - boxWidth / 4;
  maxLinePos[1] = valueScale(max);
  maxLinePos[2] = center + boxWidth / 4;
  maxLinePos[3] = valueScale(max);

  maxToBoxLinePos[0] = center;
  maxToBoxLinePos[1] = valueScale(max);
  maxToBoxLinePos[2] = center;
  maxToBoxLinePos[3] = valueScale(thirdQuartile);

  boxPos[0] = offset;
  boxPos[1] = valueScale(thirdQuartile);
  boxPos[2] = boxWidth;
  boxPos[3] = Math.abs(valueScale(thirdQuartile) - valueScale(firstQuartile));

  medianLinePos[0] = offset;
  medianLinePos[1] = valueScale(median);
  medianLinePos[2] = offset + boxWidth;
  medianLinePos[3] = valueScale(median);

  minToBoxLinePos[0] = center;
  minToBoxLinePos[1] = valueScale(firstQuartile);
  minToBoxLinePos[2] = center;
  minToBoxLinePos[3] = valueScale(min);

  minLinePos[0] = center - boxWidth / 4;
  minLinePos[1] = valueScale(min);
  minLinePos[2] = center + boxWidth / 4;
  minLinePos[3] = valueScale(min);
  if (horizontal) {
    maxLinePos = verticalToHorizontal(maxLinePos);
    maxToBoxLinePos = verticalToHorizontal(maxToBoxLinePos);
    boxPos = verticalToHorizontal(boxPos);
    boxPos[0] = valueScale(firstQuartile);
    medianLinePos = verticalToHorizontal(medianLinePos);
    minToBoxLinePos = verticalToHorizontal(minToBoxLinePos);
    minLinePos = verticalToHorizontal(minLinePos);
  }
  return (
    <Group className={classnames('vx-boxplot', className)}>
      <line
        className="vx-boxplot-max"
        x1={maxLinePos[0]}
        y1={maxLinePos[1]}
        x2={maxLinePos[2]}
        y2={maxLinePos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(maxProps, {
          data,
          max,
          x1: maxLinePos[0],
          x2: maxLinePos[2],
        })}
      />
      <line
        x1={maxToBoxLinePos[0]}
        y1={maxToBoxLinePos[1]}
        x2={maxToBoxLinePos[2]}
        y2={maxToBoxLinePos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <rect
        x={boxPos[0]}
        y={boxPos[1]}
        width={boxPos[2]}
        height={boxPos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        fillOpacity={fillOpacity}
        rx={rx}
        ry={ry}
        {...additionalProps(boxProps, {
          data,
          height: boxPos[3],
          median,
          firstQuartile,
          thirdQuartile,
          min,
          max,
          x1: boxPos[0],
          x2: boxPos[0] + boxPos[2]
        })}
      />
      <line
        className="vx-boxplot-median"
        x1={medianLinePos[0]}
        y1={medianLinePos[1]}
        x2={medianLinePos[2]}
        y2={medianLinePos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(medianProps, {
          data,
          median,
          x1: medianLinePos[0],
          x2: medianLinePos[2]
        })}
      />
      <line
        x1={minToBoxLinePos[0]}
        y1={minToBoxLinePos[1]}
        x2={minToBoxLinePos[2]}
        y2={minToBoxLinePos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        className="vx-boxplot-min"
        x1={minLinePos[0]}
        y1={minLinePos[1]}
        x2={minLinePos[2]}
        y2={minLinePos[3]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...additionalProps(minProps, {
          data,
          min,
          x1: minLinePos[0],
          x2: minLinePos[2],
        })}
      />
      {outliers.map((d, i) => {
        return (
          <circle
            key={i}
            cx={horizontal?valueScale(d):center}
            cy={horizontal?center:valueScale(d)}
            strokeWidth={strokeWidth}
            fill={fill}
            fillOpacity={fillOpacity}
            r="5"
            {...additionalProps(outlierProps, {
              data: d,
            })}
          />);
        })
      }
      {container &&
        <rect
          x={left}
          y={max}
          width={boxWidth}
          height={min - max}
          fillOpacity="0"
          {...additionalProps(containerProps, {
            data,
            x1: left,
            x2: left + boxWidth,
            median,
            max,
            min,
            thirdQuartile,
            firstQuartile
          })}
        />}
    </Group>
  );
}
