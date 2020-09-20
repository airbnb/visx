import React from 'react';
import { scaleLinear } from '@visx/scale';
import { shallow } from 'enzyme';
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
    expect.assertions(1);
    function HookTest() {
      const config = useLineTransitionConfig({ scale, animateXOrY: 'x' });
      expect(config).toMatchObject({
        from: expect.any(Function),
        enter: expect.any(Function),
        update: expect.any(Function),
        leave: expect.any(Function),
      });
      return null;
    }
    shallow(<HookTest />);
  });
  it('should animate from scale min', () => {
    expect.assertions(2);
    function HookTest() {
      const config = useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'min',
      });
      const invertedConfig = useLineTransitionConfig({
        scale: invertedScale,
        animateXOrY: 'y',
        animationTrajectory: 'min',
      });
      expect(config.from(verticalLine).fromX).toBe(0);
      expect(invertedConfig.from(verticalLine).fromY).toBe(10);
      return null;
    }
    shallow(<HookTest />);
  });
  it('should animate from scale max', () => {
    expect.assertions(2);
    function HookTest() {
      const config = useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'max',
      });
      const invertedConfig = useLineTransitionConfig({
        scale: invertedScale,
        animateXOrY: 'y',
        animationTrajectory: 'max',
      });
      expect(config.from(verticalLine).fromX).toBe(10);
      expect(invertedConfig.from(verticalLine).fromY).toBe(0);
      return null;
    }
    shallow(<HookTest />);
  });
  it('should animate from outside', () => {
    expect.assertions(2);
    function HookTest() {
      const config = useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'outside',
      });
      expect(config.from(verticalLine).fromX).toBe(0);
      expect(config.from(verticalLineMax).fromX).toBe(10);
      return null;
    }
    shallow(<HookTest />);
  });
  it('should animate from center', () => {
    expect.assertions(1);
    function HookTest() {
      const config = useLineTransitionConfig({
        scale,
        animateXOrY: 'x',
        animationTrajectory: 'center',
      });
      expect(config.from(verticalLine).fromX).toBe(5);
      return null;
    }
    shallow(<HookTest />);
  });
});
