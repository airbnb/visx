import { getAxisTickCount, getVisibleTickValues } from '../src';

describe('tick helpers', () => {
  it('computes responsive tick counts from axis length', () => {
    expect(getAxisTickCount({ axisLength: 240, minTickSpacing: 48 })).toBe(5);
    expect(getAxisTickCount({ axisLength: 120, minTickSpacing: 48 })).toBe(2);
    expect(getAxisTickCount({ axisLength: 500, maxTicks: 6, minTickSpacing: 48 })).toBe(6);
  });

  it('preserves end ticks while thinning dense tick values', () => {
    expect(
      getVisibleTickValues(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], {
        axisLength: 160,
        minTickSpacing: 48,
      }),
    ).toEqual(['Jan', 'Apr', 'Jul']);
  });

  it('avoids adjacent visible ticks when rounding could crowd labels', () => {
    expect(
      getVisibleTickValues(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], {
        axisLength: 240,
        minTickSpacing: 48,
      }),
    ).toEqual(['Jan', 'Mar', 'May', 'Jul']);
  });

  it('preserves the final tick without exceeding the visible tick budget', () => {
    expect(
      getVisibleTickValues(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], {
        axisLength: 144,
        minTickSpacing: 48,
      }),
    ).toEqual(['A', 'F', 'J']);
  });

  it('allows callers to thin without preserving end ticks', () => {
    expect(
      getVisibleTickValues(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], {
        axisLength: 160,
        minTickSpacing: 48,
        preserveEndTicks: false,
      }),
    ).toEqual(['Jan', 'Apr', 'Jul']);
  });

  it('returns all tick values when they fit', () => {
    expect(
      getVisibleTickValues(['Jan', 'Feb', 'Mar'], {
        axisLength: 240,
        minTickSpacing: 48,
      }),
    ).toEqual(['Jan', 'Feb', 'Mar']);
  });
});
