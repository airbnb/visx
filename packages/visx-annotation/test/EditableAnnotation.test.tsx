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
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import EditableAnnotation from '../src/components/EditableAnnotation';

jest.mock('../src/components/Annotation', () => {
  const MockAnnotation = jest.fn(() => <g data-testid="annotation" />);
  return { __esModule: true, default: MockAnnotation };
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

  it('should render two resize handles by default', () => {
    const { container } = renderComponent();
    
    // With default props, both handles should be present
    const circles = container.getElementsByTagName('circle');
    expect(circles).toHaveLength(2);
  });

  it('should render one resize handle if canEditLabel is false', () => {
    const { container } = renderComponent({ canEditLabel: false });
    
    // Only subject handle should be present
    const circles = container.getElementsByTagName('circle');
    expect(circles).toHaveLength(1);
  });

  it('should render one resize handle if canEditSubject is false', () => {
    const { container } = renderComponent({ canEditSubject: false });
    
    // Only label handle should be present  
    const circles = container.getElementsByTagName('circle');
    expect(circles).toHaveLength(1);
  });

  it('should render an Annotation', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('annotation')).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
