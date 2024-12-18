import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Circle } from '../src';

describe('<Circle />', () => {
  test('it should be defined', () => {
    expect(Circle).toBeDefined();
  });

  test('it should have the .visx-circle class', () => {
    const { container } = render(
      <svg>
        <Circle className="test" />
      </svg>,
    );
    const circle = container.querySelector('circle');
    expect(circle).toHaveClass('visx-circle', 'test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGCircleElement>();
    const { container } = render(
      <svg>
        <Circle innerRef={fakeRef} />
      </svg>,
    );
    const circle = container.querySelector('circle');
    expect(fakeRef.current).toBe(circle);
  });
});
