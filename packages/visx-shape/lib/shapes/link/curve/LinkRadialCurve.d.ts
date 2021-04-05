/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathRadialCurve<Link, Node>({ source, target, x, y, percent, }: Required<AccessorProps<Link, Node>> & {
    percent: number;
}): (link: Link) => string;
export declare type LinkRadialCurveProps<Link, Node> = {
    percent?: number;
} & AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkRadialCurve<Link, Node>({ className, children, data, innerRef, path, percent, x, y, source, target, ...restProps }: AddSVGProps<LinkRadialCurveProps<Link, Node>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinkRadialCurve.d.ts.map