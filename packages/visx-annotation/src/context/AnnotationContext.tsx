import { createContext } from 'react';
import { AnnotationContextType } from '../types';

const AnnotationContext = createContext<AnnotationContextType>({});

export default AnnotationContext;
