// @vitest-environment node

import React from 'react';
import { renderToString } from 'react-dom/server';
import { scaleLinear } from '@visx/scale';
import { AxisBottom } from '../src';

describe('<AxisBottom /> SSR', () => {
  it('renders without warning when SVG text measurement is unavailable', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const html = renderToString(
        <svg>
          <AxisBottom
            scale={scaleLinear({
              domain: [0, 10],
              range: [0, 100],
            })}
          />
        </svg>,
      );

      expect(html).toContain('visx-axis');
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      warnSpy.mockRestore();
    }
  });
});
