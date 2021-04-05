"use strict";

exports.__esModule = true;
exports.default = ParentSize;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ParentSize(_ref) {
  var className = _ref.className,
      children = _ref.children,
      _ref$debounceTime = _ref.debounceTime,
      debounceTime = _ref$debounceTime === void 0 ? 300 : _ref$debounceTime,
      _ref$ignoreDimensions = _ref.ignoreDimensions,
      ignoreDimensions = _ref$ignoreDimensions === void 0 ? [] : _ref$ignoreDimensions,
      _ref$parentSizeStyles = _ref.parentSizeStyles,
      parentSizeStyles = _ref$parentSizeStyles === void 0 ? {
    width: '100%',
    height: '100%'
  } : _ref$parentSizeStyles,
      _ref$enableDebounceLe = _ref.enableDebounceLeadingCall,
      enableDebounceLeadingCall = _ref$enableDebounceLe === void 0 ? true : _ref$enableDebounceLe,
      restProps = _objectWithoutPropertiesLoose(_ref, ["className", "children", "debounceTime", "ignoreDimensions", "parentSizeStyles", "enableDebounceLeadingCall"]);

  var target = (0, _react.useRef)(null);
  var animationFrameID = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }),
      state = _useState[0],
      setState = _useState[1];

  var resize = (0, _react.useMemo)(function () {
    var normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];
    return (0, _debounce.default)(function (incoming) {
      setState(function (existing) {
        var stateKeys = Object.keys(existing);
        var keysWithChanges = stateKeys.filter(function (key) {
          return existing[key] !== incoming[key];
        });
        var shouldBail = keysWithChanges.every(function (key) {
          return normalized.includes(key);
        });
        return shouldBail ? existing : incoming;
      });
    }, debounceTime, {
      leading: enableDebounceLeadingCall
    });
  }, [debounceTime, enableDebounceLeadingCall, ignoreDimensions]);
  (0, _react.useEffect)(function () {
    var observer = new window.ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var _entry$contentRect = entry.contentRect,
            left = _entry$contentRect.left,
            top = _entry$contentRect.top,
            width = _entry$contentRect.width,
            height = _entry$contentRect.height;
        animationFrameID.current = window.requestAnimationFrame(function () {
          resize({
            width: width,
            height: height,
            top: top,
            left: left
          });
        });
      });
    });
    if (target.current) observer.observe(target.current);
    return function () {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize]);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    style: parentSizeStyles,
    ref: target,
    className: className
  }, restProps), children(_extends({}, state, {
    ref: target.current,
    resize: resize
  })));
}

ParentSize.propTypes = {
  className: _propTypes.default.string,
  debounceTime: _propTypes.default.number,
  enableDebounceLeadingCall: _propTypes.default.bool,
  ignoreDimensions: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.arrayOf(_propTypes.default.any)]),
  children: _propTypes.default.func.isRequired
};