import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import useLineTransitionConfig from '../src/spring-configs/useLineTransitionConfig';

const scale = scaleLinear({ domain: [0, 10], range: [0, 10] });
const invertedScale = scaleLinear({ domain: [0, 10], range: [10, 0] });
const verticalLine = { from: { x: 0, y: 0 }, to: { x: 0, y: 5 } };
const verticalLineMax = { from: { x: 8, y: 0 }, to: { x: 8, y: 5 } };

describe('useLineTransitionConfig', () => {
  it('should be defined', () => {
    expect(useLineTransitionConfig).toBeDefined();
  });

  it('should return react-spring config with from, enter, update, leave keys', () => {
    const { result } = renderHook(() => useLineTransitionConfig({ scale, animateXOrY: 'x' }));

    expect(result.current).toMatchObject({
      from: expect.any(Function),
      enter: expect.any(Function),
      update: expect.any(Function),
      leave: expect.any(Function),
    });
  });

  it('should animate from scale min', () => {
    const { result } = renderHook(() =>
      useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'min',
      }),
    );

    const { result: invertedResult } = renderHook(() =>
      useLineTransitionConfig({
        scale: invertedScale,
        animateXOrY: 'y',
        animationTrajectory: 'min',
      }),
    );

    expect(result.current.from(verticalLine).fromX).toBe(0);
    expect(invertedResult.current.from(verticalLine).fromY).toBe(10);
  });

  it('should animate from scale max', () => {
    const { result } = renderHook(() =>
      useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'max',
      }),
    );

    const { result: invertedResult } = renderHook(() =>
      useLineTransitionConfig({
        scale: invertedScale,
        animateXOrY: 'y',
        animationTrajectory: 'max',
      }),
    );

    expect(result.current.from(verticalLine).fromX).toBe(10);
    expect(invertedResult.current.from(verticalLine).fromY).toBe(0);
  });

  it('should animate from outside', () => {
    const { result } = renderHook(() =>
      useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'outside',
      }),
    );

    expect(result.current.from(verticalLine).fromX).toBe(0);
    expect(result.current.from(verticalLineMax).fromX).toBe(10);
  });

  it('should animate from center', () => {
    const { result } = renderHook(() =>
      useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'center',
      }),
    );

    expect(result.current.from(verticalLine).fromX).toBe(5);
  });
});
