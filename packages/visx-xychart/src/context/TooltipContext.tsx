/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { TooltipContextType } from '../types';

const TooltipContext = createContext<TooltipContextType<any> | null>(null);

export default TooltipContext;
