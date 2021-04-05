/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathHorizontalLine<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (data: Link) => string;
export declare type LinkHorizontalLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkHorizontalLine<Link, Node>({ className, children, innerRef, data, path, x, // note this returns a y value
y, // note this returns a x value
source, target, ...restProps }: AddSVGProps<LinkHorizontalLineProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkHorizontalLine.d.ts.map