import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LinePath } from '../src';
import { LinePathProps } from '../src/shapes/LinePath';

interface Datum {
  x: number;
  y: number;
}

const linePathProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  x: (d: Datum) => d.x,
  y: (d: Datum) => d.y,
};

const LinePathWrapper = (restProps = {}) => shallow(<LinePath {...restProps} />);
const LinePathChildren = ({ children, ...restProps }: Partial<LinePathProps<Datum>>) =>
  shallow(<LinePath {...restProps}>{children}</LinePath>);

describe('<LinePath />', () => {
  it('should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  it('should have the .visx-linepath class', () => {
    expect(LinePathWrapper(linePathProps).prop('className')).toBe('visx-linepath');
  });

  it('should default to strokeLinecap="round" for superior missing data rendering', () => {
    expect(LinePathWrapper(linePathProps).prop('strokeLinecap')).toBe('round');
  });

  it('should contain paths', () => {
    expect(LinePathWrapper(linePathProps).find('path').length).toBeGreaterThan(0);
  });

  it('should take a children as function prop', () => {
    const fn = jest.fn();
    LinePathChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  it('should call children function with { path }', () => {
    const fn = jest.fn();
    LinePathChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();

    const { container } = render(
      <svg>
        <LinePath data={linePathProps.data} innerRef={fakeRef} />
      </svg>,
    );
    const PathElement = container.querySelector('path');
    expect(fakeRef.current).toContainElement(PathElement);
  });
});
