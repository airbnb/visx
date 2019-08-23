import React from 'react';
import { mount } from 'enzyme';

import { PatternWaves } from '../src';

describe('<PatternWaves />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(PatternWaves).toBeDefined();
  });

  test('it should require an id prop', () => {
    mount(<PatternWaves width={4} height={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `id` is marked as required in `PatternWaves`, but its value is `undefined`.\n    in PatternWaves',
    );
  });

  test('it should require a width prop', () => {
    mount(<PatternWaves id="test" height={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `width` is marked as required in `PatternWaves`, but its value is `undefined`.\n    in PatternWaves',
    );
  });

  test('it should require a height prop', () => {
    mount(<PatternWaves id="test" width={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `height` is marked as required in `PatternWaves`, but its value is `undefined`.\n    in PatternWaves',
    );
  });
});
