import { createContext } from 'react';
import type { EventEmitterContextType } from '../types';

const EventEmitterContext = createContext<EventEmitterContextType | null>(null);

export default EventEmitterContext;
