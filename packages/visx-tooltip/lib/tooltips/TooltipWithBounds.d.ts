import React from 'react';
import { WithBoundingRectsProps } from '@visx/bounds';
import { TooltipProps } from './Tooltip';
export declare type TooltipWithBoundsProps = TooltipProps & React.HTMLProps<HTMLDivElement> & WithBoundingRectsProps;
declare const _default: {
    new (props: TooltipWithBoundsProps): {
        node: HTMLElement | null | undefined;
        componentDidMount(): void;
        getRects(): Readonly<{}>;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | Pick<{}, K> | ((prevState: Readonly<{}>, props: Readonly<TooltipWithBoundsProps>) => {} | Pick<{}, K> | null) | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<TooltipWithBoundsProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<TooltipWithBoundsProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<TooltipWithBoundsProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<TooltipWithBoundsProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<TooltipWithBoundsProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<TooltipWithBoundsProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<TooltipWithBoundsProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<TooltipWithBoundsProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
};
export default _default;
//# sourceMappingURL=TooltipWithBounds.d.ts.map