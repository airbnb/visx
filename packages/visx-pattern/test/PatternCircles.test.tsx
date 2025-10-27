import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatternCircles } from '../src';

describe('<PatternCircles />', () => {
  test('should be defined', () => {
    expect(PatternCircles).toBeDefined();
  });

  test('should render a rect background if background prop defined', () => {
    const { container } = render(
      <svg>
        <PatternCircles id="test" height={4} width={4} background="blue" />
      </svg>,
    );
    const rect = container.querySelector('pattern rect');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('fill', 'blue');
  });

  test('should not render a rect background if no background prop', () => {
    const { container } = render(
      <svg>
        <PatternCircles id="test" height={4} width={4} />
      </svg>,
    );
    const rect = container.querySelector('pattern rect');
    expect(rect).not.toBeInTheDocument();
  });
});
