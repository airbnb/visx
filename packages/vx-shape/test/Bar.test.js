import React from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '../src';

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('RECT');
      done();
    };
    ReactDOM.render(<Bar innerRef={refCallback} />, node);
  });
});
