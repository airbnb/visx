import React from 'react';
import { mount } from 'enzyme';
import { TooltipWithBounds, defaultStyles, Tooltip } from '../src';

type CSSPropertiesKey = keyof React.CSSProperties;
type CSSPropertiesValue = React.CSSProperties[CSSPropertiesKey];

describe('<TooltipWithBounds />', () => {
  test('it should be defined', () => {
    expect(TooltipWithBounds).toBeDefined();
  });

  it('should render the Tooltip with default styles by default', () => {
    const wrapper = mount(<TooltipWithBounds>Hello</TooltipWithBounds>);
    const styles = wrapper.find(Tooltip).props().style!;
    Object.entries(defaultStyles).forEach(
      ([key, value]: [CSSPropertiesKey, CSSPropertiesValue]) => {
        expect(styles[key]).toBe(value);
      },
    );
  });

  it('should render the tooltip without default styles if unstyled is set to true', () => {
    const wrapper = mount(<TooltipWithBounds unstyled>Hello</TooltipWithBounds>);
    const styles = wrapper.find(Tooltip).props().style!;
    Object.keys(defaultStyles).forEach((key: CSSPropertiesKey) => {
      expect(styles[key]).toBeUndefined();
    });
  });
});
