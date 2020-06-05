import React from 'react';
import { EventContext as EventContextType } from '../types';

const EventContext = React.createContext<EventContextType>(null);

export default EventContext;
