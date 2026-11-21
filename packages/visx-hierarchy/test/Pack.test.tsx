import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { hierarchy, HierarchyDefaultNode, Pack } from '../src';

describe('<Pack />', () => {
  it('preserves a zero-valued leaf radius when rendering the computed layout', () => {
    const root = hierarchy({ value: 0, children: [{ value: 0 }, { value: 1 }] }).sum(
      (datum) => datum.value,
    );
    const { container } = render(
      <svg>
        <Pack root={root} size={[100, 100]} />
      </svg>,
    );

    expect(root.children?.[0]).toHaveProperty('r', 0);
    expect(container.querySelectorAll('circle')[1]).toHaveAttribute('r', '0');
    expect(Number(container.querySelectorAll('circle')[2].getAttribute('r'))).toBeGreaterThan(0);
  });
});

describe('<HierarchyDefaultNode />', () => {
  it.each([0, 5, undefined])('uses the supplied radius %s or the tree default', (radius) => {
    const { container } = render(
      <svg>
        <HierarchyDefaultNode node={{ x: 10, y: 20, r: radius }} />
      </svg>,
    );
    expect(container.querySelector('circle')).toHaveAttribute('r', String(radius ?? 15));
  });
});
