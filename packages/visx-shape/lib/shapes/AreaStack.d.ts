/// <reference types="react" />
import { StackProps } from './Stack';
import { AddSVGProps, StackKey } from '../types';
declare type PickProps = 'className' | 'top' | 'left' | 'keys' | 'data' | 'curve' | 'defined' | 'x' | 'x0' | 'x1' | 'y0' | 'y1' | 'value' | 'order' | 'offset' | 'color' | 'children';
export declare type AreaStackProps<Datum, Key> = Pick<StackProps<Datum, Key>, PickProps>;
export default function AreaStack<Datum, Key extends StackKey = StackKey>({ className, top, left, keys, data, curve, defined, x, x0, x1, y0, y1, value, order, offset, color, children, ...restProps }: AddSVGProps<AreaStackProps<Datum, Key>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=AreaStack.d.ts.map