/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathVerticalStep<Link, Node>({ source, target, x, y, percent, }: Required<AccessorProps<Link, Node>> & {
    percent: number;
}): (link: Link) => string;
declare type LinkVerticalStepProps<Link, Node> = {
    percent?: number;
} & AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkVerticalStep<Link, Node>({ className, innerRef, data, path, percent, x, y, source, target, children, ...restProps }: AddSVGProps<LinkVerticalStepProps<Link, Node>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=LinkVerticalStep.d.ts.map