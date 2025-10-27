import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import EditableAnnotation from '../src/components/EditableAnnotation';
import { addMock, removeMock } from './svgMock';

describe('<EditableAnnotation />', () => {
  type EditableAnnotationProps = React.ComponentProps<typeof EditableAnnotation>;

  const defaultProps: EditableAnnotationProps = {
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    children: <div data-testid="child-content">Child content</div>,
  };

  function renderComponent(props?: Partial<EditableAnnotationProps>) {
    return render(
      <svg>
        <EditableAnnotation {...defaultProps} {...props} />
      </svg>,
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    addMock();
  });
  afterEach(removeMock);

  it('should be defined', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('should render two resize handles by default', () => {
    const { container } = renderComponent();
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
  });

  it('should render one resize handle if canEditLabel is false', () => {
    const { container } = renderComponent({ canEditLabel: false });
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(1);
  });

  it('should render one resize handle if canEditSubject is false', () => {
    const { container } = renderComponent({ canEditSubject: false });
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(1);
  });

  it('should render children content', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('child-content')).toBeInTheDocument();
  });

  it('should render with correct initial positions', () => {
    const { container } = renderComponent({
      x: 10,
      y: 20,
      dx: 30,
      dy: 40,
    });

    const circles = container.querySelectorAll('circle');
    const [subjectHandle, labelHandle] = Array.from(circles);

    expect(subjectHandle).toHaveAttribute('cx', '10');
    expect(subjectHandle).toHaveAttribute('cy', '20');
    expect(labelHandle).toHaveAttribute('cx', '40'); // x + dx
    expect(labelHandle).toHaveAttribute('cy', '60'); // y + dy
  });
});
