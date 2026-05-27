import { renderHook } from '@testing-library/react';
import DataRegistry from '../../src/classes/DataRegistry';
import useScales from '../../src/hooks/useScales';

describe('useScales', () => {
  it('should be defined', () => {
    expect(useScales).toBeDefined();
  });

  it('respects explicit non-zero continuous y-scale domains', () => {
    const dataRegistry = new DataRegistry();
    dataRegistry.registerData({
      key: 'series',
      data: [
        { x: 'a', y: 2 },
        { x: 'b', y: 9 },
      ],
      xAccessor: (datum) => datum.x,
      yAccessor: (datum) => datum.y,
    });

    const { result } = renderHook(() =>
      useScales({
        dataRegistry,
        xRange: [0, 100],
        yRange: [100, 0],
        xScaleConfig: { type: 'band' },
        yScaleConfig: { type: 'linear', domain: [1, 10] },
      }),
    );

    expect(result.current.yScale?.domain()).toEqual([1, 10]);
  });

  it('still includes zero for inferred continuous scale domains by default', () => {
    const dataRegistry = new DataRegistry();
    dataRegistry.registerData({
      key: 'series',
      data: [
        { x: 'a', y: 2 },
        { x: 'b', y: 9 },
      ],
      xAccessor: (datum) => datum.x,
      yAccessor: (datum) => datum.y,
    });

    const { result } = renderHook(() =>
      useScales({
        dataRegistry,
        xRange: [0, 100],
        yRange: [100, 0],
        xScaleConfig: { type: 'band' },
        yScaleConfig: { type: 'linear' },
      }),
    );

    expect(result.current.yScale?.domain()).toEqual([0, 9]);
  });

  it('includes zero for explicit continuous domains when zero is true', () => {
    const dataRegistry = new DataRegistry();
    dataRegistry.registerData({
      key: 'series',
      data: [
        { x: 'a', y: 2 },
        { x: 'b', y: 9 },
      ],
      xAccessor: (datum) => datum.x,
      yAccessor: (datum) => datum.y,
    });

    const { result } = renderHook(() =>
      useScales({
        dataRegistry,
        xRange: [0, 100],
        yRange: [100, 0],
        xScaleConfig: { type: 'band' },
        yScaleConfig: { type: 'linear', domain: [1, 10], zero: true },
      }),
    );

    expect(result.current.yScale?.domain()).toEqual([0, 10]);
  });
});
