import { Orientation } from '../src';

describe('Orientation', () => {
  it('should have keys for top/right/bottom/left', () => {
    expect(Orientation).toEqual({
      top: expect.any(String),
      right: expect.any(String),
      bottom: expect.any(String),
      left: expect.any(String),
    });
  });
});
