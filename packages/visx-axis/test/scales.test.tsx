import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePower,
  scaleQuantile,
  scaleQuantize,
  scaleSymlog,
  scaleThreshold,
  scaleTime,
  scaleUtc,
} from '@visx/scale';
import { Axis } from '../src';
import { addMock, removeMock } from './svgMock';

const axisProps = {
  orientation: 'left' as const,
  label: 'test axis',
};

describe('Axis scales', () => {
  beforeEach(addMock);
  afterEach(removeMock);

  it('should render with scaleBand', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleBand({
            range: [10, 0],
            round: true,
            domain: ['a', 'b', 'c'],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleLinear', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleLinear({
            range: [10, 0],
            round: true,
            domain: [0, 10],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleLog', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleLog({
            range: [10, 0],
            round: true,
            domain: [1, 10, 100, 1000],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleOrdinal', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleOrdinal({
            range: [0, 10],
            domain: ['a', 'b', 'c'],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scalePoint', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scalePoint({
            range: [0, 10],
            round: true,
            domain: ['a', 'b', 'c'],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scalePower', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scalePower({
            range: [1, 2, 3, 4, 5],
            domain: [1, 10, 100, 1000, 10000],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleQuantile', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleQuantile({
            range: [0, 2, 4, 6, 8, 10],
            domain: [1, 10, 100, 1000, 10000],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleQuantize', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleQuantize({
            range: [1, 10],
            domain: [1, 10],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleSymlog', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleSymlog({
            range: [1, 10],
            domain: [1, 10],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleThreshold', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleThreshold({
            range: [1, 10],
            domain: [1, 10],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleTime', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleTime({
            range: [1, 10],
            domain: [new Date('2020-01-01'), new Date('2020-01-05')],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });

  it('should render with scaleUtc', () => {
    const { getByText } = render(
      <svg>
        <Axis
          {...axisProps}
          scale={scaleUtc({
            range: [1, 10],
            domain: [new Date('2020-01-01'), new Date('2020-01-05')],
          })}
        />
      </svg>,
    );
    expect(getByText('test axis')).toBeInTheDocument();
  });
});
