import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Bar } from '../src';

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .visx-bar class', () => {
    const { container } = render(
      <svg>
        <Bar className="test" />
      </svg>,
    );
    const rect = container.querySelector('rect');
    expect(rect).toHaveClass('visx-bar', 'test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGRectElement>();
    const { container } = render(
      <svg>
        <Bar innerRef={fakeRef} />
      </svg>,
    );
    const rectElement = container.querySelector('rect');
    expect(fakeRef.current).toBe(rectElement);
  });
});
