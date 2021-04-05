"use strict";

exports.__esModule = true;
exports.default = useDataRegistry;

var _react = _interopRequireWildcard(require("react"));

var _DataRegistry = _interopRequireDefault(require("../classes/DataRegistry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Hook that returns an API equivalent to DataRegistry but which updates as needed for use as a hook. */
function useDataRegistry() {
  var _useState = (0, _react.useState)(Math.random()),
      forceUpdate = _useState[1];

  var privateRegistry = (0, _react.useMemo)(function () {
    return new _DataRegistry.default();
  }, []);
  return (0, _react.useMemo)(function () {
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