import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ResizeObserver } from '@juggle/resize-observer';
import { Label } from '../src';

describe('<Label />', () => {
  const renderLabel = (props: React.ComponentProps<typeof Label>) =>
    render(
      <svg>
        <Label {...props} />
      </svg>,
    );

  it('should be defined', () => {
    expect(Label).toBeDefined();
  });

  it('should render title text', () => {
    const { getByText } = renderLabel({
      title: 'title',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(getByText('title')).toBeInTheDocument();
  });

  it('should render subtitle text', () => {
    const { getByText } = renderLabel({
      title: 'title',
      subtitle: 'subtitle',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(getByText('subtitle')).toBeInTheDocument();
  });

  it('should render background', () => {
    const { container } = renderLabel({
      title: 'title',
      showBackground: true,
      resizeObserverPolyfill: ResizeObserver,
    });
    const rect = container.querySelector('rect');
    expect(rect).toBeInTheDocument();
  });

  it('should render anchor line', () => {
    const { container } = renderLabel({
      title: 'title',
      showAnchorLine: true,
      resizeObserverPolyfill: ResizeObserver,
    });
    const line = container.querySelector('line');
    expect(line).toBeInTheDocument();
  });
});
