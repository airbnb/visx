import { zoomIdentity } from '../src';

describe('zoomIdentity', () => {
  test('it should be defined', () => {
    expect(zoomIdentity).toBeDefined();
  });

  test("it should have 'k' set to 1", () => {
    expect(zoomIdentity.k).toEqual(1);
  });

  test("it should have 'x' set to 0", () => {
    expect(zoomIdentity.x).toEqual(0);
  });

  test("it should have 'y' set to 0", () => {
    expect(zoomIdentity.y).toEqual(0);
  });
});
