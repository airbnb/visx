import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Bar } from '../src';

const BarWrapper = (restProps = {}) => shallow(<Bar {...restProps} />);

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .visx-bar class', () => {
    expect(
      BarWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('visx-bar test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGRectElement>();
    const { container } = render(
      <svg>
        <Bar innerRef={fakeRef} />
      </svg>,
    );
    const RectElement = container.querySelector('rect');
    expect(fakeRef.current).toContainElement(RectElement);
  });
});
