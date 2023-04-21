"use strict";

exports.__esModule = true;
exports.default = useEventEmitter;
var _react = require("react");
var _event = require("@visx/event");
var _EventEmitterContext = _interopRequireDefault(require("../context/EventEmitterContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Hook for optionally subscribing to a specified EventType,
 * and returns emitter for emitting events.
 */
function useEventEmitter( /** Type of event to subscribe to. */
eventType, /** Handler invoked on emission of EventType event.  */
handler, /** Optional valid sources for EventType subscription. */
allowedSources) {
  var emitter = (0, _react.useContext)(_EventEmitterContext.default);
  var allowedSourcesRef = (0, _react.useRef)();
  allowedSourcesRef.current = allowedSources; // use ref so allowedSources[] can change without creating new handlers

  // wrap emitter.emit so we can enforce stricter type signature
  var emit = (0, _react.useCallback)(function (type, event, source) {
    if (emitter) {
      emitter.emit(type, {
        event: event,
        svgPoint: (0, _event.localPoint)(event),
        source: source
      });
    }
  }, [emitter]);
  (0, _react.useEffect)(function () {
    if (emitter && eventType && handler) {
      // register handler, with source filtering as needed
      var handlerWithSourceFilter = function handlerWithSourceFilter(params) {
        var _allowedSourcesRef$cu;
        if (!allowedSourcesRef.current || params != null && params.source && (_allowedSourcesRef$cu = allowedSourcesRef.current) != null && _allowedSourcesRef$cu.includes(params.source)) {
          handler(params);
        }
      };
      emitter.on(eventType, handlerWithSourceFilter);
      return function () {
        return emitter == null ? void 0 : emitter.off(eventType, handlerWithSourceFilter);
      };
    }
    return undefined;
  }, [emitter, eventType, handler]);
  return emitter ? emit : null;
}