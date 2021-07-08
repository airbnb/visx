import { render } from '@testing-library/react';
import React, { useContext } from 'react';
import { Annotation } from '../src';
import AnnotationContext from '../src/context/AnnotationContext';

describe('<Annotation />', () => {
  it('should be defined', () => {
    expect(Annotation).toBeDefined();
  });
  it('should provide AnnotationContext', () => {
    expect.assertions(1);
    const annotation = { x: -50, y: 100, dx: 1000, dy: 7 };
    function AnnotationChild() {
      const annotationContext = useContext(AnnotationContext);
      expect(annotationContext).toEqual(annotation);
      return null;
    }

    render(
      <Annotation {...annotation}>
        <AnnotationChild />
      </Annotation>,
    );
  });
});
