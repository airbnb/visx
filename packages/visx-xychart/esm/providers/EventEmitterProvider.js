import React, { useMemo } from 'react';
import mitt from 'mitt';
import EventEmitterContext from '../context/EventEmitterContext';
/** Provider for EventEmitterContext. */

export default function EventEmitterProvider(_ref) {
  var children = _ref.children;
  var emitter = useMemo(function () {
    return mitt();
  }, []);
  return /*#__PURE__*/React.createElement(EventEmitterContext.Provider, {
    value: emitter
  }, children);
}