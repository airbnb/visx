import React, { useState } from 'react';
import * as allCurves from '@vx/curve';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import generateDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { LinearGradient } from '@vx/gradient';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 10;
const series = new Array(lineCount).fill(null).map(_ => generateDateValue(25));
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(allData, getX),
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY)],
});

type Props = {
  width: number;
  height: number;
  showControls?: boolean;
};

export default function Example({ width, height, showControls = true }: Props) {
  const [curveType, setCurveType] = useState<CurveType>('curveNatural');
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const lineHeight = height / lineCount;

  // update scale output ranges
  xScale.range([0, width]);
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
      <svg width={width} height={height}>
        <LinearGradient id="vx-curves-demo" from="#ec4b5f" to="#b2305b" rotate="-45" />
        <rect width={width} height={height} fill="url(#vx-curves-demo)" rx={14} ry={14} />
        {width > 8 &&
          series.map((lineData, i) => (
            <Group key={`lines-${i}`} top={i * lineHeight}>
              {showPoints &&
                lineData.map((d, j) => (
                  <circle
                    key={i + j}
                    r={3}
                    cx={xScale(getX(d))}
                    cy={yScale(getY(d))}
                    stroke="rgba(255,255,255,0.5)"
                    fill="transparent"
                  />
                ))}
              <LinePath<DateValue>
                curve={allCurves[curveType]}
                data={lineData}
                x={d => xScale(getX(d))}
                y={d => yScale(getY(d))}
                stroke="#ffffff"
                strokeWidth={1.5}
                shapeRendering="geometricPrecision"
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
