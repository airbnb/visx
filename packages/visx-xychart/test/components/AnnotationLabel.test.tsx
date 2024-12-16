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
import { Label as VxAnnotationLabel } from '@visx/annotation';
import { AnnotationLabel } from '../../src';

jest.mock('@visx/annotation', () => ({
  Label: jest.fn(() => null)
}));

describe('<AnnotationLabel />', () => {
  it('should be defined', () => {
    expect(AnnotationLabel).toBeDefined();
  });

  it('should render VxAnnotationLabel', () => {
    render(<AnnotationLabel />);
    expect(VxAnnotationLabel).toHaveBeenCalled();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
