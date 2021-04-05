/// <reference types="lodash" />
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
export declare type WithParentSizeProps = {
    debounceTime?: number;
    enableDebounceLeadingCall?: boolean;
};
declare type WithParentSizeState = {
    parentWidth?: number;
    parentHeight?: number;
    initialWidth?: number;
    initialHeight?: number;
};
export declare type WithParentSizeProvidedProps = WithParentSizeState;
export default function withParentSize<BaseComponentProps extends WithParentSizeProps = {}>(BaseComponent: React.ComponentType<BaseComponentProps & WithParentSizeProvidedProps>): {
    new (props: Readonly<BaseComponentProps & WithParentSizeState>): {
        state: {
            parentWidth: undefined;
            parentHeight: undefined;
        };
        animationFrameID: number;
        resizeObserver: ResizeObserver | undefined;
        container: HTMLDivElement | null;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setRef: (ref: HTMLDivElement) => void;
        resize: (({ width, height }: {
            width: number;
            height: number;
        }) => void) & import("lodash").Cancelable;
        render(): JSX.Element;
        context: any;
        setState<K extends "parentWidth" | "parentHeight" | "initialWidth" | "initialHeight">(state: WithParentSizeState | ((prevState: Readonly<WithParentSizeState>, props: Readonly<BaseComponentProps & WithParentSizeState>) => WithParentSizeState | Pick<WithParentSizeState, K> | null) | Pick<WithParentSizeState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<BaseComponentProps & WithParentSizeState> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BaseComponentProps & WithParentSizeState>, prevState: Readonly<WithParentSizeState>): any;
        componentDidUpdate?(prevProps: Readonly<BaseComponentProps & WithParentSizeState>, prevState: Readonly<WithParentSizeState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): void;
    };
    new (props: BaseComponentProps & WithParentSizeState, context?: any): {
        state: {
            parentWidth: undefined;
            parentHeight: undefined;
        };
        animationFrameID: number;
        resizeObserver: ResizeObserver | undefined;
        container: HTMLDivElement | null;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setRef: (ref: HTMLDivElement) => void;
        resize: (({ width, height }: {
            width: number;
            height: number;
        }) => void) & import("lodash").Cancelable;
        render(): JSX.Element;
        context: any;
        setState<K extends "parentWidth" | "parentHeight" | "initialWidth" | "initialHeight">(state: WithParentSizeState | ((prevState: Readonly<WithParentSizeState>, props: Readonly<BaseComponentProps & WithParentSizeState>) => WithParentSizeState | Pick<WithParentSizeState, K> | null) | Pick<WithParentSizeState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<BaseComponentProps & WithParentSizeState> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BaseComponentProps & WithParentSizeState>, prevState: Readonly<WithParentSizeState>): any;
        componentDidUpdate?(prevProps: Readonly<BaseComponentProps & WithParentSizeState>, prevState: Readonly<WithParentSizeState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BaseComponentProps & WithParentSizeState>, nextState: Readonly<WithParentSizeState>, nextContext: any): void;
    };
    defaultProps: {
        debounceTime: number;
        enableDebounceLeadingCall: boolean;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
//# sourceMappingURL=withParentSize.d.ts.map