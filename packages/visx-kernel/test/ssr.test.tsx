// @vitest-environment node

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createPath, formatNumber, setWarnHandler, toPath2D } from '../src';

describe('@visx/kernel SSR import', () => {
  it('imports during server rendering without touching browser globals', () => {
    const html = renderToString(<div data-kernel={typeof setWarnHandler}>kernel</div>);

    expect(html).toContain('kernel');
  });

  it('runs pure helpers on the server', () => {
    const d = createPath(1).moveTo(0, 0).lineTo(1.25, 2.75).toString();

    expect(formatNumber(1234.5, { locale: 'en-US' })).toBe('1,234.5');
    expect(d).toBe('M0,0L1.3,2.8');
    expect(toPath2D(d).toString()).toBe(d);
  });
});
