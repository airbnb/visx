import { createContext } from 'react';
import { TooltipContextType } from '../types';

const TooltipContext = createContext<TooltipContextType | null>(null);

export default TooltipContext;
