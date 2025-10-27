import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PatternPath } from '../src';

describe('<PatternPath />', () => {
  test('it should be defined', () => {
    expect(PatternPath).toBeDefined();
  });

  test('it should render a rect background if background prop defined', () => {
    const { container } = render(
      <svg>
        <PatternPath id="test" height={4} width={4} background="blue" />
      </svg>,
    );
    expect(container.querySelector('rect')).toBeInTheDocument();
  });

  test('it should not render a rect background if no background prop', () => {
    const { container } = render(
      <svg>
        <PatternPath id="test" height={4} width={4} />
      </svg>,
    );
    expect(container.querySelector('rect')).not.toBeInTheDocument();
  });
});
