import { Point } from '@visx/point';
import { localPoint } from '../src';
import localPointGeneric from '../src/localPointGeneric';

describe('localPoint', () => {
  test('it should be defined', () => {
    expect(localPoint).toBeDefined();
  });

  test('it should return null if called with no arguments', () => {
    // @ts-ignore
    expect(localPoint()).toBeNull();
    // @ts-ignore
    expect(localPointGeneric(document.createElement('div'))).toBeNull();
  });

  test('it should handle localPoint(event) and get node from event.target', () => {
    const e = new MouseEvent('test', {
      clientX: 10,
      clientY: 10,
    });
    Object.defineProperty(e, 'target', {
      writable: false,
      value: {
        clientLeft: 0,
        clientTop: 0,
        getBoundingClientRect: () => ({ left: 0, top: 0 }),
      },
    });
    // @ts-ignore
    const result = localPoint(e);
    expect(result).toEqual(new Point({ x: 10, y: 10 }));
  });

  test('it should handle localPoint(node, event)', () => {
    const e = new MouseEvent('test', {
      clientX: 10,
      clientY: 10,
    });
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // @ts-ignore
    svg.createSVGPoint = () => ({ matrixTransform: () => ({ x: 10, y: 10 }) });
    // @ts-ignore
    svg.getScreenCTM = () => ({ inverse: () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    svg.appendChild(node);
    const result = localPoint(node, e);
    expect(result).toEqual(new Point({ x: 10, y: 10 }));
  });
});
