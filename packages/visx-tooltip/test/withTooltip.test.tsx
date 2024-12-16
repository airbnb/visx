/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { shallow } from 'enzyme';

import { withTooltip } from '../src';

const DummyComponent = () => null;

const DummyComponentWithDefaultTooltip = withTooltip(DummyComponent);
const DummyComponentWithCustomContainerPropsTooltip = withTooltip(DummyComponent, {
  style: { position: 'static' },
});
const DummyComponentWithNoContainerTooltip = withTooltip(
  DummyComponent,
  undefined,
  (children) => children,
);

describe('withTooltip()', () => {
  test('it should be defined', () => {
    expect(withTooltip).toBeDefined();
  });

  test('it should render a default container', () => {
    const wrapper = shallow(<DummyComponentWithDefaultTooltip />);

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').first().prop('style')).toEqual({
      position: 'relative',
      width: 'inherit',
      height: 'inherit',
    });
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  test('it should pass custom props to the container', () => {
    const wrapper = shallow(<DummyComponentWithCustomContainerPropsTooltip />);

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').first().prop('style')).toEqual({
      position: 'static',
    });
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  test('it should render with a custom container', () => {
    const wrapper = shallow(<DummyComponentWithNoContainerTooltip />);

    expect(wrapper.find('div')).toHaveLength(0);
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
