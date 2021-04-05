/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathHorizontalStep<Link, Node>({ source, target, x, y, percent, }: Required<AccessorProps<Link, Node>> & {
    percent: number;
}): (link: Link) => string;
declare type LinkHorizontalStepProps<Link, Node> = {
    percent?: number;
} & AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkHorizontalStep<Link, Node>({ className, innerRef, data, path, percent, x, // note this returns a y value
y, // note this returns a x value
source, target, children, ...restProps }: AddSVGProps<LinkHorizontalStepProps<Link, Node>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=LinkHorizontalStep.d.ts.map