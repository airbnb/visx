import React from 'react';
import ReactDOM from 'react-dom';
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

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    ReactDOM.render(
      <LinkHorizontal innerRef={refCallback} data={link} />,
      node,
    );
  });
});
