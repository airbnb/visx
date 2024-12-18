import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TooltipWithBounds } from '../src';

describe('<TooltipWithBounds />', () => {
  test('it should be defined', () => {
    expect(TooltipWithBounds).toBeDefined();
  });

  it('should render with default styles by default', () => {
    const { getByText } = render(<TooltipWithBounds>Hello</TooltipWithBounds>);
    const tooltip = getByText('Hello');

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('visx-tooltip');

    // Check that default styles are applied
    expect(tooltip).toHaveStyle({
      position: 'absolute',
      backgroundColor: 'white',
      color: '#666666',
      padding: '.3rem .5rem',
      borderRadius: '3px',
      fontSize: '14px',
      boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
      pointerEvents: 'none',
    });
  });

  it('should render without default styles if unstyled is set to true', () => {
    const { getByText } = render(<TooltipWithBounds unstyled>Hello</TooltipWithBounds>);
    const tooltip = getByText('Hello');

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('visx-tooltip');

    // Verify only positioning styles are applied
    expect(tooltip).toHaveStyle({
      top: '0px',
      left: '0px',
      transform: 'translate(10px, 10px)',
    });

    // Verify default styles are not applied
    expect(tooltip).not.toHaveStyle({
      backgroundColor: 'white',
      color: '#666666',
      padding: '.3rem .5rem',
      borderRadius: '3px',
      fontSize: '14px',
      boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
      pointerEvents: 'none',
    });
  });
});
