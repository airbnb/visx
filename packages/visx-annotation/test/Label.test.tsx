import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ResizeObserver } from '@juggle/resize-observer';
import { Label } from '../src';
import { addMock, removeMock } from './svgMock';

describe('<Label />', () => {
  const renderLabel = (props: React.ComponentProps<typeof Label>) =>
    render(
      <svg>
        <Label {...props} />
      </svg>,
    );

  beforeEach(addMock);
  afterEach(removeMock);

  it('should be defined', () => {
    expect(Label).toBeDefined();
  });

  it('should render title text', async () => {
    const { findByText } = renderLabel({
      title: 'title',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(await findByText('title')).toBeInTheDocument();
  });

  it('should render subtitle text', async () => {
    const { findByText } = renderLabel({
      title: 'title',
      subtitle: 'subtitle',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(await findByText('subtitle')).toBeInTheDocument();
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
