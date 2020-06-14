import React from 'react';
import { TooltipContext as TooltipContextType } from '../types';

const TooltipContext = React.createContext<TooltipContextType>(null);

export default TooltipContext;
