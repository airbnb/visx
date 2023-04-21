import { useCallback, useContext } from 'react';
import TooltipContext from '../context/TooltipContext';
import useEventEmitters from './useEventEmitters';
import useEventHandlers from './useEventHandlers';
/** This hook simplifies the logic for initializing Series event emitters + handlers. */
export default function useSeriesEvents(_ref) {
  var _useContext;
  var dataKey = _ref.dataKey,
    enableEvents = _ref.enableEvents,
    findNearestDatum = _ref.findNearestDatum,
    onBlurProps = _ref.onBlur,
    onFocusProps = _ref.onFocus,
    onPointerMoveProps = _ref.onPointerMove,
    onPointerOutProps = _ref.onPointerOut,
    onPointerUpProps = _ref.onPointerUp,
    onPointerDownProps = _ref.onPointerDown,
    source = _ref.source,
    allowedSources = _ref.allowedSources;
  var _ref2 = (_useContext = useContext(TooltipContext)) != null ? _useContext : {},
    showTooltip = _ref2.showTooltip,
    hideTooltip = _ref2.hideTooltip;
  var onPointerMove = useCallback(function (params) {
    showTooltip(params);
    if (onPointerMoveProps) onPointerMoveProps(params);
  }, [showTooltip, onPointerMoveProps]);
  var onFocus = useCallback(function (params) {
    showTooltip(params);
    if (onFocusProps) onFocusProps(params);
  }, [showTooltip, onFocusProps]);
  var onPointerOut = useCallback(function (event) {
    hideTooltip();
    if (event && onPointerOutProps) onPointerOutProps(event);
  }, [hideTooltip, onPointerOutProps]);
  var onBlur = useCallback(function (event) {
    hideTooltip();
    if (event && onBlurProps) onBlurProps(event);
  }, [hideTooltip, onBlurProps]);
  var onPointerDown = useCallback(function (params) {
    showTooltip(params);
    if (onPointerDownProps) onPointerDownProps(params);
  }, [showTooltip, onPointerDownProps]);
  useEventHandlers({
    dataKey: dataKey,
    findNearestDatum: findNearestDatum,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    onPointerDown: enableEvents ? onPointerDown : undefined,
    allowedSources: allowedSources
  });
  return useEventEmitters({
    source: source,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
    onPointerDown: !!onPointerDownProps && enableEvents
  });
}