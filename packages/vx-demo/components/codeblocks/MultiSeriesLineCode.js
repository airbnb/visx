import React from 'react';
import Codeblock from './Codeblock';

export default ({}) => {
  return (
    <Codeblock>
      {`// MultiSeriesLine.js
import React from 'react';
import Axis from '@vx/axis';
import Curve from '@vx/curve';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { cityTemperature } from '@vx/mock-data';
import { scaleTime, scaleLinear, scaleOrdinal } from '@vx/scale';
import { extent, max, min } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { compose, withState, withHandlers } from 'recompose';

// util
const parseDate = timeParse("%Y%m%d");

// [{date: "", new york: "", san francisco: "", austin: ""}]
const rawData = cityTemperature;
const cityNames = Object.keys(rawData[0]).filter(k => k !== 'date');

// rawData => [{id: "", values: [{ date, temperature }]}, ...]
const data = cityNames.map((cityName) => {
  return {
    id: cityName,
    values: rawData.map((d) => ({
      date: d.date,
      temperature: d[cityName],
    })),
  }
});

// utils
const getCity = (cityId) => data.find((city) => city.id === cityId);
const addCity = (selected, cityId) => selected.concat(cityId);
const removeCity = (selected, cityId) => selected.filter((city) => city !== cityId);
const removeCityOrResetSelected = (selected, cityId) => {
  let nextSelected = removeCity(selected, cityId);
  if (nextSelected.length === 0) nextSelected = initialSelectedState;
  return nextSelected;
}

// recompose higher-order function for state and event handlers
const initialSelectedState = cityNames;
const withSelected = compose(
  withState('selected', 'setSelected', initialSelectedState),
  withHandlers({
    updateSelected: ({ selected, setSelected }) => cityId => {
      let fn = addCity;
      if (selected.includes(cityId)) fn = removeCityOrResetSelected;
      setSelected(fn(selected, cityId));
    },
    resetSelected: ({ setSelected }) => event => {
      setSelected(initialSelectedState);
    }
  })
);

// the chart
export default withSelected(({
  selected,
  updateSelected,
  resetSelected,
  width,
  height,
  margin,
}) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const x = d => parseDate(d.date);
  const y = d => +d.temperature;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(rawData, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: extent(selected.slice().reduce((ret, c) => {
      return ret.concat(getCity(c).values)
    }, []), y)
  });
  const color = scaleOrdinal({
    range: ['#3b99d8', '#239f85', '#9a5cb4'],
    domain: cityNames,
  });

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <Axis.AxisBottom
          label=''
          top={yMax}
          scale={xScale}
          hideAxisLine
        />
        <Axis.AxisLeft
          scale={yScale}
          label="Temperature (ºF)"
        />
        {selected.map(getCity).map(({ id, values }) => {
          const lastDatum = values[values.length - 1];
          return (
            <g key={'{id}'}>
              <LinePath
                data={values}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                curve={Curve.basis}
                stroke={color(id)}
                strokeWidth={1}
              />
              <text
                fontSize={9}
                dy={"0.35em"}
                dx={2}
                x={xScale(x(lastDatum))}
                y={yScale(y(lastDatum))}
              >
                {id}
              </text>
            </g>
          );
        })}
        <Legend
          data={data}
          selected={selected}
          xMax={xMax}
          yMax={yMax}
          color={color}
          updateSelected={updateSelected}
        />
      </Group>
    </svg>
  );
});

const Legend = ({
  data,
  selected,
  updateSelected,
  xMax,
  yMax,
  color,
}) => {
  const margin = 20;
  const xPadding = 60;
  const yPadding = 30;
  const yOffset = yMax - yPadding;
  const xOffset = xMax - xPadding;
  const size = 8;
  const fontSize = 12;
  return (
    <g>
      {data.map(({ id, values }, i) => {
        return (
          <g
            key={'legend-{id}'}
            className="legend-item"
            transform={'translate({xOffset}, {yOffset - i * margin})'}
            onClick={() => updateSelected(id)}
            fillOpacity={selected.includes(id) ? 1 : 0.5}
          >
            <rect width={size} height={size} fill={color(id)} />
            <text fill={color(id)} dy={".7em"} dx={fontSize} fontSize={fontSize}>
              {id}
            </text>
          </g>
        );
      })}
    </g>
  );
}`}
    </Codeblock>
  );
}
