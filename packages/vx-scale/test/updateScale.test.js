import { updateScale, scaleLinear } from '../src';

describe('updateScale', () => {
  test('it should be defined', () => {
    expect(updateScale).toBeDefined();
  });

  test('it should return a new copy of the scale', () => {
    const domain = [0, 350];
    const range = [0, 2];
    const scale = scaleLinear({ range, domain });
    const nextScale = updateScale(scale);
    expect(scale).not.toBe(nextScale);
  });

  test('it should update the new copy of the scale', () => {
    const domain = [0, 350];
    const newDomain = [200, 300];
    const range = [0, 2];
    const scale = scaleLinear({ range, domain });
    const nextScale = updateScale(scale, {
      domain: newDomain,
    });
    expect(scale).not.toBe(nextScale);
    expect(nextScale.domain()).toEqual(newDomain);
    expect(scale.domain()).toEqual(domain);
  });
});
