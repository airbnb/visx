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
import { CircleSubject as VxAnnotationCircleSubject } from '@visx/annotation';
import { AnnotationCircleSubject } from '../../src';

jest.mock('@visx/annotation', () => ({
  CircleSubject: jest.fn(() => null),
}));

describe('<AnnotationCircleSubject />', () => {
  it('should be defined', () => {
    expect(AnnotationCircleSubject).toBeDefined();
  });

  it('should render VxAnnotationCircleSubject', () => {
    render(<AnnotationCircleSubject />);
    expect(VxAnnotationCircleSubject).toHaveBeenCalled();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
