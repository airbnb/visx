import { createContext } from 'react';
import type { AnnotationContextType } from '../types';

const AnnotationContext = createContext<AnnotationContextType>({});

export default AnnotationContext;
