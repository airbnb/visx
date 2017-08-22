import { withZoom, ZoomTransform, zoomIdentity } from '../src';

describe('Zoom', () => {
  describe('withZoom()', () => {
    test('it should be defined', () => {
      expect(withZoom).toBeDefined();
    });
  });

  describe('ZoomTransform', () => {
    test('it should be defined', () => {
      expect(ZoomTransform).toBeDefined();
    });
  });

  describe('zoomIdentity', () => {
    test('it should be defined', () => {
      expect(zoomIdentity).toBeDefined();
    });
  });
});
