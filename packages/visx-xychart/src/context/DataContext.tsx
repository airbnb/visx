/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import type { AxisScale } from '@visx/axis';
import type { DataContextType } from '../types';

type AnyDataContext = DataContextType<AxisScale, AxisScale, any>;

/** Utilities for inferring context generics */
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

const DataContext = createContext<Partial<InferDataContext>>({});

export default DataContext;
