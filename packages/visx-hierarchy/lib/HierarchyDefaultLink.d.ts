/// <reference types="react" />
declare type Node = {
    x: number;
    y: number;
};
export declare type LinkProps = {
    link?: {
        source: Node;
        target: Node;
    };
};
export default function HierarchyDefaultLink({ link }: LinkProps): JSX.Element;
export {};
//# sourceMappingURL=HierarchyDefaultLink.d.ts.map