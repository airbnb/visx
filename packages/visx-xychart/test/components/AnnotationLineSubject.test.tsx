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
import { LineSubject as VxAnnotationLineSubject } from '@visx/annotation';
import { AnnotationLineSubject } from '../../src';

describe('<AnnotationLineSubject />', () => {
  it('should be defined', () => {
    expect(AnnotationLineSubject).toBeDefined();
  });
  it('should render a VxAnnotationLineSubject', () => {
    const wrapper = shallow(<AnnotationLineSubject />);
    expect(wrapper.find(VxAnnotationLineSubject)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
