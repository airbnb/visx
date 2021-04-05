/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathHorizontalDiagonal<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (data: Link) => string | null;
export declare type LinkHorizontalDiagonalProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkHorizontalDiagonal<Link, Node>({ className, children, data, innerRef, path, x, // note this returns a y value
y, // note this returns an x value
source, target, ...restProps }: AddSVGProps<LinkHorizontalDiagonalProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkHorizontal.d.ts.map