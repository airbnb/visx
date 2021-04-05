import React, { useMemo, useState } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** Hook that returns an API equivalent to DataRegistry but which updates as needed for use as a hook. */
export default function useDataRegistry() {
  var _useState = useState(Math.random()),
      forceUpdate = _useState[1];

  var privateRegistry = useMemo(function () {
    return new DataRegistry();
  }, []);
  return useMemo(function () {
    return {
      registerData: function registerData() {
        privateRegistry.registerData.apply(privateRegistry, arguments);
        forceUpdate(Math.random());
      },
      unregisterData: function unregisterData() {
        privateRegistry.unregisterData.apply(privateRegistry, arguments);
        forceUpdate(Math.random());
      },
      entries: function entries() {
        return privateRegistry.entries();
      },
      get: function get(key) {
        return privateRegistry.get(key);
      },
      keys: function keys() {
        return privateRegistry.keys();
      }
    };
  }, [privateRegistry]);
}