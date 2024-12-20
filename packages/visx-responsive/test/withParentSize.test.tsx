import { ResizeObserver } from '@juggle/resize-observer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import type { WithParentSizeProvidedProps } from '../src';
import { withParentSize } from '../src';

interface ComponentProps extends WithParentSizeProvidedProps {
  // only there to ensure that TS allows enhanced component to have own props, different than the ones passed by the HOC
  role: string;
}

function Component({ parentWidth, parentHeight, role }: ComponentProps) {
  return (
    <div data-testid="Component" role={role} style={{ width: parentWidth, height: parentHeight }} />
  );
}

describe('withParentSize', () => {
  test('it should be defined', () => {
    expect(withParentSize).toBeDefined();
  });

  test('it should pass parentWidth and parentHeight props to its child', () => {
    const WrappedComponent = withParentSize(Component, ResizeObserver);

    // @ts-expect-error ensure unknown types still error
    render(<WrappedComponent unknown="prop" />);

    const { getByTestId } = render(
      <WrappedComponent role="img" initialWidth={200} initialHeight={200} />,
    );

    const RenderedComponent = getByTestId('Component');
    expect(RenderedComponent).toHaveStyle('width: 200px; height: 200px');
  });
});
