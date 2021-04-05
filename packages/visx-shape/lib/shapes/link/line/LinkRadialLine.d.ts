/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathRadialLine<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (data: Link) => string;
export declare type LinkRadialLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkRadialLine<Link, Node>({ className, innerRef, data, path, x, y, source, target, children, ...restProps }: AddSVGProps<LinkRadialLineProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkRadialLine.d.ts.map