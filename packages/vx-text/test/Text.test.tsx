import React from 'react';
import { shallow } from 'enzyme';
import { Text, getStringWidth } from '../src';

describe('getStringWidth()', () => {
  it('should be defined', () => {
    expect(getStringWidth).toBeDefined();
  });
});

// TODO: Fix tests (jsdom does not support getComputedTextLength() or getBoundingClientRect()).  Maybe use puppeteer

describe('<Text />', () => {
  it('should be defined', () => {
    expect(Text).toBeDefined();
  });

  it('should not throw', () => {
    expect(() => shallow(<Text />)).not.toThrow();
    expect(() => shallow(<Text>Hi</Text>)).not.toThrow();
  });

  // it('Does not wrap long text if enough width', () => {
  //   const wrapper = shallow(
  //     <Text width={300} style={{ fontFamily: 'Courier' }}>This is really long text</Text>
  //   );

  //   expect(wrapper.instance().state.wordsByLines.length).toEqual(1);
  // });

  // it('Wraps long text if not enough width', () => {
  //   const wrapper = shallow(
  //     <Text width={200} style={{ fontFamily: 'Courier' }}>This is really long text</Text>
  //   );

  //   expect(wrapper.instance().state.wordsByLines.length).toEqual(2);
  // });

  // it('Wraps long text if styled but would have had enough room', () => {
  //   const wrapper = shallow(
  //     <Text width={300} style={{ fontSize: '2em', fontFamily: 'Courier' }}>This is really long text</Text>
  //   );

  //   expect(wrapper.instance().state.wordsByLines.length).toEqual(2);
  // });

  // it('Does not perform word length calculation if width or scaleToFit props not set', () => {
  //   const wrapper = shallow(
  //     <Text>This is really long text</Text>
  //   );

  //   expect(wrapper.instance().state.wordsByLines.length).toEqual(1);
  //   expect(wrapper.instance().state.wordsByLines[0].width).toEqual(undefined);
  // });

  // it('Render 0 success when specify the width', () => {
  //   const wrapper = render(
  //     <Text x={0} y={0} width={30}>{0}</Text>
  //   );

  //   expect(wrapper.text()).toContain('0');
  // });

  // it('Render 0 success when not specify the width', () => {
  //   const wrapper = render(
  //     <Text x={0} y={0}>{0}</Text>
  //   );

  //   expect(wrapper.text()).toContain('0');
  // });

  // it('Render text when x or y is a percentage', () => {
  //   const wrapper = render(
  //     <Text x="50%" y="50%">anything</Text>
  //   );

  //   expect(wrapper.text()).toContain('anything');
  // });

  // it("Don't Render text when x or y is NaN ", () => {
  //   const wrapperNan = render(
  //     <Text x={NaN} y={10}>anything</Text>
  //   );

  //   expect(wrapperNan.text()).not.toContain('anything');
  // });
});
