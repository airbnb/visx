import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Added this import
import { Polygon } from '../src';

describe('<Polygon />', () => {
  const polygon: [number, number][] = new Array(3).fill(null).map((_, i) => [i, i]);

  const props = { polygon };

  test('it should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  test('it should not render without a polygon', () => {
    const { container } = render(<Polygon />);
    expect(container.firstChild).toBeNull();
  });

  test('it should render a path', () => {
    const { container } = render(
      <svg>
        <Polygon {...props} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  test('it should set a d attribute based on the polygon prop', () => {
    const { container } = render(
      <svg>
        <Polygon {...props} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M0,0L1,1L2,2Z');
  });

  test('it should add extra (non-func) props to the path element', () => {
    const { container } = render(
      <svg>
        <Polygon {...props} fill="orange" />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('orange');
  });
});
