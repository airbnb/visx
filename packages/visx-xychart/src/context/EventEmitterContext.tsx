import { createContext } from 'react';
import { EventEmitterContextType } from '../types';

const EventEmitterContext = createContext<EventEmitterContextType | null>(null);

export default EventEmitterContext;
