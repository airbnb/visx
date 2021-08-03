import React from 'react';
import { shallow, mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { Text, getStringWidth, useText } from '../src';
import { addMock, removeMock } from './svgMock';

describe('getStringWidth()', () => {
  it('should be defined', () => {
    expect(getStringWidth).toBeDefined();
  });
});

describe('<Text />', () => {
  beforeEach(addMock);
  afterEach(removeMock);

  it('should be defined', () => {
    expect(Text).toBeDefined();
  });

  it('should not throw', () => {
    expect(() => shallow(<Text />)).not.toThrow();
    expect(() => shallow(<Text>Hi</Text>)).not.toThrow();
  });

  it('Does not wrap long text if enough width', () => {
    const {
      result: {
        current: { wordsByLines },
      },
    } = renderHook(() =>
      useText({
        width: 300,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    expect(wordsByLines).toHaveLength(1);
  });

  it('Wraps text if not enough width', () => {
    const {
      result: {
        current: { wordsByLines },
      },
    } = renderHook(() =>
      useText({
        width: 200,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    expect(wordsByLines).toHaveLength(2);
  });

  it('Does not wrap text if there is enough width', () => {
    const {
      result: {
        current: { wordsByLines },
      },
    } = renderHook(() =>
      useText({
        width: 300,
        style: { fontSize: '2em', fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    expect(wordsByLines).toHaveLength(1);
  });

  it('Does not perform word length calculation if width or scaleToFit props not set', () => {
    const {
      result: {
        current: { wordsByLines },
      },
    } = renderHook(() =>
      useText({
        children: 'This is really long text',
      }),
    );

    expect(wordsByLines).toHaveLength(1);
    expect(wordsByLines[0].width).toBeUndefined();
  });

  it('Render 0 success when specify the width', () => {
    const wrapper = mount(
      <Text x={0} y={0} width={30}>
        0
      </Text>,
    );

    console.log('wrapper', wrapper.text());
    expect(wrapper.text()).toContain('0');
  });

  it('Render 0 success when not specify the width', () => {
    const wrapper = mount(
      <Text x={0} y={0}>
        0
      </Text>,
    );

    expect(wrapper.text()).toContain('0');
  });

  it('Render text when x or y is a percentage', () => {
    const wrapper = mount(
      <Text x="50%" y="50%">
        anything
      </Text>,
    );

    expect(wrapper.text()).toContain('anything');
  });

  it("Don't Render text when x or y is NaN", () => {
    const wrapperNan = mount(
      <Text x={NaN} y={10}>
        anything
      </Text>,
    );

    expect(wrapperNan.text()).not.toContain('anything');
  });

  it('Render text when children 0 is a number', () => {
    const wrapper = mount(
      <Text x={0} y={0}>
        {0}
      </Text>,
    );

    expect(wrapper.text()).toContain('0');
  });

  it('Applies transform if scaleToFit is set', () => {
    const {
      result: {
        current: { transform },
      },
    } = renderHook(() =>
      useText({
        width: 300,
        scaleToFit: true,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );
    expect(transform).toBe('matrix(1.25, 0, 0, 1.25, 0, 0)');
  });

  it('Applies transform if angle is given', () => {
    const wrapper = shallow<Text>(
      <Text width={300} angle={45} style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );

    const text = wrapper.find('text').first();
    expect(text.prop('transform')).toBe('rotate(45, 0, 0)');
  });

  it('Offsets vertically if verticalAnchor is given', () => {
    let wrapper = mount<Text>(
      <Text width={200} style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );
    const getVerticalOffset = (w: typeof wrapper) => w.find('tspan').first().prop('dy');

    expect(getVerticalOffset(wrapper)).toBe('-1em');

    wrapper = mount<Text>(
      <Text width={200} verticalAnchor="middle" style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );
    expect(getVerticalOffset(wrapper)).toBe('-0.145em');

    wrapper = mount<Text>(
      <Text width={200} verticalAnchor="start" style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );
    expect(getVerticalOffset(wrapper)).toBe('0.71em');
  });
});
