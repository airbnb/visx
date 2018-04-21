import React from 'react';
import ReactDOM from 'react-dom';
import { LinePath } from '../src';

const linePathProps = {
  data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
  x: d => d.x,
  y: d => d.y,
  xScale: d => d,
  yScale: d => d
};

describe('<LinePath />', () => {
  test('it should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    ReactDOM.render(<LinePath innerRef={refCallback} {...linePathProps} />, node);
  });
});
