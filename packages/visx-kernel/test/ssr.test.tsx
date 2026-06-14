// @vitest-environment node

import React from 'react';
import { renderToString } from 'react-dom/server';
import { setWarnHandler } from '../src';

describe('@visx/kernel SSR import', () => {
  it('imports during server rendering without touching browser globals', () => {
    const html = renderToString(<div data-kernel={typeof setWarnHandler}>kernel</div>);

    expect(html).toContain('kernel');
  });
});
