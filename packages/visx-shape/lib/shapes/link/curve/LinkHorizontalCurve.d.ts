/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathHorizontalCurve<Link, Node>({ source, target, x, y, percent, }: Required<AccessorProps<Link, Node>> & {
    percent: number;
}): (link: Link) => string;
export declare type LinkHorizontalCurveProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link> & {
    percent?: number;
};
export default function LinkHorizontalCurve<Link, Node>({ className, children, data, innerRef, path, percent, x, // note this returns a y value
y, // note this returns an x value
source, target, ...restProps }: AddSVGProps<LinkHorizontalCurveProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkHorizontalCurve.d.ts.map