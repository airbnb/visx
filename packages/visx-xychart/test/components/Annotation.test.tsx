import React from 'react';
import { mount } from 'enzyme';
import {
  Annotation as VxAnnotation,
  EditableAnnotation as VxEditableAnnotation,
} from '@visx/annotation';
import { DataContext, Annotation, AnimatedAnnotation } from '../../src';
import getDataContext from '../mocks/getDataContext';

const series = { key: 'visx', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

function setup(children: React.ReactNode) {
  return mount(
    <DataContext.Provider value={getDataContext(series)}>
      <svg>{children}</svg>
    </DataContext.Provider>,
  );
}

describe('<Annotation />', () => {
  it('should be defined', () => {
    expect(Annotation).toBeDefined();
  });
  it('should render a VxAnnotation', () => {
    const wrapper = setup(
      <Annotation dataKey={series.key} datum={{}}>
        {'test'}
      </Annotation>,
    );
    expect(wrapper.find(VxAnnotation)).toHaveLength(1);
  });
  it('should render a VxEditableAnnotation when editable=true', () => {
    const wrapper = setup(
      <Annotation editable dataKey={series.key} datum={{}}>
        {'test'}
      </Annotation>,
    );
    expect(wrapper.find(VxEditableAnnotation)).toHaveLength(1);
  });
});

describe('<AnimatedAnnotation />', () => {
  it('should be defined', () => {
    expect(AnimatedAnnotation).toBeDefined();
  });
  it('should render a VxAnnotation', () => {
    const wrapper = setup(
      <AnimatedAnnotation dataKey={series.key} datum={{}}>
        {'test'}
      </AnimatedAnnotation>,
    );
    expect(wrapper.find(VxAnnotation)).toHaveLength(1);
  });
  it('should render a VxEditableAnnotation when editable=true', () => {
    const wrapper = setup(
      <AnimatedAnnotation editable dataKey={series.key} datum={{}}>
        {'test'}
      </AnimatedAnnotation>,
    );
    expect(wrapper.find(VxEditableAnnotation)).toHaveLength(1);
  });
});
