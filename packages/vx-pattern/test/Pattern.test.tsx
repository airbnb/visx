import React from 'react';
import { mount } from 'enzyme';

import { Pattern } from '../src';

describe('<Pattern />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    mount(
      <Pattern width={4} height={4}>
        <rect />
      </Pattern>,
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require a width prop', () => {
    mount(
      <Pattern id="test" height={4}>
        <rect />
      </Pattern>,
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require a height prop', () => {
    mount(
      <Pattern id="test" width={4}>
        <rect />
      </Pattern>,
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require children', () => {
    mount(<Pattern id="test" width={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });
});
