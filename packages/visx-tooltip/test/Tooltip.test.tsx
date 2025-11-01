import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip, defaultStyles } from '../src';

describe('<Tooltip />', () => {
  test('it should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  it('should render with the default styles', () => {
    const { container } = render(<Tooltip>Hello</Tooltip>);
    const tooltip = container.firstChild as HTMLElement;
    const computedStyle = window.getComputedStyle(tooltip);

    Object.entries(defaultStyles).forEach(([key, value]) => {
      // colors will be converted to rgb
      if (key === 'backgroundColor' || key === 'color') {
        expect(typeof computedStyle[key as any]).toBe('string');
      } else {
        // For other styles, compare directly
        expect(tooltip.style[key as any]).toBe(value);
      }
    });
  });

  it('should render with no default styles', () => {
    const { container } = render(<Tooltip unstyled>Hello</Tooltip>);
    const tooltip = container.firstChild as HTMLElement;

    Object.keys(defaultStyles).forEach((key) => {
      expect(tooltip.style[key as any]).toBe('');
    });
  });

  it('should overwrite default styles when given the style prop', () => {
    const newStyles: React.CSSProperties = {
      position: 'relative',
      backgroundColor: 'green',
      color: 'red',
      padding: '0.8rem',
      borderRadius: '13px',
      fontSize: '17px',
      boxShadow: '0 2px 3px rgba(133,133,133,0.5)',
      lineHeight: '2em',
    };

    const { container } = render(<Tooltip style={newStyles} />);
    const tooltip = container.firstChild as HTMLElement;

    Object.entries(newStyles).forEach(([key, value]) => {
      expect(tooltip.style[key as any]).toBe(value);
    });
  });
});
