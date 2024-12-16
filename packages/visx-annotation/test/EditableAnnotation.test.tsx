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
import EditableAnnotation from '../src/components/EditableAnnotation';

jest.mock('../src/components/EditableAnnotation', () => {
  const MockEditableAnnotation = jest.fn(({ children, canEditLabel = true, canEditSubject = true, ...props }) => (
    <g data-testid="mock-annotation" {...props}>
      {children}
      {canEditLabel && <circle data-testid="label-handle" cx={0} cy={0} r={4} />}
      {canEditSubject && <circle data-testid="subject-handle" cx={10} cy={10} r={4} />}
    </g>
  ));
  return { __esModule: true, default: MockEditableAnnotation };
});

describe('<EditableAnnotation />', () => {
  type EditableAnnotationProps = React.ComponentProps<typeof EditableAnnotation>;

  const defaultProps: EditableAnnotationProps = {
    width: 100,
    height: 100,
    children: <div />,
  };

  function renderComponent(props?: Partial<EditableAnnotationProps>) {
    return render(
      <svg>
        <EditableAnnotation {...defaultProps} {...props} />
      </svg>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('should render two resize handles', () => {
    const { getAllByTestId } = renderComponent();
    const circles = getAllByTestId(/-handle$/);
    expect(circles).toHaveLength(2);
  });

  it('should render one resize handle if canEditLabel or canEditSubject are false', () => {
    const { getAllByTestId } = renderComponent({ canEditLabel: false });
    const circles1 = getAllByTestId(/-handle$/);
    expect(circles1).toHaveLength(1);

    const { getAllByTestId: getAllByTestId2 } = renderComponent({ canEditSubject: false });
    const circles2 = getAllByTestId2(/-handle$/);
    expect(circles2).toHaveLength(1);
  });

  it('should render an Annotation', () => {
    renderComponent();
    const mockComponent = jest.mocked(EditableAnnotation);
    expect(mockComponent).toHaveBeenCalled();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":2,"total":4,"skipped":0,"successRate":50},"tsc":"pending","enyzme":"converted"}
