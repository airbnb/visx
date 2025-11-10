import type { UseTooltipParams } from '@visx/tooltip';
import type { EventHandlerParams } from './series';

export type TooltipDatum<Datum extends object> = {
  /** Series key that datum belongs to. */
  key: string;
  /** Index of datum in series data array. */
  index: number;
  /** Datum. */
  datum: Datum;
};

export type TooltipData<Datum extends object = object> = {
  /** Nearest Datum to event across all Series. */
  nearestDatum?: TooltipDatum<Datum> & { distance: number };
  /** Nearest Datum to event across for each Series. */
  datumByKey: {
    [key: string]: TooltipDatum<Datum>;
  };
};

export type TooltipContextType<Datum extends object> = UseTooltipParams<TooltipData<Datum>> & {
  showTooltip: (params: EventHandlerParams<Datum>) => void;
};
