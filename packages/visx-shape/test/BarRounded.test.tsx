import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BarRounded } from '../src';
import { useBarRoundedPath } from '../src/shapes/BarRounded';

const testProps = { x: 0, y: 0, width: 10, height: 20, radius: 2 };

describe('<BarRounded />', () => {
  it('should be defined', () => {
    expect(BarRounded).toBeDefined();
  });

  it('should have the .visx-bar-rounded class', () => {
    const { container } = render(
      <svg>
        <BarRounded {...testProps} className="test" />
      </svg>,
    );
    expect(container.querySelector('path')).toHaveClass('visx-bar-rounded', 'test');
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <BarRounded innerRef={fakeRef} {...testProps} />
      </svg>,
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });

  it('should support hooks with useBarRoundedPath', () => {
    const path = useBarRoundedPath({ ...testProps, all: true });
    expect(path).toBe(
      'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
    );
  });

  it('should generate correct paths for different corner configurations', () => {
    const cases = [
      {
        props: { topLeft: true },
        expected: 'M2,0 h6 h2v2 v16 v2h-2 h-6 h-2v-2 v-16 a2,2 0 0 1 2,-2z',
      },
      {
        props: { topRight: true },
        expected: 'M2,0 h6 a2,2 0 0 1 2,2 v16 v2h-2 h-6 h-2v-2 v-16 v-2h2z',
      },
      {
        props: { bottomLeft: true },
        expected: 'M2,0 h6 h2v2 v16 v2h-2 h-6 a2,2 0 0 1 -2,-2 v-16 v-2h2z',
      },
      {
        props: { bottomRight: true },
        expected: 'M2,0 h6 h2v2 v16 a2,2 0 0 1 -2,2 h-6 h-2v-2 v-16 v-2h2z',
      },
      {
        props: { top: true },
        expected: 'M2,0 h6 a2,2 0 0 1 2,2 v16 v2h-2 h-6 h-2v-2 v-16 a2,2 0 0 1 2,-2z',
      },
      {
        props: { bottom: true },
        expected: 'M2,0 h6 h2v2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 v-2h2z',
      },
      {
        props: { left: true },
        expected: 'M2,0 h6 h2v2 v16 v2h-2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
      },
      {
        props: { right: true },
        expected: 'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 h-2v-2 v-16 v-2h2z',
      },
      {
        props: { all: true },
        expected:
          'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
      },
    ];

    cases.forEach(({ props, expected }) => {
      const { container } = render(
        <svg>
          <BarRounded {...testProps} {...props} />
        </svg>,
      );
      expect(container.querySelector('path')).toHaveAttribute('d', expected);
    });
  });

  it('should clamp radius to the center of the shortest side of the rect', () => {
    const { container } = render(
      <svg>
        <BarRounded {...testProps} topLeft width={4} radius={400} />
      </svg>,
    );
    const r = Math.min(4, testProps.height) / 2;
    expect(container.querySelector('path')).toHaveAttribute(
      'd',
      `M2,0 h0 h2v2 v16 v2h-2 h0 h-2v-2 v-16 a${r},${r} 0 0 1 ${r},-${r}z`,
    );
  });
});
