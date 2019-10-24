import { scaleSymlog } from '../src';

describe('scaleSymlog', () => {
  test('it should be defined', () => {
    expect(scaleSymlog).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3];
    const scale = scaleSymlog({ range });
    expect(scale.range()).toEqual(range);
  });

  test('constant param should set scale constant', () => {
    const constant = 2;
    const scale = scaleSymlog({ constant });
    expect(scale.constant()).toEqual(constant);
  });
});
