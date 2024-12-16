/** @jest-environment jsdom */
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
import { PatternLines } from '../src';
import { PatternOrientationType } from '../src/constants';
import { pathForOrientation } from '../src/patterns/Lines';
import Pattern from '../src/patterns/Pattern';

jest.mock('../src/patterns/Pattern', () => {
  const MockPattern = jest.fn(({ children }) => (
    <svg>
      <defs>
        <pattern>{children}</pattern>
      </defs>
    </svg>
  ));
  return { __esModule: true, default: MockPattern };
});

describe('<PatternLines />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(PatternLines).toBeDefined();
  });

  test('should throw error without required props', () => {
    // @ts-expect-error allow invalid props
    expect(() => render(<PatternLines />)).toThrow();
    // @ts-expect-error allow invalid props
    expect(() => render(<PatternLines id="test" />)).toThrow();
    // @ts-expect-error allow invalid props
    expect(() => render(<PatternLines width={4} />)).toThrow();
  });

  test('should render background when background prop is provided', () => {
    const { container } = render(
      <PatternLines id="test" height={4} width={4} background="blue" />
    );

    const MockPattern = Pattern as jest.Mock;
    const patternProps = MockPattern.mock.calls[0][0];
    const [backgroundRect] = React.Children.toArray(patternProps.children);

    expect(backgroundRect).toBeDefined();
    expect(React.isValidElement(backgroundRect) && backgroundRect.type).toBe('rect');
    expect(React.isValidElement(backgroundRect) && backgroundRect.props).toEqual({
      className: 'visx-pattern-line-background',
      width: 4,
      height: 4,
      fill: 'blue'
    });
  });

  test('should render correct pattern lines based on orientation', () => {
    const size = 4;
    const orientation: PatternOrientationType[] = ['diagonal', 'diagonalRightToLeft'];
    const expectedPaths = orientation.map(o => 
      pathForOrientation({ orientation: o, height: size })
    );

    render(
      <PatternLines 
        id="test" 
        height={size} 
        width={size} 
        orientation={orientation} 
      />
    );

    const MockPattern = Pattern as jest.Mock;
    const patternProps = MockPattern.mock.calls[0][0];
    const paths = React.Children.toArray(patternProps.children).filter(
      child => React.isValidElement(child) && child.type === 'path'
    );

    expect(paths).toHaveLength(2);
    paths.forEach((path, index) => {
      expect(React.isValidElement(path) && path.type).toBe('path');
      expect(React.isValidElement(path) && path.props.d).toBe(expectedPaths[index]);
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
