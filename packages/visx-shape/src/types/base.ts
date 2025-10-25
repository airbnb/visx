import type { D3Scale, PickD3Scale } from '@visx/scale';
import type { ReactNode, SVGProps } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type $TSFIXME = any;

export type DatumObject = Record<string | number, $TSFIXME>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyScaleBand = PickD3Scale<'band', any, any>;

/** A catch-all type for scales that returns number */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PositionScale = D3Scale<number, any, any>;

/**
 * Add fields from `SVGProps` for the specified SVG `Element`
 * to `Props` except fields that already exist in `Props`
 */
export type AddSVGProps<Props, Element extends SVGElement> = Props &
  Omit<SVGProps<Element>, keyof Props>;

export type RenderProp<Input> = (args: Input) => ReactNode;
