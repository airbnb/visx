/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathVerticalLine<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (data: Link) => string;
export declare type LinkVerticalLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkVerticalLine<Link, Node>({ className, innerRef, data, path, x, y, source, target, children, ...restProps }: AddSVGProps<LinkVerticalLineProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkVerticalLine.d.ts.map