import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withParentSize } from '../src';

type ComponentProps = {
  parentWidth?: number;
  parentHeight?: number;
};

function Component({ parentWidth, parentHeight }: ComponentProps) {
  return <div data-testid="Component" style={{ width: parentWidth, height: parentHeight }} />;
}

describe('withParentSize', () => {
  test('it should be defined', () => {
    expect(withParentSize).toBeDefined();
  });

  test('it should pass parentWidth and parentHeight props to its child', () => {
    const HOC = withParentSize(Component);
    const { getByTestId } = render(<HOC initialWidth={200} initialHeight={200} />);

    const RenderedComponent = getByTestId('Component');
    expect(RenderedComponent).toHaveStyle('width: 200px; height: 200px');
  });
});
