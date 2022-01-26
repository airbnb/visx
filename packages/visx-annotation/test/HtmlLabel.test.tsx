import React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { render } from '@testing-library/react';

import { HtmlLabel } from '../src';

describe('<HtmlLabel />', () => {
  it('should render HTML content', () => {
    const { container } = render(
      <svg>
        <HtmlLabel resizeObserverPolyfill={ResizeObserver}>
          <h1>Hello, HTML</h1>
        </HtmlLabel>
      </svg>,
    );
    const h1Element = container.querySelector('h1');
    expect(h1Element).not.toBeNull();
  });
});
