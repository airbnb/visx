import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataContext, Annotation, AnimatedAnnotation } from '../../src';
import getDataContext from '../mocks/getDataContext';

const series = { key: 'visx', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

function setup(children: React.ReactNode) {
  return render(
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
    const { getByText } = setup(
      <Annotation dataKey={series.key} datum={{}}>
        {'test'}
      </Annotation>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });
  it('should render a VxEditableAnnotation when editable=true', () => {
    const { container } = setup(
      <Annotation editable dataKey={series.key} datum={{}}>
        {'test'}
      </Annotation>,
    );
    // with editable=true, the svg should have a circle overlay with 'cursor: grab' attribute
    const CircleElement = container.querySelector('circle');
    expect(CircleElement).toHaveAttribute('cursor');
  });
});

describe('<AnimatedAnnotation />', () => {
  it('should be defined', () => {
    expect(AnimatedAnnotation).toBeDefined();
  });
  it('should render a VxAnnotation', () => {
    const { getByText } = setup(
      <AnimatedAnnotation dataKey={series.key} datum={{}}>
        {'test'}
      </AnimatedAnnotation>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });
  it('should render a VxEditableAnnotation when editable=true', () => {
    const { container } = setup(
      <AnimatedAnnotation editable dataKey={series.key} datum={{}}>
        {'test'}
      </AnimatedAnnotation>,
    );

    // with editable=true, the svg should have a circle overlay with 'cursor: grab' attribute
    const CircleElement = container.querySelector('circle');
    expect(CircleElement).toHaveAttribute('cursor');
  });
});
