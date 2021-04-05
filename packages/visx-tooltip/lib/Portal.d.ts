import React from 'react';
export declare type PortalProps = {
    /** Optional z-index to set on the Portal. */
    zIndex?: number;
    /** Content to render in the Portal. */
    children: NonNullable<React.ReactNode>;
};
/** Render within a portal using a declarative component API. */
export default class Portal extends React.PureComponent<PortalProps> {
    private node?;
    componentWillUnmount(): void;
    render(): React.ReactPortal | null;
}
//# sourceMappingURL=Portal.d.ts.map