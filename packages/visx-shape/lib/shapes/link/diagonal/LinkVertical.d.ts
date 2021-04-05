/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathVerticalDiagonal<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (data: Link) => string | null;
declare type LinkVerticalDiagonalProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkVerticalDiagonal<Link, Node>({ className, children, data, innerRef, path, x, y, source, target, ...restProps }: AddSVGProps<LinkVerticalDiagonalProps<Link, Node>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=LinkVertical.d.ts.map