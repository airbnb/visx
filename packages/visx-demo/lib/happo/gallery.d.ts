import React from 'react';
declare type HappoSnapshot = {
    component: string;
    variants: {
        [key: string]: (renderInDom: (component: React.ReactElement) => void) => React.ReactNode | Promise<unknown>;
    };
};
declare const snapshots: HappoSnapshot[];
export default snapshots;
