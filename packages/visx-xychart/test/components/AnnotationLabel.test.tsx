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
