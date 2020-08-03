import React, { useState } from 'react';
import * as allCurves from '@vx/curve';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { MarkerArrow, MarkerCross, MarkerCircle } from '@vx/marker';
import generateDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { LinearGradient } from '@vx/gradient';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 5;
const series = new Array(lineCount)
  .fill(null)
  .map(_ =>
    generateDateValue(25).sort((a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()),
  );
const allData = series.reduce((rec, d) => rec.concat(d), []);
export const gradientColor1 = '#ec4b5f';
export const gradientColor2 = '#4f0000'; // '#b2305b';

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY) as number],
});

export type CurveProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export default function Example({ width, height, showControls = true }: CurveProps) {
  const [curveType, setCurveType] = useState<CurveType>('curveStep');
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const svgHeight = showControls ? height - 40 : height;
  const lineHeight = svgHeight / lineCount;

  // update scale output ranges
  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

  return (
    <div className="vx-curves-demo">
      {showControls && (
        <>
          <label>
            Curve type &nbsp;
            <select onChange={e => setCurveType(e.target.value as CurveType)} value={curveType}>
              {curveTypes.map(curve => (
                <option key={curve} value={curve}>
                  {curve}
                </option>
              ))}
            </select>
          </label>
          &nbsp;
          <label>
            Show points&nbsp;
            <input
              type="checkbox"
              checked={showPoints}
              onChange={() => setShowPoints(!showPoints)}
            />
          </label>
          <br />
        </>
      )}
      <svg width={width} height={svgHeight}>
        <LinearGradient
          id="vx-curves-demo"
          from={gradientColor1}
          to={gradientColor2}
          rotate="-45"
        />
        <MarkerCross
          id="marker-cross-odd"
          stroke="#333"
          size={22}
          strokeWidth={4}
          markerUnits="userSpaceOnUse"
          orient={45}
        />
        <MarkerCross
          id="marker-cross"
          stroke="#333"
          size={22}
          strokeWidth={4}
          strokeOpacity={0.6}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCircle id="marker-circle" fill="#333" radius={2} refX={2} />
        <MarkerArrow id="marker-arrow-odd" stroke="#333" />
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} />
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
        {width > 8 &&
          series.map((lineData, i) => (
            <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
              {showPoints &&
                lineData.map((d, j) => (
                  <circle
                    key={i + j}
                    r={3}
                    cx={xScale(getX(d))}
                    cy={yScale(getY(d))}
                    stroke="rgba(33,33,33,0.5)"
                    fill="transparent"
                  />
                ))}
              <LinePath<DateValue>
                curve={allCurves[curveType]}
                data={lineData}
                x={d => xScale(getX(d))}
                y={d => yScale(getY(d))}
                stroke="#333"
                strokeWidth={i % 2 === 0 ? 2 : 1}
                strokeOpacity={i % 2 === 0 ? 0.6 : 1}
                shapeRendering="geometricPrecision"
                markerMid="url(#marker-circle)"
                markerStart={i % 2 === 0 ? 'url(#marker-cross)' : 'url(#marker-cross-odd)'}
                markerEnd={i % 2 === 0 ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)'}
              />
            </Group>
          ))}
      </svg>
      <style jsx>{`
        .vx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
