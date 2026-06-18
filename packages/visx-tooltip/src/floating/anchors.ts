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

  const rect: DOMRect = {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({
      x: left,
      y: top,
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    }),
  };

  return rect;
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

export function getTooltipAnchorReference(
  anchor: TooltipAnchor | null | undefined,
): ReferenceElement | null {
  if (!anchor) return null;

  switch (anchor.type) {
    case 'element':
      return anchor.element;

    case 'point': {
      const x = anchor.coordinateSpace === 'page' ? anchor.x - getScrollX() : anchor.x;
      const y = anchor.coordinateSpace === 'page' ? anchor.y - getScrollY() : anchor.y;
      return createPointVirtualElement(x, y);
    }

    case 'container-point': {
      if (!anchor.container) return null;

      const { container } = anchor;
      const reference: TooltipVirtualElement = {
        getBoundingClientRect: () => {
          const bounds = container.getBoundingClientRect();
          return createRect(bounds.left + anchor.x, bounds.top + anchor.y);
        },
        contextElement: container,
      };

      return reference;
    }

    case 'svg-point':
      return anchor.svg ? getSvgPointReference(anchor.x, anchor.y, anchor.svg) : null;

    case 'rect': {
      const reference: TooltipVirtualElement = {
        getBoundingClientRect: anchor.getRect,
        contextElement: anchor.contextElement ?? undefined,
      };

      return reference;
    }

    case 'virtual':
      return anchor.element;

    default:
      return null;
  }
}
