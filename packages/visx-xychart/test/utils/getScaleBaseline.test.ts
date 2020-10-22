import { scaleLinear } from '@visx/scale';
import getScaleBaseline from '../../src/utils/getScaleBaseline';

describe('getScaleBaseline', () => {
  it('should be defined', () => {
    expect(getScaleBaseline).toBeDefined();
  });

  it('should work for ascending ranges', () => {
    expect(
      getScaleBaseline(
        scaleLinear({
          domain: [0, 100],
          range: [50, 100],
        }),
      ),
    ).toBe(50);
  });

  it('should work for descending ranges', () => {
    expect(
      getScaleBaseline(
        scaleLinear({
          domain: [0, 100],
          range: [100, 50],
        }),
      ),
    ).toBe(100);
  });

  it("should use a scale's minimum even if its not clamped to exclude zero", () => {
    expect(
      getScaleBaseline(
        scaleLinear({
          domain: [100, 200],
          range: [50, 100], // ascending
        }),
      ),
    ).toBe(50);
    expect(
      getScaleBaseline(
        scaleLinear({
          domain: [100, 200],
          range: [100, 50], // descending
        }),
      ),
    ).toBe(100);
  });
});
