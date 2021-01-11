import getTicks from '../../src/utils/getTicks';
import { scaleLinear, scaleBand } from '../../src';

describe('getTicks(scale)', () => {
  it('linear', () => {
    const scale = scaleLinear();
    expect(getTicks(scale, 3)).toEqual([0, 0.5, 1]);
    expect(getTicks(scale, 2)).toEqual([0, 0.5, 1]);
    expect(getTicks(scale, 1)).toEqual([0, 1]);
  });
  it('band', () => {
    const scale = scaleBand({
      domain: ['a', 'b', 'c', 'd'],
    });
    expect(getTicks(scale, 4)).toEqual(['a', 'b', 'c', 'd']);
    expect(getTicks(scale, 3)).toEqual(['a', 'b', 'c', 'd']);
    expect(getTicks(scale, 2)).toEqual(['a', 'c']);
  });
});
