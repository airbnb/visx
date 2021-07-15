import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScaleSVG } from '../src';

describe('<ScaleSVG />', () => {
  test('it should be defined', () => {
    expect(ScaleSVG).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGSVGElement>();
    const { container } = render(<ScaleSVG innerRef={fakeRef} />);
    const SVGElement = container.querySelector('svg');
    expect(fakeRef.current).toContainElement(SVGElement);
  });
});
