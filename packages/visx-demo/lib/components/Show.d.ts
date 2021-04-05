/// <reference types="lodash" />
import React from 'react';
import { MarginShape, ShowProvidedProps, PackageJson } from '../types';
declare type Component<P = {}> = React.FC<P> | React.ComponentClass<P>;
declare type ShowProps = {
    children?: string;
    title: string;
    component: Component<ShowProvidedProps>;
    codeSandboxDirectoryName?: string;
    shadow?: boolean;
    events?: boolean;
    margin?: MarginShape;
    description?: Component<{
        width: number;
        height: number;
    }>;
    windowResizeDebounceTime?: number;
    packageJson?: PackageJson;
};
declare const _default: {
    new (props: Readonly<ShowProps & {
        screenWidth?: number | undefined;
        screenHeight?: number | undefined;
    }>): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: (() => void) & import("lodash").Cancelable;
        render(): JSX.Element | null;
        context: any;
        setState<K extends "screenWidth" | "screenHeight">(state: {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } | Pick<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }, K> | ((prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, props: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>) => {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } | Pick<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }, K> | null) | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
    };
    new (props: ShowProps & {
        screenWidth?: number | undefined;
        screenHeight?: number | undefined;
    }, context?: any): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: (() => void) & import("lodash").Cancelable;
        render(): JSX.Element | null;
        context: any;
        setState<K_1 extends "screenWidth" | "screenHeight">(state: {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } | Pick<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }, K_1> | ((prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, props: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>) => {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        } | Pick<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }, K_1> | null) | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, prevState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextState: Readonly<{
            screenWidth?: number | undefined;
            screenHeight?: number | undefined;
        }>, nextContext: any): void;
    };
    defaultProps: {
        windowResizeDebounceTime: number;
        enableDebounceLeadingCall: boolean;
    };
    contextType?: React.Context<any> | undefined;
};
export default _default;
//# sourceMappingURL=Show.d.ts.map