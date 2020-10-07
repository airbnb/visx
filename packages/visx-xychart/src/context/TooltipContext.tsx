/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { TooltipContextType } from '../types';

type InferTooltipContext<D extends object = any> = D extends TooltipContextType<infer D> ? D : any;

const TooltipContext = createContext<InferTooltipContext>(null);

export default TooltipContext;
