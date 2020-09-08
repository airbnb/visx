import React from 'react';
import { mount } from 'enzyme';

import { LinearGradient } from '../src';

describe('<LinearGradient />', () => {
  test('it should be defined', () => {
    expect(LinearGradient).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      mount(
        <svg>
          <LinearGradient id="linear" />
        </svg>,
      ),
    ).not.toThrow();
  });
});
