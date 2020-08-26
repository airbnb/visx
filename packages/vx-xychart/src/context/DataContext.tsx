/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { DataContext as DataContextType } from '../types/data';

type AnyDataContext = DataContextType<any, any, any, any>;

/** Utilities for infering context generics */
export type InferXScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  infer T,
  any,
  any,
  any
>
  ? T
  : any;

export type InferYScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  any,
  infer T,
  any,
  any
>
  ? T
  : any;

export type InferDatum<X extends AnyDataContext> = X extends DataContextType<any, any, infer T, any>
  ? T
  : any;

export type InferDataKey<X extends AnyDataContext> = X extends DataContextType<
  any,
  any,
  any,
  infer T
>
  ? T
  : any;

export type InferDataContext<C extends AnyDataContext> = DataContextType<
  InferXScaleConfig<C>,
  InferYScaleConfig<C>,
  InferDatum<C>,
  InferDataKey<C>
>;

const DataContext = React.createContext<Partial<AnyDataContext>>({});

export default DataContext;
