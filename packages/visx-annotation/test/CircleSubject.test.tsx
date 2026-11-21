import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Annotation, CircleSubject } from '../src';

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

  it.each([0, -10, 25, undefined])('uses the explicit coordinates %s before context', (value) => {
    const { container } = render(
      <svg>
        <Annotation x={50} y={60}>
          <CircleSubject x={value} y={value} />
        </Annotation>
      </svg>,
    );
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('cx', String(value ?? 50));
    expect(circle).toHaveAttribute('cy', String(value ?? 60));
  });
});
