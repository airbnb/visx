import React from 'react';
export declare type NodeProps = {
    cx?: number;
    cy?: number;
};
export default function DefaultNode({ r, fill, ...rest }: NodeProps & Omit<React.SVGProps<SVGCircleElement>, keyof NodeProps>): JSX.Element;
//# sourceMappingURL=DefaultNode.d.ts.map