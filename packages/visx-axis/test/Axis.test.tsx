import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Line } from '@visx/shape';
import { Text } from '@visx/text';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Axis } from '../src';

const getTickLine = (
  wrapper: ShallowWrapper<unknown, Readonly<{}>, React.Component<{}, {}, unknown>>,
) => wrapper.children().find('.visx-axis-tick').not('.visx-axis-line').find('Line').first();

const axisProps = {
  orientation: 'left' as const,
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
  label: 'test axis',
};

describe('<Axis />', () => {
  it('should be defined', () => {
    expect(Axis).toBeDefined();
  });

  it('should render with class .visx-axis', () => {
    const wrapper = shallow(<Axis {...axisProps} />);
    expect(wrapper.prop('className')).toEqual('visx-axis');
  });

  it('should call children function with required args', () => {
    const mockFn = jest.fn();
    shallow(<Axis {...axisProps}>{mockFn}</Axis>);
    const args = mockFn.mock.calls[0][0];
    expect(args.axisFromPoint).toBeDefined();
    expect(args.axisToPoint).toBeDefined();
    expect(args.horizontal).toBeDefined();
    expect(args.tickSign).toBeDefined();
    expect(args.numTicks).toBeDefined();
    expect(args.label).toBeDefined();
    expect(args.rangePadding).toBeDefined();
    expect(args.tickLength).toBeDefined();
    expect(args.tickFormat).toBeDefined();
    expect(args.tickPosition).toBeDefined();
    expect(args.ticks).toBeDefined();
    expect(Object.keys(args.ticks[0])).toEqual(['value', 'index', 'from', 'to', 'formattedValue']);
  });

  it('should set user-specified axisClassName, axisLineClassName, labelClassName, and tickClassName', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const wrapper = shallow(
      <Axis
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
      />,
    ).dive();

    expect(wrapper.find(`.${axisClassName}`)).toHaveLength(1);
    expect(wrapper.find(`.${axisLineClassName}`)).toHaveLength(1);
    expect(wrapper.find(`.${labelClassName}`)).toHaveLength(1);
    expect(wrapper.find(`.${tickClassName}`).length).toBeGreaterThan(0);
  });

  it('should pass the output of tickLabelProps to tick labels', () => {
    const tickProps = { fontSize: 50, fill: 'magenta' };
    const wrapper = shallow(<Axis {...axisProps} tickLabelProps={() => tickProps} />);

    const ticks = wrapper.find('.visx-axis-tick');
    ticks.forEach((tick) => {
      expect(tick.find(Text).props()).toEqual(expect.objectContaining(tickProps));
    });

    expect.hasAssertions();
  });

  it('should call the tickLabelProps func with the signature (value, index, values)', () => {
    expect.hasAssertions();
    shallow(
      <Axis
        {...axisProps}
        tickLabelProps={(value, index, values) => {
          expect(value).toEqual(expect.any(Number));
          expect(index).toBeGreaterThan(-1);
          expect(values).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                value: expect.any(Number),
                index: expect.any(Number),
              }),
            ]),
          );
          return {};
        }}
      />,
    );

    expect.hasAssertions();
  });

  it('should pass labelProps to the axis label', () => {
    const labelProps = { fontSize: 50, fill: 'magenta' };
    const wrapper = shallow(<Axis {...axisProps} labelProps={labelProps} />);

    const label = wrapper.find('.visx-axis-label');
    expect(label.find(Text).props()).toEqual(expect.objectContaining(labelProps));
  });

  it('should render the 0th tick if hideZero is false', () => {
    const wrapper = shallow(<Axis {...axisProps} hideZero={false} />);
    expect(wrapper.find('.visx-axis-tick').at(0).key()).toBe('visx-tick-0-0');
  });

  it('should not show 0th tick if hideZero is true', () => {
    const wrapper = shallow(<Axis {...axisProps} hideZero />);
    expect(wrapper.find('.visx-axis-tick').at(0).key()).toBe('visx-tick-1-0');
  });

  it('should SHOW an axis line if hideAxisLine is false', () => {
    const wrapper = shallow(<Axis {...axisProps} hideAxisLine={false} />);
    expect(wrapper.children().not('.visx-axis-tick').find('.visx-axis-line')).toHaveLength(1);
  });

  it('should HIDE an axis line if hideAxisLine is true', () => {
    const wrapper = shallow(<Axis {...axisProps} hideAxisLine />);
    expect(wrapper.children().not('.visx-axis-tick').find('Line')).toHaveLength(0);
  });

  it('should SHOW ticks if hideTicks is false', () => {
    const wrapper = shallow(<Axis {...axisProps} hideTicks={false} />);
    expect(wrapper.children().find('.visx-axis-tick').length).toBeGreaterThan(0);
  });

  it('should HIDE ticks if hideTicks is true', () => {
    const wrapper = shallow(<Axis {...axisProps} hideTicks />);
    expect(wrapper.children().find('.visx-axis-tick').find('Line')).toHaveLength(0);
  });

  it('should render one tick for each value specified in tickValues', () => {
    let wrapper = shallow(<Axis {...axisProps} tickValues={[]} />);
    expect(
      wrapper.children().find('.visx-axis-tick').not('.visx-axis-line').find('Line'),
    ).toHaveLength(0);

    wrapper = shallow(<Axis {...axisProps} tickValues={[2]} />);
    expect(wrapper.children().find('.visx-axis-tick')).toHaveLength(1);

    wrapper = shallow(<Axis {...axisProps} tickValues={[0, 1, 2, 3, 4, 5, 6]} />);
    expect(wrapper.children().find('.visx-axis-tick')).toHaveLength(7);
  });

  it('should use tickFormat to format ticks if passed', () => {
    const wrapper = shallow(<Axis {...axisProps} tickValues={[0]} tickFormat={() => 'test!!!'} />);
    expect(wrapper.children().find('.visx-axis-tick').find(Text).prop('children')).toBe('test!!!');
  });

  test('tickFormat should have access to tick index', () => {
    const wrapper = shallow(
      <Axis {...axisProps} tickValues={[9]} tickFormat={(val, i) => `${i}`} />,
    );
    expect(wrapper.children().find('.visx-axis-tick').find(Text).prop('children')).toBe('0');
  });

  test('tick default should follow parent', () => {
    const wrapper = shallow(<Axis {...axisProps} strokeWidth={2} />);
    expect(getTickLine(wrapper).prop('strokeWidth')).toBe(2);
    expect(getTickLine(wrapper).prop('strokeLinecap')).toBe('square');
  });

  test('tick stroke width should be different parent and equal to tickStrokeWidth', () => {
    const wrapper = shallow(
      <Axis
        {...axisProps}
        strokeWidth={2}
        tickLineProps={{ strokeWidth: 3, strokeLinecap: 'round' }}
      />,
    );
    expect(getTickLine(wrapper).prop('strokeWidth')).toBe(3);
    expect(getTickLine(wrapper).prop('strokeLinecap')).toBe('round');
  });

  test('default tick stroke width should be 1', () => {
    const wrapper = shallow(<Axis {...axisProps} />);
    expect(getTickLine(wrapper).prop('strokeWidth')).toBe(1);
  });

  it('should use center if scale is band', () => {
    const wrapper = shallow(
      <Axis
        orientation="bottom"
        scale={scaleBand({
          range: [10, 0],
          round: true,
          domain: ['a', 'b'],
        })}
        tickStroke="blue"
      />,
    );
    const points = wrapper.children().find(Line);
    // First point
    expect(points.at(0).prop('from')).toEqual({ x: 8, y: 0 });
    expect(points.at(0).prop('to')).toEqual({ x: 8, y: 8 });
    // Second point
    expect(points.at(1).prop('from')).toEqual({ x: 3, y: 0 });
    expect(points.at(1).prop('to')).toEqual({ x: 3, y: 8 });
    // Third point
    expect(points.at(2).prop('from')).toEqual({ x: 10.5, y: 0 });
    expect(points.at(2).prop('to')).toEqual({ x: 0.5, y: 0 });
  });
});
