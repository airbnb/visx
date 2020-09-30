import { createContext } from 'react';
import { EventEmitterContext as EventEmitterContextType } from '../types';

const EventEmitterContext = createContext<EventEmitterContextType | null>(null);

export default EventEmitterContext;
