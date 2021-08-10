/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { withBoundingRects } from '../src';
import '@testing-library/jest-dom';

type RectShape = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: number;
  height?: number;
};

const emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const mockRect = {
  top: 50,
  left: 50,
  bottom: 0,
  right: 0,
};

type BoundingRectsComponentProps = {
  rect?: RectShape;
  parentRect?: RectShape;
  getRects?: () => DOMRect;
  children?: JSX.Element;
  otherProps?: object;
};

// Component created for testing purpose
function BoundingRectsComponent({
  rect,
  parentRect,
  getRects,
  children,
  ...otherProps
}: BoundingRectsComponentProps) {
  const parentRectStyle = {
    top: parentRect?.top,
    left: parentRect?.left,
    bottom: parentRect?.bottom,
    right: parentRect?.right,
  };

  const rectStyle = {
    top: rect?.top,
    left: rect?.left,
    bottom: rect?.bottom,
    right: rect?.right,
  };

  return (
    <div data-testid="BoundingRectsComponentParent" style={parentRectStyle}>
      <div data-testid="BoundingRectsComponent" style={rectStyle} onClick={() => getRects?.()}>
        {children}
        {JSON.stringify(otherProps)}
      </div>
    </div>
  );
}

describe('withBoundingRects()', () => {
  beforeAll(() => {
    // mock getBoundingClientRect
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      ...mockRect,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      toJSON: jest.fn(),
    }));
  });

  test('it should be defined', () => {
    expect(withBoundingRects).toBeDefined();
  });

  test('it should pass rect, parentRect, and getRect props to the wrapped component', async () => {
    const HOC = withBoundingRects(BoundingRectsComponent);
    // @ts-ignore
    const { getByTestId } = render(<HOC />);

    // getBoundingClientRect should be called twice, once for the component, and once for its parent
    await waitFor(() => expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(2));

    const RenderedComponent = getByTestId('BoundingRectsComponent');
    const RenderedComponentParent = getByTestId('BoundingRectsComponentParent');

    const expectedStyle = `top: ${mockRect.top}px; bottom: ${mockRect.bottom}px; left: ${mockRect.left}px; right: ${mockRect.right}px;`;
    expect(RenderedComponent).toHaveStyle(expectedStyle);
    expect(RenderedComponentParent).toHaveStyle(expectedStyle);

    fireEvent.click(RenderedComponent);
    // upon onClick time, getBuondingClientRect should be called extra 2 times
    expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(4);
  });

  test('it should pass additional props to the wrapped component', () => {
    const HOC = withBoundingRects(BoundingRectsComponent);
    // @ts-ignore
    const { getByText } = render(<HOC bananas="are yellow" />);
    expect(getByText('are yellow', { exact: false })).toBeInTheDocument();
  });

  test('it should not render if no node', () => {
    const Component = () => null;
    const HOC = withBoundingRects(Component);
    const { container } = render(<HOC />);
    expect(container.innerHTML).toHaveLength(0);
  });

  test('it should set rect and parentRect to empty state if no getBoundingClient()', () => {
    (Element.prototype.getBoundingClientRect as unknown) = null;
    const HOC = withBoundingRects(BoundingRectsComponent);
    // @ts-ignore
    const { getByTestId } = render(<HOC />);
    const RenderedComponent = getByTestId('BoundingRectsComponent');
    const RenderedComponentParent = getByTestId('BoundingRectsComponentParent');
    expect(RenderedComponent).toHaveStyle(emptyRect);
    expect(RenderedComponentParent).toHaveStyle(emptyRect);
  });
});
