import { scaleLinear, scaleBand } from '@visx/scale';
import polarToCartesian from '../src/utils/polarToCartesian';
import getScaleBandwidth from '../src/utils/getScaleBandwidth';

describe('grid utils', () => {
  describe('polarToCartesian', () => {
    const config = {
      radius: 20,
      angle: 20,
    };
    it('should return cartesian output for the given polar input config', () => {
      const expected = {
        x: config.radius * Math.cos(config.angle),
        y: config.radius * Math.sin(config.angle),
      };
      expect(polarToCartesian(config)).toEqual(expected);
    });
  });

  describe('getScaleBandwidth', () => {
    it('should return 0 for non-band scales', () => {
      expect(
        getScaleBandwidth(
          scaleLinear({
            range: [0, 90],
            domain: [0, 100],
          }),
        ),
      ).toBe(0);
    });

    it('should return the size of the band for band scales', () => {
      expect(
        getScaleBandwidth(
          scaleBand({
            range: [0, 90],
            domain: ['a', 'b', 'c'],
            padding: 0,
          }),
        ),
      ).toBe(30);
    });
  });
});
