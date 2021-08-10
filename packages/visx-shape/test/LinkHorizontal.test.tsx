import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { hierarchy } from 'd3-hierarchy';
import { LinkHorizontal } from '../src';

const mockHierarchy = hierarchy({
  name: 'Eve',
  children: [
    { name: 'Cain' },
    {
      name: 'Seth',
      children: [{ name: 'Enos' }, { name: 'Noam' }],
    },
  ],
});

const link = mockHierarchy.links()[0];

describe('<LinkHorizontal />', () => {
  test('it should be defined', () => {
    expect(LinkHorizontal).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <LinkHorizontal innerRef={fakeRef} data={link} />
      </svg>,
    );
    const PathElement = container.querySelector('path');
    expect(fakeRef.current).toContainElement(PathElement);
  });
});
