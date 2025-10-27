import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineRadial } from '../src';

interface Datum {
  x: number;
  y: number;
}

const mockProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  angle: (d: Datum) => d.x,
  radius: (d: Datum) => d.y,
};

describe('<LineRadial />', () => {
  test('it should be defined', () => {
    expect(LineRadial).toBeDefined();
  });

  test('it should have the .visx-line-radial class', () => {
    const { container } = render(
      <svg>
        <LineRadial {...mockProps} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-line-radial');
  });

  test('it should contain paths', () => {
    const { container } = render(
      <svg>
        <LineRadial {...mockProps} />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = vi.fn(() => <g />);
    render(
      <svg>
        <LineRadial {...mockProps}>{fn}</LineRadial>
      </svg>,
    );
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = vi.fn(() => <g />);
    render(
      <svg>
        <LineRadial {...mockProps}>{fn}</LineRadial>
      </svg>,
    );
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <LineRadial innerRef={fakeRef} {...mockProps} />
      </svg>,
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });
});
