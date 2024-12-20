import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PatternLines } from '../src';
import type { PatternOrientationType } from '../src/constants';
import { pathForOrientation } from '../src/patterns/Lines';

const SVGWrapper = ({ children }: { children: React.ReactNode }) => (
  <svg data-testid="svg-wrapper">{children}</svg>
);

describe('<PatternLines />', () => {
  test('should be defined', () => {
    expect(PatternLines).toBeDefined();
  });

  test('should render background when background prop is provided', () => {
    const { container } = render(
      <SVGWrapper>
        <PatternLines id="test" height={4} width={4} background="blue" />
      </SVGWrapper>,
    );

    const pattern = container.querySelector('pattern');
    expect(pattern).toBeInTheDocument();

    const backgroundRect = container.querySelector('rect');
    expect(backgroundRect).toBeInTheDocument();
    expect(backgroundRect).toHaveAttribute('fill', 'blue');
    expect(backgroundRect).toHaveAttribute('width', '4');
    expect(backgroundRect).toHaveAttribute('height', '4');
  });

  test('should not render background when background prop is not provided', () => {
    const { container } = render(
      <SVGWrapper>
        <PatternLines id="test" height={4} width={4} />
      </SVGWrapper>,
    );

    const backgroundRect = container.querySelector('.visx-pattern-line-background');
    expect(backgroundRect).not.toBeInTheDocument();
  });

  test('should render correct pattern lines based on orientation', () => {
    const size = 4;
    const orientation: PatternOrientationType[] = ['diagonal', 'diagonalRightToLeft'];
    const expectedPaths = orientation.map((o) =>
      pathForOrientation({ orientation: o, height: size }),
    );

    const { container } = render(
      <SVGWrapper>
        <PatternLines id="test" height={size} width={size} orientation={orientation} />
      </SVGWrapper>,
    );

    const paths = container.querySelectorAll('.visx-pattern-line');
    expect(paths).toHaveLength(2);

    paths.forEach((path, index) => {
      expect(path).toHaveAttribute('d', expectedPaths[index]);
    });
  });
});
