import React from 'react';
import { shallow } from 'enzyme';
import { Annotation, EditableAnnotation } from '../src';

describe('<EditableAnnotation />', () => {
  function setup() {
    return shallow(
      <EditableAnnotation width={100} height={100}>
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
  it('should render an Annotation', () => {
    expect(setup().find(Annotation)).toHaveLength(1);
  });
});
