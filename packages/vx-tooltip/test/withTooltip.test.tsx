import React from 'react';
import { shallow } from 'enzyme';

import { withTooltip } from '../src';

const DummyComponent = () => null;

const DummyComponentWithDefaultTooltip = withTooltip(DummyComponent);
const DummyComponentWithCustomContainerPropsTooltip = withTooltip(DummyComponent, {
  style: { position: 'static' },
});

describe('withTooltip()', () => {
  test('it should be defined', () => {
    expect(withTooltip).toBeDefined();
  });

  test('it should render a default container', () => {
    const wrapper = shallow(<DummyComponentWithDefaultTooltip />);

    expect(wrapper.find('div')).toHaveLength(1);
    expect(
      wrapper
        .find('div')
        .first()
        .prop('style'),
    ).toEqual({
      position: 'relative',
      width: 'inherit',
      height: 'inherit',
    });
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  test('it should pass custom props to the container', () => {
    const wrapper = shallow(<DummyComponentWithCustomContainerPropsTooltip />);

    expect(wrapper.find('div')).toHaveLength(1);
    expect(
      wrapper
        .find('div')
        .first()
        .prop('style'),
    ).toEqual({
      position: 'static',
    });
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });
});
