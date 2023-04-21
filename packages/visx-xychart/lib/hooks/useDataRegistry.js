"use strict";

exports.__esModule = true;
exports.default = useDataRegistry;
var _react = require("react");
var _DataRegistry = _interopRequireDefault(require("../classes/DataRegistry"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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