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
import { Connector as VxAnnotationConnector } from '@visx/annotation';
import { AnnotationConnector } from '../../src';

describe('<AnnotationConnector />', () => {
  it('should be defined', () => {
    expect(AnnotationConnector).toBeDefined();
  });
  it('should render a VxAnnotationConnector', () => {
    const wrapper = shallow(<AnnotationConnector />);
    expect(wrapper.find(VxAnnotationConnector)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
