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
