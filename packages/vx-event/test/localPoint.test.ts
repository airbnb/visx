import { localPoint } from '../src';
import localPointGeneric from '../src/localPointGeneric';

describe('localPoint', () => {
  test('it should be defined', () => {
    expect(localPoint).toBeDefined();
  });

  test('it should return null if called with no arguments', () => {
    // @ts-ignore
    expect(localPoint()).toBe(null);
    // @ts-ignore
    expect(localPointGeneric(document.createElement('div'))).toBe(null);
  });

  test('it should handle localPoint(event) and get node from event.target', () => {
    const e = new MouseEvent('test', {
      clientX: 0,
      clientY: 0,
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
    expect(result).toEqual({ x: 0, y: 0 });
  });

  test('it should handle localPoint(node, event)', () => {
    const e = new MouseEvent('test', {
      clientX: 0,
      clientY: 0,
    });
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // @ts-ignore
    svg.createSVGPoint = () => ({ matrixTransform: () => ({ x: 0, y: 0 }) });
    // @ts-ignore
    svg.getScreenCTM = () => ({ inverse: () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    svg.appendChild(node);
    const result = localPoint(node, e);
    expect(result).toEqual({ x: 0, y: 0 });
  });
});
