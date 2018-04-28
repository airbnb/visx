import React from 'react';
import ReactDOM from 'react-dom';
import { LineRadial } from '../src';

const lineRadialProps = {
  data: [{ x: 0, y: 0 }, { x: 1, y: 1 }]
};

describe('<LineRadial />', () => {
  test('it should be defined', () => {
    expect(LineRadial).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    ReactDOM.render(<LineRadial innerRef={refCallback} {...lineRadialProps} />, node);
  });
});
