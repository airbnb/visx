import { AxisScale } from '@visx/axis';
import { PointerEvent, FocusEvent } from 'react';
import { EventHandlerParams, NearestDatumArgs, NearestDatumReturnType } from '../types';
export declare const POINTER_EVENTS_ALL = "__POINTER_EVENTS_ALL";
export declare const POINTER_EVENTS_NEAREST = "__POINTER_EVENTS_NEAREST";
export declare type PointerEventHandlerParams<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = {
    /** Controls whether callbacks are invoked for one or more registered dataKeys, the nearest dataKey, or all dataKeys. */
    dataKey: string | string[] | typeof POINTER_EVENTS_NEAREST | typeof POINTER_EVENTS_ALL;
    /** Optionally override the findNearestDatum logic. */
    findNearestDatum?: (params: NearestDatumArgs<XScale, YScale, Datum>) => NearestDatumReturnType<Datum>;
    /** Callback invoked onFocus for one or more series based on dataKey. */
    onFocus?: (params: EventHandlerParams<Datum>) => void;
    /** Callback invoked onBlur. */
    onBlur?: (event: FocusEvent) => void;
    /** Callback invoked onPointerMove for one or more series based on dataKey. */
    onPointerMove?: (params: EventHandlerParams<Datum>) => void;
    /** Callback invoked onPointerOut. */
    onPointerOut?: (event: PointerEvent) => void;
    /** Callback invoked onPointerUp for one or more series based on dataKey. */
    onPointerUp?: (params: EventHandlerParams<Datum>) => void;
    /** Valid event sources for which to invoke handlers. */
    allowedSources?: string[];
};
/**
 * Hook that returns PointerEvent handlers that invoke the passed pointer
 * handlers with the nearest datum to the event for the passed dataKey.
 */
export default function usePointerEventHandlers<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ dataKey, findNearestDatum: findNearestDatumProps, onBlur, onFocus, onPointerMove, onPointerOut, onPointerUp, allowedSources, }: PointerEventHandlerParams<XScale, YScale, Datum>): void;
//# sourceMappingURL=useEventHandlers.d.ts.map