import React from 'react';
import { render } from '@testing-library/react';

import { RadialGradient } from '../src';

describe('<RadialGradient />', () => {
  test('it should be defined', () => {
    expect(RadialGradient).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <RadialGradient id="radial" />
        </svg>,
      ),
    ).not.toThrow();
  });
});
