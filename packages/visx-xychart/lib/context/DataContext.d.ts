import React from 'react';
import { AxisScale } from '@visx/axis';
import { DataContextType } from '../types';
declare type AnyDataContext = DataContextType<AxisScale, AxisScale, any>;
/** Utilities for infering context generics */
export declare type InferXScaleConfig<X extends AnyDataContext> = X extends DataContextType<infer T, any, any> ? T : AxisScale;
export declare type InferYScaleConfig<X extends AnyDataContext> = X extends DataContextType<any, infer T, any> ? T : AxisScale;
export declare type InferDatum<X extends AnyDataContext> = X extends DataContextType<any, any, infer T> ? T : any;
export declare type InferDataContext<C extends AnyDataContext = AnyDataContext> = DataContextType<InferXScaleConfig<C>, InferYScaleConfig<C>, InferDatum<C>>;
declare const DataContext: React.Context<Partial<InferDataContext<AnyDataContext>>>;
export default DataContext;
//# sourceMappingURL=DataContext.d.ts.map