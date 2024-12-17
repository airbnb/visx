import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { VoronoiPolygon } from '../src';

describe('<VoronoiPolygon />', () => {
  const polygon: [number, number][] = new Array(3).fill(null).map((_, i) => [i, i]);

  const props = { polygon };

  test('it should be defined', () => {
    expect(VoronoiPolygon).toBeDefined();
  });

  test('it should not render without a polygon', () => {
    const { container } = render(
      <svg>
        <VoronoiPolygon />
      </svg>,
    );
    expect(container.querySelector('path')).not.toBeInTheDocument();
  });

  test('it should render a path', () => {
    const { container } = render(
      <svg>
        <VoronoiPolygon {...props} />
      </svg>,
    );
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  test('it should set a d attribute based on the polygon prop', () => {
    const { container } = render(
      <svg>
        <VoronoiPolygon {...props} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M0,0L1,1L2,2Z');
  });

  test('it should add extra (non-func) props to the path element', () => {
    const { container } = render(
      <svg>
        <VoronoiPolygon {...props} fill="orange" />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('orange');
  });
});
