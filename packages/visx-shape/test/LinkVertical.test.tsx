import React from 'react';
import { mount } from 'enzyme';

import { hierarchy } from 'd3-hierarchy';
import { LinkVertical } from '../src';

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

describe('<LinkVertical />', () => {
  test('it should be defined', () => {
    expect(LinkVertical).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <LinkVertical innerRef={refCallback} data={link} />
        </svg>,
      );
    });
  });
});
