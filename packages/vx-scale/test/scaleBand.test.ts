import { scaleBand } from '../src';

describe('scaleBand', () => {
  test('it should be defined', () => {
    expect(scaleBand).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3] as [number, number];
    const scale = scaleBand({ range });
    expect(scale.range()).toEqual(range);
  });

  test('rangeRound param should set scale range', () => {
    const rangeRound = [2, 3] as [number, number];
    const scale = scaleBand({ rangeRound });
    expect(scale.range()).toEqual(rangeRound);
  });

  test('domain param should set scale domain', () => {
    const domain = ['a', 'b'];
    const scale = scaleBand({ domain });
    expect(scale.domain()).toEqual(domain);
  });

  test('padding param should set scale padding inner & outer', () => {
    const padding = 0.75;
    const range = [0, 1] as [number, number];
    const domain = ['a', 'b'];
    const scale = scaleBand({ padding, range, domain });
    expect(scale.paddingInner()).toEqual(padding);
    expect(scale.paddingOuter()).toEqual(padding);
  });
});
