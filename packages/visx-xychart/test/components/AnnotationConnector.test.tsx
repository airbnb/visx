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
