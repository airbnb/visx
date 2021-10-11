import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Line } from '../src';

const LineWrapper = (restProps = {}) => shallow(<Line {...restProps} />);

describe('<Line />', () => {
  test('it should be defined', () => {
    expect(Line).toBeDefined();
  });

  test('it should contain a <line />', () => {
    expect(LineWrapper().find('line')).toHaveLength(1);
  });

  test('it should have the .visx-line class', () => {
    expect(LineWrapper().prop('className')).toBe('visx-line');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGLineElement>();
    const { container } = render(
      <svg>
        <Line innerRef={fakeRef} />
      </svg>,
    );
    const LineElement = container.querySelector('line');
    expect(fakeRef.current).toContainElement(LineElement);
  });

  test('it should set shapeRendering to auto if not rectilinear', () => {
    expect(
      LineWrapper({
        to: {
          x: 50,
          y: 100,
        },
      }).prop('shapeRendering'),
    ).toBe('auto');
  });

  test('it should set shapeRendering to crispEdges if rectilinear', () => {
    expect(
      LineWrapper({
        to: {
          x: 0,
          y: 100,
        },
      }).prop('shapeRendering'),
    ).toBe('crispEdges');

    expect(
      LineWrapper({
        to: {
          x: 100,
          y: 0,
        },
      }).prop('shapeRendering'),
    ).toBe('crispEdges');
  });
});
