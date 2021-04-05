/// <reference types="react" />
import { SharedLinkProps, RadialAccessorProps, AddSVGProps } from '../../../types';
export declare function pathRadialDiagonal<Link, Node>({ source, target, angle, radius, }: Required<RadialAccessorProps<Link, Node>>): (data: Link) => string | null;
declare type LinkRadialDiagonalProps<Link, Node> = {
    angle: (node: Node) => number;
    radius: (node: Node) => number;
} & RadialAccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkRadialDiagonal<Link, Node>({ className, children, data, innerRef, path, angle, radius, source, target, ...restProps }: AddSVGProps<LinkRadialDiagonalProps<Link, Node>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=LinkRadial.d.ts.map