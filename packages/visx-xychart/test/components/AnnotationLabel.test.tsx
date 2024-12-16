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
import { shallow } from 'enzyme';
import { Label as VxAnnotationLabel } from '@visx/annotation';
import { AnnotationLabel } from '../../src';

describe('<AnnotationLabel />', () => {
  it('should be defined', () => {
    expect(AnnotationLabel).toBeDefined();
  });
  it('should render a VxAnnotationLabel', () => {
    const wrapper = shallow(<AnnotationLabel />);
    expect(wrapper.find(VxAnnotationLabel)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
