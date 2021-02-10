import polarToCartesian from '../src/utils/polarToCartesian';

describe('GridUtils', () => {
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
});
