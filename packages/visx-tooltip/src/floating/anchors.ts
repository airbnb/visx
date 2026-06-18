import type { ReferenceElement } from '@floating-ui/react';
import type { TooltipAnchor, TooltipVirtualElement } from './types';

type MatrixLike = {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  e?: number;
  f?: number;
};

type SvgPointLike = {
  x: number;
  y: number;
  matrixTransform(matrix: MatrixLike): { x: number; y: number };
};

function createRect(left: number, top: number, width = 0, height = 0): DOMRect | ClientRect {
  if (typeof DOMRect === 'function') {
    return new DOMRect(left, top, width, height);
  }

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

function createPointVirtualElement(
  x: number,
  y: number,
  contextElement?: Element | null,
): TooltipVirtualElement {
  return {
    getBoundingClientRect: () => createRect(x, y),
    contextElement: contextElement ?? undefined,
  };
}

function getScrollX() {
  return window.scrollX || window.pageXOffset || 0;
}

function getScrollY() {
  return window.scrollY || window.pageYOffset || 0;
}

function isSvgSvgElement(element: SVGSVGElement | SVGGraphicsElement): element is SVGSVGElement {
  return element.ownerSVGElement == null;
}

function getSvgPointReference(
  x: number,
  y: number,
  svg: SVGSVGElement | SVGGraphicsElement,
): TooltipVirtualElement {
  return {
    getBoundingClientRect: () => {
      const ownerSvg = isSvgSvgElement(svg) ? svg : svg.ownerSVGElement;
      const createSVGPoint = ownerSvg?.createSVGPoint?.bind(ownerSvg);
      const getScreenCTM = svg.getScreenCTM?.bind(svg) ?? ownerSvg?.getScreenCTM?.bind(ownerSvg);
      const screenCTM = getScreenCTM?.();

      if (createSVGPoint && screenCTM) {
        const point = createSVGPoint() as SvgPointLike;
        point.x = x;
        point.y = y;
        const transformed = point.matrixTransform(screenCTM);
        return createRect(transformed.x, transformed.y);
      }

      const bounds = svg.getBoundingClientRect();
      return createRect(bounds.left + x, bounds.top + y);
    },
    contextElement: svg,
  };
}

export function getTooltipAnchorReference(anchor: TooltipAnchor | null | undefined) {
  if (!anchor) return null;

  switch (anchor.type) {
    case 'element':
      return anchor.element as ReferenceElement | null;

    case 'point': {
      const x = anchor.coordinateSpace === 'page' ? anchor.x - getScrollX() : anchor.x;
      const y = anchor.coordinateSpace === 'page' ? anchor.y - getScrollY() : anchor.y;
      return createPointVirtualElement(x, y) as ReferenceElement;
    }

    case 'container-point': {
      if (!anchor.container) return null;

      const container = anchor.container;
      return {
        getBoundingClientRect: () => {
          const bounds = container.getBoundingClientRect();
          return createRect(bounds.left + anchor.x, bounds.top + anchor.y);
        },
        contextElement: container,
      } as ReferenceElement;
    }

    case 'svg-point':
      return anchor.svg ? (getSvgPointReference(anchor.x, anchor.y, anchor.svg) as ReferenceElement) : null;

    case 'rect':
      return {
        getBoundingClientRect: anchor.getRect,
        contextElement: anchor.contextElement ?? undefined,
      } as ReferenceElement;

    case 'virtual':
      return anchor.element as ReferenceElement;

    default:
      return null;
  }
}
