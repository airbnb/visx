import React from 'react';
import { shallow } from 'enzyme';
import { Group } from '@vx/group';

import { AxisRadial } from '../src';
import { scaleLinear } from '../../vx-scale';

const axisProps = {
  scale: scaleLinear({
    rangeRound: [10, 0],
    domain: [0, 10]
  })
};

describe('<AxisRadial />', () => {
  test('it should be defined', () => {
    expect(AxisRadial).toBeDefined();
  });

  test('it should render with class .vx-axis-radial', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} />);
    expect(wrapper.find(Group).prop('className')).toEqual('vx-axis-radial');
  });

  test('it should set user-specified axisClassName, axisLineClassName, labelClassName, and tickClassName', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const wrapper = shallow(
      <AxisRadial
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
      />
    );

    expect(wrapper.find(`.${axisClassName}`).length).toBe(1);
    expect(wrapper.find(`.${axisLineClassName}`).length).toBe(1);
    expect(wrapper.find(`.${labelClassName}`).length).toBe(1);
    expect(wrapper.find(`.${tickClassName}`).length).toBeGreaterThan(0);
  });

  test('it should pass the output of tickLabelProps to tick labels', () => {
    const tickProps = { fontSize: 50, fill: 'magenta' };
    const wrapper = shallow(<AxisRadial {...axisProps} tickLabelProps={() => tickProps} />);

    const ticks = wrapper.find('.vx-axis-tick');
    ticks.forEach(tick => {
      expect(tick.find(Text).props()).toEqual(expect.objectContaining(tickProps));
    });

    expect.hasAssertions();
  });

  test('it should call children function with required args', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<AxisRadial {...axisProps}>{mockFn}</AxisRadial>);
    const args = mockFn.mock.calls[0][0];
    expect(args.angle).toEqual(expect.any(Function));
    expect(args.axisLineData).toEqual(expect.any(Array));
    expect(args.numTicks).toEqual(expect.any(Number));
    expect(args.label).toBeDefined();
    expect(args.radius).toEqual(expect.any(Number));
    expect(args.tickLength).toEqual(expect.any(Number));
    expect(args.tickFormat).toEqual(expect.any(Function));
    expect(args.ticks).toEqual(expect.any(Array));
    expect(Object.keys(args.ticks[0])).toEqual(['x', 'y', 'textAnchor', 'verticalAnchor']);
  });

  test('it should call the tickLabelProps func with the signature (tickValue, index)', () => {
    const wrapper = shallow(
      <AxisRadial
        {...axisProps}
        tickLabelProps={(value, index) => {
          expect(value).toEqual(expect.any(Number));
          expect(index).toBeGreaterThan(-1);
          return {};
        }}
      />
    );

    expect.hasAssertions();
  });

  test('it should pass labelProps to the axis label', () => {
    const labelProps = { fontSize: 50, fill: 'magenta' };
    const wrapper = shallow(<AxisRadial {...axisProps} labelProps={labelProps} />);

    const label = wrapper.find('.vx-axis-label');
    expect(label.find(Text).props()).toEqual(expect.objectContaining(labelProps));
  });

  test('it should render the 0th tick if hideZero is false', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideZero={false} />);
    expect(
      wrapper
        .find('.vx-axis-tick')
        .at(0)
        .key()
    ).toBe('vx-tick-0-0');
  });

  test('it should not show 0th tick if hideZero is true', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideZero />);
    expect(
      wrapper
        .find('.vx-axis-tick')
        .at(0)
        .key()
    ).toBe('vx-tick-1-1');
  });

  test('it should SHOW an axis line if hideAxisLine is false', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideAxisLine={false} />);
    expect(
      wrapper
        .children()
        .not('.vx-axis-tick')
        .find('.vx-axis-line').length
    ).toBe(1);
  });

  test('it should HIDE an axis line if hideAxisLine is true', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideAxisLine />);
    expect(
      wrapper
        .children()
        .not('.vx-axis-tick')
        .find('Line').length
    ).toBe(0);
  });

  test('it should SHOW ticks if hideTicks is false', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideTicks={false} />);
    expect(wrapper.children().find('.vx-axis-tick').length).toBeGreaterThan(0);
  });

  test('it should HIDE ticks if hideTicks is true', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} hideTicks />);
    expect(
      wrapper
        .children()
        .find('.vx-axis-tick')
        .find('Line').length
    ).toBe(0);
  });

  test('it should render one tick for each value specified in tickValues', () => {
    let wrapper = shallow(<AxisRadial {...axisProps} tickValues={[]} />);
    expect(
      wrapper
        .children()
        .find('.vx-axis-tick')
        .not('.vx-axis-line')
        .find('Line').length
    ).toBe(0);

    wrapper = shallow(<AxisRadial {...axisProps} tickValues={[2]} />);
    expect(wrapper.children().find('.vx-axis-tick').length).toBe(1);

    wrapper = shallow(<AxisRadial {...axisProps} tickValues={[0, 1, 2, 3, 4, 5, 6]} />);
    expect(wrapper.children().find('.vx-axis-tick').length).toBe(7);
  });

  test('it should use tickFormat to format ticks if passed', () => {
    const wrapper = shallow(
      <AxisRadial {...axisProps} tickValues={[0]} tickFormat={(val, i) => 'test!!!'} />
    );
    expect(
      wrapper
        .children()
        .find('.vx-axis-tick')
        .find(Text)
        .prop('children')
    ).toBe('test!!!');
  });

  test('tickFormat should have access to tick index', () => {
    const wrapper = shallow(<AxisRadial {...axisProps} tickValues={[9]} tickFormat={(val, i) => i} />);
    expect(
      wrapper
        .children()
        .find('.vx-axis-tick')
        .find(Text)
        .prop('children')
    ).toBe(0);
  });
});
