/// <reference types="react" />
import { D3Scale, PickD3Scale } from '@visx/scale';
export declare type $TSFIXME = any;
export declare type DatumObject = Record<string | number, $TSFIXME>;
export declare type AnyScaleBand = PickD3Scale<'band', any, any>;
/** A catch-all type for scales that returns number */
export declare type PositionScale = D3Scale<number, any, any>;
/**
 * Add fields from `SVGProps` for the specified SVG `Element`
 * to `Props` except fields that already exist in `Props`
 */
export declare type AddSVGProps<Props, Element extends SVGElement> = Props & Omit<React.SVGProps<Element>, keyof Props>;
export declare type RenderProp<Input> = (args: Input) => React.ReactNode;
//# sourceMappingURL=base.d.ts.map