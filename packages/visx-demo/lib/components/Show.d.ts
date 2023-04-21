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
        screenWidth?: number;
        screenHeight?: number;
    }>): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: import("lodash").DebouncedFunc<() => void>;
        render(): JSX.Element;
        context: any;
        setState<K extends "screenWidth" | "screenHeight">(state: {
            screenWidth?: number;
            screenHeight?: number;
        } | ((prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, props: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>) => {
            screenWidth?: number;
            screenHeight?: number;
        } | Pick<{
            screenWidth?: number;
            screenHeight?: number;
        }, K>) | Pick<{
            screenWidth?: number;
            screenHeight?: number;
        }, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
    };
    new (props: ShowProps & {
        screenWidth?: number;
        screenHeight?: number;
    }, context?: any): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: import("lodash").DebouncedFunc<() => void>;
        render(): JSX.Element;
        context: any;
        setState<K_1 extends "screenWidth" | "screenHeight">(state: {
            screenWidth?: number;
            screenHeight?: number;
        } | ((prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, props: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>) => {
            screenWidth?: number;
            screenHeight?: number;
        } | Pick<{
            screenWidth?: number;
            screenHeight?: number;
        }, K_1>) | Pick<{
            screenWidth?: number;
            screenHeight?: number;
        }, K_1>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, prevState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ShowProps & {
            screenWidth?: number;
            screenHeight?: number;
        }>, nextState: Readonly<{
            screenWidth?: number;
            screenHeight?: number;
        }>, nextContext: any): void;
    };
    defaultProps: {
        windowResizeDebounceTime: number;
        enableDebounceLeadingCall: boolean;
    };
    contextType?: React.Context<any>;
};
export default _default;
