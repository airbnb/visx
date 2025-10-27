import { vi } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Polygon } from '../src';

describe('<Polygon />', () => {
  const renderInSvg = (ui: React.ReactElement) => render(<svg>{ui}</svg>);

  it('should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  it('should render an octagon', () => {
    const { container } = renderInSvg(<Polygon sides={8} size={25} />);
    const polygon = container.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
    const points = polygon?.getAttribute('points')?.split(' ');
    expect(points).toHaveLength(8);
  });

  it('should add classname', () => {
    const { container } = renderInSvg(<Polygon sides={6} size={25} className="a-polygon" />);
    const polygon = container.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
    expect(polygon).toHaveClass('visx-polygon');
    expect(polygon).toHaveClass('a-polygon');
  });

  it('should add onClick handler', () => {
    const fn = vi.fn();
    const { container } = renderInSvg(
      <Polygon sides={6} size={25} className="a-polygon" onClick={fn} />,
    );
    const polygon = container.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
    fireEvent.click(polygon as Element);
    expect(fn).toHaveBeenCalled();
  });

  it('should render children function', () => {
    const fn = vi.fn(() => <g data-testid="child" />);
    const { getByTestId } = renderInSvg(
      <Polygon sides={8} size={25}>
        {fn}
      </Polygon>,
    );
    expect(fn).toHaveBeenCalled();
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('should pass points to children function', () => {
    const fn = vi.fn(() => null);
    renderInSvg(
      <Polygon sides={8} size={25}>
        {fn}
      </Polygon>,
    );
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('points');
    expect(args.points).toHaveLength(8);
  });
});
