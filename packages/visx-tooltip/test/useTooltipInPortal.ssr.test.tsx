// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { useTooltipInPortal } from '../src';

test('renders a visible portal tooltip on the server without browser globals', () => {
  function Chart() {
    const { TooltipInPortal } = useTooltipInPortal();
    return (
      <div>
        <TooltipInPortal left={10} top={20}>
          Tooltip
        </TooltipInPortal>
      </div>
    );
  }

  expect(renderToString(<Chart />)).toBe('<div></div>');
});
