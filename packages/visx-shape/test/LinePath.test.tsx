import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LinePath } from '../src';

interface Datum {
  x: number;
  y: number;
}

const linePathProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  x: (d: Datum) => d.x,
  y: (d: Datum) => d.y,
};

describe('<LinePath />', () => {
  it('should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  it('should have the .visx-linepath class', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-linepath');
  });

  it('should default to strokeLinecap="round" for superior missing data rendering', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should render path element', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should take a children as function prop', () => {
    const fn = vi.fn(() => null);
    render(
      <svg>
        <LinePath>{fn}</LinePath>
      </svg>,
    );
    expect(fn).toHaveBeenCalled();
  });

  it('should call children function with { path }', () => {
    const fn = vi.fn((_) => null);
    render(
      <svg>
        <LinePath>{fn}</LinePath>
      </svg>,
    );
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <LinePath data={linePathProps.data} innerRef={fakeRef} />
      </svg>,
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });
});
