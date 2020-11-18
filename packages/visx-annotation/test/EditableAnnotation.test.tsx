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
