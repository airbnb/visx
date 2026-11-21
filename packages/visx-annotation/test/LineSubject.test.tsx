import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Annotation, LineSubject } from '../src';

describe('<LineSubject />', () => {
  it('should be defined', () => {
    expect(LineSubject).toBeDefined();
  });

  it('should render a line', () => {
    const { container } = render(
      <svg width={100} height={100}>
        <LineSubject min={0} max={100} x={50} y={50} />
      </svg>,
    );
    const lineElement = container.querySelector('line');
    expect(lineElement).toBeInTheDocument();
  });

  it.each(['vertical', 'horizontal'] as const)(
    'uses a zero override for a %s line',
    (orientation) => {
      const { container } = render(
        <svg>
          <Annotation x={50} y={60}>
            <LineSubject orientation={orientation} x={0} y={0} min={10} max={100} />
          </Annotation>
        </svg>,
      );
      const line = container.querySelector('line');
      const fixed = orientation === 'vertical' ? 'x' : 'y';
      const varying = orientation === 'vertical' ? 'y' : 'x';
      expect(line).toHaveAttribute(`${fixed}1`, '0');
      expect(line).toHaveAttribute(`${fixed}2`, '0');
      expect(line).toHaveAttribute(`${varying}1`, '10');
      expect(line).toHaveAttribute(`${varying}2`, '100');
    },
  );

  it('uses context when no coordinates are provided', () => {
    const { container } = render(
      <svg>
        <Annotation x={50} y={60}>
          <LineSubject min={10} max={100} />
        </Annotation>
      </svg>,
    );
    expect(container.querySelector('line')).toHaveAttribute('x1', '50');
    expect(container.querySelector('line')).toHaveAttribute('x2', '50');
  });
});
