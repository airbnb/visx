import React from 'react';
import { ChartContext as ChartContextType } from '../types';

const ChartContext = React.createContext<ChartContextType>(null);

export default ChartContext;
