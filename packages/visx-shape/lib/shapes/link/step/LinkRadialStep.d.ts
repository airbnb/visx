/// <reference types="react" />
import { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
export declare function pathRadialStep<Link, Node>({ source, target, x, y, }: Required<AccessorProps<Link, Node>>): (link: Link) => string;
declare type LinkRadialStepProps<Link, Node> = {
    percent?: number;
} & AccessorProps<Link, Node> & SharedLinkProps<Link>;
export default function LinkRadialStep<Link, Node>({ className, innerRef, data, path, x, y, source, target, children, ...restProps }: AddSVGProps<LinkRadialStepProps<Link, Node>, SVGPathElement>): JSX.Element;
export {};
//# sourceMappingURL=LinkRadialStep.d.ts.map