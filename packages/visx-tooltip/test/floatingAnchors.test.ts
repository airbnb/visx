import { getTooltipAnchorReference } from '../src/floating/anchors';
import type { TooltipAnchor, TooltipVirtualElement } from '../src/floating';

function rect(left: number, top: number, width = 0, height = 0) {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  } as DOMRect;
}

describe('floating tooltip anchors', () => {
  it('returns a DOM element anchor directly', () => {
    const element = document.createElement('button');

    expect(getTooltipAnchorReference({ type: 'element', element })).toBe(element);
    expect(getTooltipAnchorReference({ type: 'element', element: null })).toBeNull();
  });

  it('uses client point coordinates directly', () => {
    const reference = getTooltipAnchorReference({
      type: 'point',
      x: 12,
      y: 24,
      coordinateSpace: 'client',
    });

    expect(reference?.getBoundingClientRect()).toMatchObject({
      left: 12,
      top: 24,
      width: 0,
      height: 0,
    });
  });

  it('converts page point coordinates into client coordinates', () => {
    const scrollX = vi.spyOn(window, 'scrollX', 'get').mockReturnValue(5);
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(7);

    const reference = getTooltipAnchorReference({
      type: 'point',
      x: 25,
      y: 37,
      coordinateSpace: 'page',
    });

    expect(reference?.getBoundingClientRect()).toMatchObject({
      left: 20,
      top: 30,
      width: 0,
      height: 0,
    });

    scrollX.mockRestore();
    scrollY.mockRestore();
  });

  it('converts container-local CSS pixel coordinates into client coordinates', () => {
    const container = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(rect(100, 200, 300, 400));

    const reference = getTooltipAnchorReference({
      type: 'container-point',
      x: 25,
      y: 50,
      container,
    });

    expect(reference?.contextElement).toBe(container);
    expect(reference?.getBoundingClientRect()).toMatchObject({
      left: 125,
      top: 250,
      width: 0,
      height: 0,
    });
  });

  it('returns null for a container point without a container', () => {
    expect(
      getTooltipAnchorReference({
        type: 'container-point',
        x: 25,
        y: 50,
        container: null,
      }),
    ).toBeNull();
  });

  it('converts SVG user-space coordinates through the screen CTM', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const point = {
      x: 0,
      y: 0,
      matrixTransform(matrix: { a: number; d: number; e: number; f: number }) {
        return {
          x: this.x * matrix.a + matrix.e,
          y: this.y * matrix.d + matrix.f,
        };
      },
    };

    Object.assign(svg, {
      createSVGPoint: () => point,
      getScreenCTM: () => ({ a: 2, d: 3, e: 10, f: 20 }),
    });

    const reference = getTooltipAnchorReference({
      type: 'svg-point',
      x: 5,
      y: 7,
      svg,
    });

    expect(reference?.contextElement).toBe(svg);
    expect(reference?.getBoundingClientRect()).toMatchObject({
      left: 20,
      top: 41,
      width: 0,
      height: 0,
    });
  });

  it('falls back to the SVG element bounding rect when screen CTM is unavailable', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue(rect(50, 60));

    const reference = getTooltipAnchorReference({
      type: 'svg-point',
      x: 4,
      y: 6,
      svg,
    });

    expect(reference?.getBoundingClientRect()).toMatchObject({
      left: 54,
      top: 66,
      width: 0,
      height: 0,
    });
  });

  it('returns null for an SVG point without an SVG element', () => {
    expect(
      getTooltipAnchorReference({
        type: 'svg-point',
        x: 4,
        y: 6,
        svg: null,
      }),
    ).toBeNull();
  });

  it('creates virtual references from rect and virtual anchors', () => {
    const getRect = vi.fn(() => rect(1, 2, 3, 4));
    const contextElement = document.createElement('div');
    const rectReference = getTooltipAnchorReference({ type: 'rect', getRect, contextElement });

    expect(rectReference?.contextElement).toBe(contextElement);
    expect(rectReference?.getBoundingClientRect()).toMatchObject({ left: 1, top: 2 });
    expect(getRect).toHaveBeenCalledTimes(1);

    const element: TooltipVirtualElement = {
      getBoundingClientRect: () => rect(5, 6, 7, 8),
      contextElement,
    };

    expect(getTooltipAnchorReference({ type: 'virtual', element })).toBe(element);
  });

  it('narrows all public anchor variants', () => {
    const anchors = [
      { type: 'point', x: 0, y: 0 },
      { type: 'container-point', x: 0, y: 0, container: document.body },
      { type: 'svg-point', x: 0, y: 0, svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') },
      { type: 'rect', getRect: () => rect(0, 0) },
    ] satisfies TooltipAnchor[];

    expect(anchors).toHaveLength(4);
  });
});
