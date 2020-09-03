/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AxisScaleOutput } from '@vx/axis';
import { ScaleConfig } from '@vx/scale';
import { DataContext as DataContextType } from '../types/data';

type AnyDataContext = DataContextType<
  ScaleConfig<AxisScaleOutput>,
  ScaleConfig<AxisScaleOutput>,
  any
>;

/** Utilities for infering context generics */
export type InferXScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  infer T,
  any,
  any
>
  ? T
  : ScaleConfig<AxisScaleOutput>;

export type InferYScaleConfig<X extends AnyDataContext> = X extends DataContextType<
  any,
  infer T,
  any
>
  ? T
  : ScaleConfig<AxisScaleOutput>;

export type InferDatum<X extends AnyDataContext> = X extends DataContextType<any, any, infer T>
  ? T
  : unknown;

export type InferDataContext<C extends AnyDataContext> = DataContextType<
  InferXScaleConfig<C>,
  InferYScaleConfig<C>,
  InferDatum<C>
>;

const DataContext = React.createContext<Partial<AnyDataContext>>({});

export default DataContext;
