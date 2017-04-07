import React from 'react';
import Codeblock from './Codeblock';

export default ({}) => {
  return (
    <Codeblock>
      {`// MultiSeriesLine.js
import React from 'react';
import Mock from '@vx/mock-data';
import Group from '@vx/group';
import Curve from '@vx/curve';
import Scale from '@vx/scale';
import Axis from '@vx/axis';
import Shape from '@vx/shape';
import { extent, max, min } from 'd3-array';
import { timeParse } from 'd3-time-format';

const rawData = Mock.cityTemperature;
const cities = Object.keys(rawData[0]).filter(k => k !== 'date');

const data = cities.map((city) => {
  return {
    id: city,
    values: rawData.map((d) => ({
      date: d.date,
      temperature: d[city],
    })),
  }
});

export default class MultiSeriesLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState(() => ({ city: data[value] }))
  }

  render() {
    const { width, height, margin } = this.props;
    const { city } = this.state;

    const parseDate = timeParse("%Y%m%d");

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => parseDate(d.date);
    const y = d => +d.temperature;

    const xScale = Scale.scaleTime({
      range: [0, xMax],
      domain: extent(rawData, x),
    });
    const yScale = Scale.scaleLinear({
      range: [yMax, 0],
      domain: !!city ? extent(city.values, y) : [
        min(data, (city) => min(city.values, y)),
        max(data, (city) => max(city.values, y))
      ],
    });
    const color = Scale.scaleOrdinal({
      range: ['#3b99d8', '#239f85', '#9a5cb4'],
      domain: cities,
    });

    return (
      <div>
        <form className="cities-select" onChange={this.handleChange}>
          <label>
            <input type="radio" name="city" value={-1} checked={!city}/>
            All
          </label>
          {cities.map((city,i) => {
            return (
              <label key={city}>
                <input type="radio" name="city" value={i} />
                {city}
              </label>
            );
          })}
        </form>
        <svg width={width} height={height}>
          <Group top={margin.top} left={margin.left}>
            <Axis.AxisLeft
              scale={yScale}
              label="Temperature (ºF)"
            />
            {!!city &&
              <g>
                <Shape.LinePath
                  data={city.values}
                  xScale={xScale}
                  yScale={yScale}
                  x={x}
                  y={y}
                  curve={Curve.basis}
                  stroke={color(city.id)}
                  strokeWidth={1}
                />
                <text
                  fontSize={9}
                  dy={"0.35em"}
                  dx={2}
                  x={xScale(x(city.values[city.values.length - 1]))}
                  y={yScale(y(city.values[city.values.length - 1]))}
                >
                  {city.id}
                </text>
              </g>
            }
            {!city && data.map((city) => {
              const lastDatum = city.values[city.values.length - 1];
              return (
                <g key={'{city.id}'}>
                  <Shape.LinePath
                    data={city.values}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y}
                    curve={Curve.basis}
                    stroke={color(city.id)}
                    strokeWidth={1}
                  />
                  <text
                    fontSize={9}
                    dy={"0.35em"}
                    dx={2}
                    x={xScale(x(lastDatum))}
                    y={yScale(y(lastDatum))}
                  >
                    {city.id}
                  </text>
                </g>
              );
            })}
            <Axis.AxisBottom
              scale={xScale}
              top={yMax}
              label=''
              hideAxisLine
            />
          </Group>
        </svg>
      </div>
    );
  }
}`}
    </Codeblock>
  );
}
