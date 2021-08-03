import React from 'react';
import { render } from 'enzyme';
import { Threshold } from '../src';

const data = [
  { x: 1, y0: 6, y1: 10 },
  { x: 2, y0: 7, y1: 11 },
];

describe('<Threshold />', () => {
  it('should be defined', () => {
    expect(Threshold).toBeDefined();
  });

  it('should render the path', () => {
    const wrapper = render(
      <svg>
        <Threshold
          id={`${Math.random()}`}
          data={data}
          x={(d) => d.x}
          y0={(d) => d.y0}
          y1={(d) => d.y1}
          clipAboveTo={0}
          clipBelowTo={100}
          belowAreaProps={{
            fill: 'violet',
            fillOpacity: 0.4,
          }}
          aboveAreaProps={{
            fill: 'green',
            fillOpacity: 0.4,
          }}
        />
      </svg>,
    );
    expect(wrapper.find('g.visx-threshold')).toHaveLength(1);
    expect(wrapper.find('path')).toHaveLength(4);
  });

  it('supports accessors for clipping', () => {
    const wrapper = render(
      <svg>
        <Threshold
          id={`${Math.random()}`}
          data={data}
          x={(d) => d.x}
          y0={(d) => d.y0}
          y1={(d) => d.y1}
          clipAboveTo={() => 0}
          clipBelowTo={() => 100}
          belowAreaProps={{
            fill: 'violet',
            fillOpacity: 0.4,
          }}
          aboveAreaProps={{
            fill: 'green',
            fillOpacity: 0.4,
          }}
        />
      </svg>,
    );
    expect(wrapper.find('g.visx-threshold')).toHaveLength(1);
    expect(wrapper.find('path')).toHaveLength(4);
  });
});
