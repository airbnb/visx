import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphDiamond } from '../src';

describe('<GlyphDiamond />', () => {
  test('should be defined', () => {
    expect(GlyphDiamond).toBeDefined();
  });

  test('should render with default className', () => {
    const { container } = render(
      <svg>
        <GlyphDiamond>{() => <path data-testid="diamond-path" />}</GlyphDiamond>
      </svg>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('should render with custom className', () => {
    const { container } = render(
      <svg>
        <GlyphDiamond className="test">{({ path }) => <path className="test" />}</GlyphDiamond>
      </svg>,
    );
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should call children function', () => {
    const childrenFn = jest.fn(() => null);
    render(
      <svg>
        <GlyphDiamond>{childrenFn}</GlyphDiamond>
      </svg>,
    );
    expect(childrenFn).toHaveBeenCalled();
  });

  test('should render children function with path prop', () => {
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(
      <svg>
        <GlyphDiamond>{childrenFn}</GlyphDiamond>
      </svg>,
    );

    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should accept numeric size prop', () => {
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(
      <svg>
        <GlyphDiamond size={42}>{childrenFn}</GlyphDiamond>
      </svg>,
    );

    const args = childrenFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should accept function size prop', () => {
    const sizeFn = () => 42;
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(
      <svg>
        <GlyphDiamond size={sizeFn}>{childrenFn}</GlyphDiamond>
      </svg>,
    );

    const args = childrenFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
