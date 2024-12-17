import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AnnotationCircleSubject } from '../../src';

describe('<AnnotationCircleSubject />', () => {
  it('should be defined', () => {
    expect(AnnotationCircleSubject).toBeDefined();
  });

  it('should render VxAnnotationCircleSubject', () => {
    const { container } = render(
      <svg>
        <AnnotationCircleSubject x={10} y={10} />
      </svg>,
    );

    expect(container.querySelector('circle')).toBeInTheDocument();
  });
});
