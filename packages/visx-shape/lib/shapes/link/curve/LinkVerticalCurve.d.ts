/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathVerticalCurve<Link, Node>({ source, target, x, y, percent, }: Required<AccessorProps<Link, Node>> & {
    percent: number;
}): (link: Link) => string;
export declare type LinkVerticalCurveProps<Link, Node> = {
    percent?: number;
} & AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkVerticalCurve<Link, Node>({ className, children, data, innerRef, path, percent, x, y, source, target, ...restProps }: AddSVGProps<LinkVerticalCurveProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkVerticalCurve.d.ts.map