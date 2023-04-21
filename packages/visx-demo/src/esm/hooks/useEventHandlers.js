function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useCallback, useContext } from 'react';
import DataContext from '../context/DataContext';
import { isFocusEvent, isPointerEvent } from '../typeguards/events';
import findNearestDatumX from '../utils/findNearestDatumX';
import findNearestDatumY from '../utils/findNearestDatumY';
import useEventEmitter from './useEventEmitter';
export var POINTER_EVENTS_ALL = '__POINTER_EVENTS_ALL';
export var POINTER_EVENTS_NEAREST = '__POINTER_EVENTS_NEAREST';
/**
 * Hook that returns PointerEvent handlers that invoke the passed pointer
 * handlers with the nearest datum to the event for the passed dataKey.
 */
export default function usePointerEventHandlers(_ref) {
  var dataKey = _ref.dataKey,
    findNearestDatumProps = _ref.findNearestDatum,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    allowedSources = _ref.allowedSources;
  var _ref2 = useContext(DataContext),
    width = _ref2.width,
    height = _ref2.height,
    horizontal = _ref2.horizontal,
    dataRegistry = _ref2.dataRegistry,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale;
  var findNearestDatum = findNearestDatumProps || (horizontal ? findNearestDatumY : findNearestDatumX);

  // this logic is shared by pointerup, pointermove, and focus handlers
  var getHandlerParams = useCallback(function (params) {
    var _ref3 = params || {},
      svgPoint = _ref3.svgPoint,
      event = _ref3.event;
    var pointerParamsByKey = {};

    // nearest Datum across all dataKeys, if relevant
    var nearestDatumPointerParams = null;
    var nearestDatumDistance = Infinity;
    if (params && event && svgPoint && width && height && xScale && yScale) {
      var _dataRegistry$keys;
      var considerAllKeys = dataKey === POINTER_EVENTS_NEAREST || dataKey === POINTER_EVENTS_ALL;
      var dataKeys = considerAllKeys ? (_dataRegistry$keys = dataRegistry == null ? void 0 : dataRegistry.keys()) != null ? _dataRegistry$keys : [] : Array.isArray(dataKey) ? dataKey : [dataKey];

      // find nearestDatum for relevant dataKey(s)
      dataKeys.forEach(function (key) {
        var entry = dataRegistry == null ? void 0 : dataRegistry.get(key);
        if (entry) {
          var nearestDatum = findNearestDatum({
            dataKey: key,
            data: entry.data,
            height: height,
            point: svgPoint,
            width: width,
            xAccessor: entry.xAccessor,
            xScale: xScale,
            yAccessor: entry.yAccessor,
            yScale: yScale
          });
          if (nearestDatum) {
            pointerParamsByKey[key] = _extends({
              key: key,
              svgPoint: svgPoint,
              event: event
            }, nearestDatum);

            // compute nearest Datum if not emitting events for all keys
            if (dataKey === POINTER_EVENTS_NEAREST) {
              var _nearestDatum$distanc, _nearestDatum$distanc2;
              var distance = Math.sqrt(((_nearestDatum$distanc = nearestDatum.distanceX) != null ? _nearestDatum$distanc : Math.pow(Infinity, 2)) + ((_nearestDatum$distanc2 = nearestDatum.distanceY) != null ? _nearestDatum$distanc2 : Math.pow(Infinity, 2)));
              nearestDatumPointerParams = distance < nearestDatumDistance ? pointerParamsByKey[key] : nearestDatumPointerParams;
              nearestDatumDistance = Math.min(nearestDatumDistance, distance);
            }
          }
        }
      });
      var pointerParams = dataKey === POINTER_EVENTS_NEAREST ? [nearestDatumPointerParams] : dataKey === POINTER_EVENTS_ALL || Array.isArray(dataKey) ? Object.values(pointerParamsByKey) : [pointerParamsByKey[dataKey]];
      return pointerParams.filter(function (param) {
        return param;
      });
    }
    return [];
  }, [dataKey, dataRegistry, xScale, yScale, width, height, findNearestDatum]);
  var handlePointerMove = useCallback(function (params) {
    if (onPointerMove) {
      getHandlerParams(params).forEach(function (p) {
        return onPointerMove(p);
      });
    }
  }, [getHandlerParams, onPointerMove]);
  var handlePointerUp = useCallback(function (params) {
    if (onPointerUp) {
      getHandlerParams(params).forEach(function (p) {
        return onPointerUp(p);
      });
    }
  }, [getHandlerParams, onPointerUp]);
  var handlePointerDown = useCallback(function (params) {
    if (onPointerDown) {
      getHandlerParams(params).forEach(function (p) {
        return onPointerDown(p);
      });
    }
  }, [getHandlerParams, onPointerDown]);
  var handleFocus = useCallback(function (params) {
    if (onFocus) {
      getHandlerParams(params).forEach(function (p) {
        return onFocus(p);
      });
    }
  }, [getHandlerParams, onFocus]);
  var handlePointerOut = useCallback(function (params) {
    var event = params == null ? void 0 : params.event;
    if (event && isPointerEvent(event) && onPointerOut) onPointerOut(event);
  }, [onPointerOut]);
  var handleBlur = useCallback(function (params) {
    var event = params == null ? void 0 : params.event;
    if (event && isFocusEvent(event) && onBlur) onBlur(event);
  }, [onBlur]);
  useEventEmitter('pointermove', onPointerMove ? handlePointerMove : undefined, allowedSources);
  useEventEmitter('pointerout', onPointerOut ? handlePointerOut : undefined, allowedSources);
  useEventEmitter('pointerup', onPointerUp ? handlePointerUp : undefined, allowedSources);
  useEventEmitter('pointerdown', onPointerDown ? handlePointerDown : undefined, allowedSources);
  useEventEmitter('focus', onFocus ? handleFocus : undefined, allowedSources);
  useEventEmitter('blur', onBlur ? handleBlur : undefined, allowedSources);
}