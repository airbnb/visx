import getTicks from '../../src/utils/getTicks';
import { scaleLinear } from '../../lib';

describe('getTicks(scale)', () => {
  it('linear', () => {
    expect(getTicks(scaleLinear(), 3)).toEqual([0, 0.5, 1]);
  });
});
