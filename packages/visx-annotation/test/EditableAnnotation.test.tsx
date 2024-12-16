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
import { Annotation, EditableAnnotation } from '../src';
import { EditableAnnotationProps } from '../lib/components/EditableAnnotation';

describe('<EditableAnnotation />', () => {
  function setup(props?: Partial<EditableAnnotationProps>) {
    return shallow(
      <EditableAnnotation width={100} height={100} {...props}>
        <div />
      </EditableAnnotation>,
    );
  }
  it('should be defined', () => {
    expect(EditableAnnotation).toBeDefined();
  });
  it('should render two resize handles', () => {
    expect(setup().find('circle')).toHaveLength(2);
  });
  it('should render one resize handle if canEditLabel or canEditSubject are false', () => {
    expect(setup({ canEditLabel: false }).find('circle')).toHaveLength(1);
    expect(setup({ canEditSubject: false }).find('circle')).toHaveLength(1);
  });
  it('should render an Annotation', () => {
    expect(setup().find(Annotation)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
