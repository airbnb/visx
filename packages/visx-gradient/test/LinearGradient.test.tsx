import React from 'react';
import { render } from '@testing-library/react';

import { LinearGradient } from '../src';

describe('<LinearGradient />', () => {
  test('it should be defined', () => {
    expect(LinearGradient).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <LinearGradient id="linear" />
        </svg>,
      ),
    ).not.toThrow();
  });
});
