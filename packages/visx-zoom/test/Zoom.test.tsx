import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Zoom, inverseMatrix } from '../src';

describe('<Zoom />', () => {
  it('should be defined', () => {
    expect(Zoom).toBeDefined();
  });

  it('should render the children and pass zoom params', () => {
    const initialTransform = {
      scaleX: 1.27,
      scaleY: 1.27,
      translateX: -211.62,
      translateY: 162.59,
      skewX: 0,
      skewY: 0,
    };

    const { getByText } = render(
      <Zoom
        width={400}
        height={400}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {({ transformMatrix }) => {
          const { scaleX, scaleY, translateX, translateY } = transformMatrix;
          return <div>{[scaleX, scaleY, translateX, translateY].join(',')}</div>;
        }}
      </Zoom>,
    );

    expect(getByText('1.27,1.27,-211.62,162.59')).toBeInTheDocument();
  });
});

describe('inverseMatrix', () => {
  it('should be defined', () => {
    expect(inverseMatrix).toBeDefined();
  });
});
