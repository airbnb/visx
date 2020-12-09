import React from 'react';
import { shallow } from 'enzyme';
import { CircleSubject as VxAnnotationCircleSubject } from '@visx/annotation';
import { AnnotationCircleSubject } from '../../src';

describe('<AnnotationCircleSubject />', () => {
  it('should be defined', () => {
    expect(AnnotationCircleSubject).toBeDefined();
  });
  it('should render a VxAnnotationCircleSubject', () => {
    const wrapper = shallow(<AnnotationCircleSubject />);
    expect(wrapper.find(VxAnnotationCircleSubject)).toHaveLength(1);
  });
});
