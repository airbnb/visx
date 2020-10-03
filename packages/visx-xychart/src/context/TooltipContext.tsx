import { createContext } from 'react';
import { TooltipContextType } from '../types';

// @TODO infer Datum
const TooltipContext = createContext<TooltipContextType<object> | null>(null);

export default TooltipContext;
