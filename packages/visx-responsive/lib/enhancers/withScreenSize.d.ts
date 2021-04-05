/// <reference types="lodash" />
import React from 'react';
export declare type WithScreenSizeProps = {
    windowResizeDebounceTime?: number;
    enableDebounceLeadingCall?: boolean;
};
declare type WithScreenSizeState = {
    screenWidth?: number;
    screenHeight?: number;
};
export declare type WithScreenSizeProvidedProps = WithScreenSizeState;
export default function withScreenSize<BaseComponentProps extends WithScreenSizeProps = {}>(BaseComponent: React.ComponentType<BaseComponentProps>): {
    new (props: Readonly<BaseComponentProps & WithScreenSizeState>): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: (() => void) & import("lodash").Cancelable;
        render(): JSX.Element | null;
        context: any;
        setState<K extends "screenWidth" | "screenHeight">(state: WithScreenSizeState | ((prevState: Readonly<WithScreenSizeState>, props: Readonly<BaseComponentProps & WithScreenSizeState>) => WithScreenSizeState | Pick<WithScreenSizeState, K> | null) | Pick<WithScreenSizeState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<BaseComponentProps & WithScreenSizeState> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BaseComponentProps & WithScreenSizeState>, prevState: Readonly<WithScreenSizeState>): any;
        componentDidUpdate?(prevProps: Readonly<BaseComponentProps & WithScreenSizeState>, prevState: Readonly<WithScreenSizeState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): void;
    };
    new (props: BaseComponentProps & WithScreenSizeState, context?: any): {
        state: {
            screenWidth: undefined;
            screenHeight: undefined;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        resize: (() => void) & import("lodash").Cancelable;
        render(): JSX.Element | null;
        context: any;
        setState<K extends "screenWidth" | "screenHeight">(state: WithScreenSizeState | ((prevState: Readonly<WithScreenSizeState>, props: Readonly<BaseComponentProps & WithScreenSizeState>) => WithScreenSizeState | Pick<WithScreenSizeState, K> | null) | Pick<WithScreenSizeState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<BaseComponentProps & WithScreenSizeState> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BaseComponentProps & WithScreenSizeState>, prevState: Readonly<WithScreenSizeState>): any;
        componentDidUpdate?(prevProps: Readonly<BaseComponentProps & WithScreenSizeState>, prevState: Readonly<WithScreenSizeState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithScreenSizeState>, nextState: Readonly<WithScreenSizeState>, nextContext: any): void;
    };
    defaultProps: {
        windowResizeDebounceTime: number;
        enableDebounceLeadingCall: boolean;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
//# sourceMappingURL=withScreenSize.d.ts.map