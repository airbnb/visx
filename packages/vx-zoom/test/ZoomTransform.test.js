import { ZoomTransform } from '../src';
import { zoomIdentity } from '../src';

describe('ZoomTransform', () => {
  describe('scale()', () => {
    test('it should return a new ZoomTransform with k', () => {
      const k = 2;
      const transform = zoomIdentity.scale(k);
      expect(transform.k).toEqual(k);
      expect(transform !== zoomIdentity).toBe(true);
    });
  });

  describe('translate()', () => {
    test('it should return a new ZoomTransform translated with x, y', () => {
      const k = 2;
      const p = { x: 2, y: 3 };
      const transform = zoomIdentity.scale(k).translate(p);
      expect(transform.x).toEqual(4);
      expect(transform.y).toEqual(6);
      expect(transform.k).toEqual(2);
    });
  });

  describe('apply()', () => {
    test('it should return a new Point with the ZoomTransform applied', () => {
      const p = { x: 2, y: 3 };
      const point = zoomIdentity.apply(p);
      const { x, y } = point.value();
      expect(x).toEqual(2);
      expect(y).toEqual(3);
    });
  });

  describe('applyX()', () => {
    test('it should return x with the ZoomTransform applied', () => {
      const x = zoomIdentity.applyX(3);
      expect(x).toEqual(3);
    });
  });

  describe('applyY()', () => {
    test('it should return y with the ZoomTransform applied', () => {
      const y = zoomIdentity.applyY(3);
      expect(y).toEqual(3);
    });
  });

  describe('invert()', () => {
    test('it should undo a the applied transform', () => {
      const p = { x: 2, y: 3 };
      const point = zoomIdentity.apply(p);
      const invertedPoint = zoomIdentity.invert(point);
      const { x, y } = invertedPoint.value();
      expect(x).toEqual(p.x);
      expect(y).toEqual(p.y);
    });
  });

  describe('invertX()', () => {
    test('it should return x with the applied transform removed', () => {
      const x0 = 3;
      const x1 = zoomIdentity.applyY(x0);
      const x2 = zoomIdentity.invertY(x1);
      expect(x1).toEqual(x0);
    });
  });

  describe('invertY()', () => {
    test('it should return y with the applied transform removed', () => {
      const y0 = 3;
      const y1 = zoomIdentity.applyY(y0);
      const y2 = zoomIdentity.invertY(y1);
      expect(y1).toEqual(y0);
    });
  });

  describe('toString()', () => {
    test('it should return a transform string', () => {
      const k = 2;
      const transform = zoomIdentity.scale(k);
      const expected = `translate(${transform.x}, ${transform.y}) scale(${transform.k})`;
      expect(transform.toString()).toEqual(expected);
      expect(`${transform}`).toEqual(expected);
    });
  });
});
