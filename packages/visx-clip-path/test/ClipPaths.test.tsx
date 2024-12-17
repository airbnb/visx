/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ClipPath, CircleClipPath, RectClipPath } from '../src';

// Suppress console warnings about SVG casing since this is expected
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<ClipPath />', () => {
  test('it should be defined', () => {
    expect(ClipPath).toBeDefined();
  });

  test('it should render defs and clipPath elements', () => {
    const { container } = render(<ClipPath id="test" />);
    const defs = container.querySelector('defs');
    const clipPath = container.querySelector('clippath');
    
    expect(defs).toBeInTheDocument();
    expect(clipPath).toBeInTheDocument();
  });

  test('it should assign the passed id to the clipPath', () => {
    const { container } = render(<ClipPath id="best_clip" />);
    const clipPath = container.querySelector('clippath');
    expect(clipPath).toBeInTheDocument();
    expect(clipPath).toHaveAttribute('id', 'best_clip');
  });

  test('it should render children', () => {
    const { container } = render(
      <ClipPath id="test">
        <circle r={5} />
      </ClipPath>
    );
    const circle = container.querySelector('clippath > circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('r', '5');
  });
});

describe('<RectClipPath />', () => {
  test('it should be defined', () => {
    expect(RectClipPath).toBeDefined();
  });

  test('it should render a rect', () => {
    const { container } = render(<RectClipPath id="test" />);
    const rect = container.querySelector('clippath > rect');
    expect(rect).toBeInTheDocument();
  });

  test('it should pass props to the rect', () => {
    const { container } = render(
      <RectClipPath id="test" width={100} height={200} x={10} y={20} />
    );
    const rect = container.querySelector('clippath > rect');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('width', '100');
    expect(rect).toHaveAttribute('height', '200');
    expect(rect).toHaveAttribute('x', '10');
    expect(rect).toHaveAttribute('y', '20');
  });
});

describe('<CircleClipPath />', () => {
  test('it should be defined', () => {
    expect(CircleClipPath).toBeDefined();
  });

  test('it should render a circle', () => {
    const { container } = render(<CircleClipPath id="test" />);
    const circle = container.querySelector('clippath > circle');
    expect(circle).toBeInTheDocument();
  });

  test('it should pass props to the circle', () => {
    const { container } = render(
      <CircleClipPath id="test" r={50} cx={100} cy={200} />
    );
    const circle = container.querySelector('clippath > circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('r', '50');
    expect(circle).toHaveAttribute('cx', '100');
    expect(circle).toHaveAttribute('cy', '200');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":10,"failed":0,"total":10,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
