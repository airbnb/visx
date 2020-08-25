import React from 'react';
import { DataContext as DataContextType } from '../types/data';

const DataContext = React.createContext<DataContextType<any, any, any, any> | null>(
  null,
);

export default DataContext;
