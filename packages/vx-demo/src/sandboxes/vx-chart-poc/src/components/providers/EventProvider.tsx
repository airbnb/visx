import React from 'react';
import { useTooltip } from '@vx/tooltip';
import EventContext from '../../context/EventContext';
import { TooltipData } from '../../types';

export type EventProviderProps = {
  children: React.ReactNode;
};

// type EventProviderState = EventContextType & {};

// class BaseEventProvider extends React.Component<
//   EventProviderProps & { chartContext: ChartContextType },
//   EventProviderState
// > {
//   state: EventProviderState = {
//     tooltipData: null,
//     tooltipLeft: null,
//     tooltipTop: null,
//   };

//   render() {
//     const { children } = this.props;
//     // const { tooltipData, tooltipLeft, tooltipTop } = this.state;

//     return (
//       <EventContext.Provider value={{ tooltipData, tooltipLeft, tooltipTop }}>
//         {children}
//       </EventContext.Provider>
//     );
//   }
// }

export default function EventProvider({ children }: EventProviderProps) {
  const tooltip = useTooltip<TooltipData>();
  return <EventContext.Provider value={tooltip}>{children}</EventContext.Provider>;
}
