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
import '@testing-library/jest-dom';
import { LineSubject as VxAnnotationLineSubject } from '@visx/annotation';
import { AnnotationLineSubject } from '../../src';

jest.mock('@visx/annotation', () => ({
  LineSubject: jest.fn(() => <div data-testid="vx-line-subject" />),
}));

describe('<AnnotationLineSubject />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AnnotationLineSubject).toBeDefined();
  });

  it('should render a VxAnnotationLineSubject', () => {
    const { getByTestId } = render(<AnnotationLineSubject />);
    expect(getByTestId('vx-line-subject')).toBeInTheDocument();
    expect(VxAnnotationLineSubject).toHaveBeenCalled();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
