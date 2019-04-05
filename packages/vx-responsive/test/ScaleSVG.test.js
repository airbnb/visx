import { ScaleSVG } from '../src';

describe('<ScaleSVG />', () => {
  test('it should be defined', () => {
    expect(ScaleSVG).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', done => {
    const refCallback = n => {
      expect(n.tagName).toEqual('svg');
      done();
    };

    mount(<ScaleSVG innerRef={refCallback} />);
  });
});
