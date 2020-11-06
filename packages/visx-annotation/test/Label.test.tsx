import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Text from '@visx/text/lib/Text';
import { shallow } from 'enzyme';
import { Label } from '../src';

describe('<Label />', () => {
  it('should be defined', () => {
    expect(Label).toBeDefined();
  });
  it('should render title Text', () => {
    expect(
      shallow(<Label title="title test" resizeObserverPolyfill={ResizeObserver} />)
        .find(Text)
        .dive()
        .text(),
    ).toBe('title test');
  });
  it('should render subtitle Text', () => {
    expect(
      shallow(
        <Label
          title="title test"
          subtitle="subtitle test"
          resizeObserverPolyfill={ResizeObserver}
        />,
      )
        .find(Text)
        .at(1)
        .dive()
        .text(),
    ).toBe('subtitle test');
  });
  it('should render a background', () => {
    expect(
      shallow(
        <Label title="title test" showBackground resizeObserverPolyfill={ResizeObserver} />,
      ).find('rect'),
    ).toHaveLength(1);
  });
  it('should render an anchor line', () => {
    expect(
      shallow(
        <Label title="title test" showAnchorLine resizeObserverPolyfill={ResizeObserver} />,
      ).find('line'),
    ).toHaveLength(1);
  });
});
