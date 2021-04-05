/// <reference types="react" />
import { EventType } from './types';
export declare function isElement(elem?: Element | EventType): elem is Element;
export declare function isSVGElement(elem?: Element): elem is SVGElement;
export declare function isSVGSVGElement(elem?: Element | null): elem is SVGSVGElement;
export declare function isSVGGraphicsElement(elem?: Element | null): elem is SVGGraphicsElement;
export declare function isTouchEvent(event?: EventType): event is TouchEvent | React.TouchEvent;
export declare function isMouseEvent(event?: EventType): event is MouseEvent | React.MouseEvent;
export declare function isEvent(event?: EventType | Element): event is EventType;
//# sourceMappingURL=typeGuards.d.ts.map