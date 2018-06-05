import { mount } from 'enzyme';
import React from 'react';
import { Pattern } from '../';

describe('<Pattern />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    const wrapper = mount(
      <Pattern width={4} height={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `id` is marked as required in `W`, but its value is `undefined`.\n    in W'
    );
  });

  test('it should require a width prop', () => {
    const wrapper = mount(
      <Pattern id="test" height={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `width` is marked as required in `W`, but its value is `undefined`.\n    in W'
    );
  });

  test('it should require a height prop', () => {
    const wrapper = mount(
      <Pattern id="test" width={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `height` is marked as required in `W`, but its value is `undefined`.\n    in W'
    );
  });

  test('it should require children', () => {
    const wrapper = mount(<Pattern id="test" width={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `children` is marked as required in `W`, but its value is `undefined`.\n    in W'
    );
  });
});
