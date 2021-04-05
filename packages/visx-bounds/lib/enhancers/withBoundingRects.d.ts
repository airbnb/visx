import React from 'react';
declare type rectShape = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};
export declare type WithBoundingRectsProps = {
    getRects?: () => {
        rect: rectShape;
        parentRect: rectShape;
    };
    rect?: rectShape;
    parentRect?: rectShape;
};
export default function withBoundingRects<Props extends object = {}>(BaseComponent: React.ComponentType<Props>): {
    new (props: Props): {
        node: HTMLElement | undefined | null;
        componentDidMount(): void;
        getRects(): Readonly<{}>;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
};
export {};
//# sourceMappingURL=withBoundingRects.d.ts.map