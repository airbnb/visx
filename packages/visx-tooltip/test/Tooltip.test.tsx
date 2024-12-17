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
      // For colors, compare the computed style which will be normalized
      if (key === 'backgroundColor' || key === 'color') {
        expect(computedStyle[key as any]).toBe(
          // Create a temp div to get browser-normalized color value
          (() => {
            const temp = document.createElement('div');
            temp.style.color = value;
            document.body.appendChild(temp);
            const normalized = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);
            return normalized;
          })()
        );
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
      padding: '.8rem .8rem',
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
