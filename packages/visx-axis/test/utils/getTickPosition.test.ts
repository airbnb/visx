import { scaleLinear, scaleBand } from '@visx/scale';
import getTickPosition from '../../src/utils/getTickPosition';

describe('getTickPosition(scale, align)', () => {
  describe('scales without band', () => {
    it('return center position', () => {
      const position = getTickPosition(scaleLinear({ domain: [0, 10], range: [0, 100] }));
      expect(position(5)).toEqual(50);
    });
  });
  describe('scales with band', () => {
    describe('align', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [0, 100] });

      it('default to center', () => {
        expect(getTickPosition(scale)('b')).toEqual(50);
      });
      it('center', () => {
        expect(getTickPosition(scale, 'center')('b')).toEqual(50);
      });
      it('start', () => {
        expect((getTickPosition(scale, 'start')('b') as number).toFixed(2)).toEqual('33.33');
      });
      it('end', () => {
        expect((getTickPosition(scale, 'end')('b') as number).toFixed(2)).toEqual('66.67');
      });
    });
    describe('with rounding', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [0, 100], round: true });

      it('center', () => {
        expect(getTickPosition(scale, 'center')('b')).toEqual(51);
      });
      it('start', () => {
        expect(getTickPosition(scale, 'start')('b')).toEqual(34);
      });
      it('end', () => {
        expect(getTickPosition(scale, 'end')('b')).toEqual(67);
      });
    });
  });
});
