import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CircleSubject } from '../src';

describe('<CircleSubject />', () => {
  it('should be defined', () => {
    expect(CircleSubject).toBeDefined();
  });

  it('should render a circle', () => {
    const { container } = render(
      <svg>
        <CircleSubject x={10} y={10} />
      </svg>,
    );

    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '10');
    expect(circle).toHaveAttribute('cy', '10');
  });
});
