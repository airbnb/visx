/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AxisScale } from '@visx/axis';
import { DataContextType } from '../types';

type AnyDataContext = DataContextType<AxisScale, AxisScale, any>;

/** Utilities for infering context generics */
export type InferXScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  infer T,
  any,
  any
>
  ? T
  : AxisScale;

export type InferYScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  any,
  infer T,
  any
>
  ? T
  : AxisScale;

export type InferDatum<X extends AnyDataContext> = X extends DataContextType<any, any, infer T>
  ? T
  : any;

export type InferDataContext<C extends AnyDataContext = AnyDataContext> = DataContextType<
  InferXScaleConfig<C>,
  InferYScaleConfig<C>,
  InferDatum<C>
>;

const DataContext = React.createContext<Partial<InferDataContext>>({});

export default DataContext;
