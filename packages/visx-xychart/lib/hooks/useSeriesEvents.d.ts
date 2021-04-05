/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { SeriesProps } from '../types';
import { PointerEventHandlerParams } from './useEventHandlers';
export declare type SeriesEventsParams<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = Pick<SeriesProps<XScale, YScale, Datum>, 'enableEvents' | 'onBlur' | 'onFocus' | 'onPointerMove' | 'onPointerOut' | 'onPointerUp'> & Pick<PointerEventHandlerParams<XScale, YScale, Datum>, 'dataKey' | 'allowedSources' | 'findNearestDatum'> & {
    /** The source of emitted events. */
    source: string;
};
/** This hook simplifies the logic for initializing Series event emitters + handlers. */
export default function useSeriesEvents<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ dataKey, enableEvents, findNearestDatum, onBlur: onBlurProps, onFocus: onFocusProps, onPointerMove: onPointerMoveProps, onPointerOut: onPointerOutProps, onPointerUp: onPointerUpProps, source, allowedSources, }: SeriesEventsParams<XScale, YScale, Datum>): {
    onPointerMove: ((event: import("react").PointerEvent<Element>) => void | undefined) | undefined;
    onFocus: ((event: import("react").FocusEvent<Element>) => void | undefined) | undefined;
    onBlur: ((event: import("react").FocusEvent<Element>) => void | undefined) | undefined;
    onPointerOut: ((event: import("react").PointerEvent<Element>) => void | undefined) | undefined;
    onPointerUp: ((event: import("react").PointerEvent<Element>) => void | undefined) | undefined;
};
//# sourceMappingURL=useSeriesEvents.d.ts.map