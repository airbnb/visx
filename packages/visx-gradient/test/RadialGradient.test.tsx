import React from 'react';
import { mount } from 'enzyme';

import { RadialGradient } from '../src';

describe('<RadialGradient />', () => {
  test('it should be defined', () => {
    expect(RadialGradient).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      mount(
        <svg>
          <RadialGradient id="radial" />
        </svg>,
      ),
    ).not.toThrow();
  });
});
