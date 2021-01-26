import { getSeededRandom } from '../src';

describe('generators/getSeededRandom', () => {
  it('should be defined', () => {
    expect(getSeededRandom).toBeDefined();
  });

  it('should return a random number generator that returns the same value given the same seed', () => {
    const random1 = getSeededRandom(0.5)();
    const random2 = getSeededRandom(0.5)();
    const random3 = getSeededRandom(0.1)();

    expect(random1).toEqual(random2);
    expect(random1).not.toEqual(random3);
  });
});
