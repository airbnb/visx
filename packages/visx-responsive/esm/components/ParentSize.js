import _pt from "prop-types";
var _excluded = ["className", "children", "debounceTime", "ignoreDimensions", "parentSizeStyles", "enableDebounceLeadingCall", "resizeObserverPolyfill"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
var defaultIgnoreDimensions = [];
var defaultParentSizeStyles = {
  width: '100%',
  height: '100%'
};
export default function ParentSize(_ref) {
  var className = _ref.className,
    children = _ref.children,
    _ref$debounceTime = _ref.debounceTime,
    debounceTime = _ref$debounceTime === void 0 ? 300 : _ref$debounceTime,
    _ref$ignoreDimensions = _ref.ignoreDimensions,
    ignoreDimensions = _ref$ignoreDimensions === void 0 ? defaultIgnoreDimensions : _ref$ignoreDimensions,
    _ref$parentSizeStyles = _ref.parentSizeStyles,
    parentSizeStyles = _ref$parentSizeStyles === void 0 ? defaultParentSizeStyles : _ref$parentSizeStyles,
    _ref$enableDebounceLe = _ref.enableDebounceLeadingCall,
    enableDebounceLeadingCall = _ref$enableDebounceLe === void 0 ? true : _ref$enableDebounceLe,
    resizeObserverPolyfill = _ref.resizeObserverPolyfill,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var target = useRef(null);
  var animationFrameID = useRef(0);
  var _useState = useState({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }),
    state = _useState[0],
    setState = _useState[1];
  var resize = useMemo(function () {
    var normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];
    return debounce(function (incoming) {
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
  useEffect(function () {
    var LocalResizeObserver = resizeObserverPolyfill || window.ResizeObserver;
    var observer = new LocalResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var _entry$contentRect;
        var _ref2 = (_entry$contentRect = entry == null ? void 0 : entry.contentRect) != null ? _entry$contentRect : {},
          left = _ref2.left,
          top = _ref2.top,
          width = _ref2.width,
          height = _ref2.height;
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
  }, [resize, resizeObserverPolyfill]);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: parentSizeStyles,
    ref: target,
    className: className
  }, restProps), children(_extends({}, state, {
    ref: target.current,
    resize: resize
  })));
}
ParentSize.propTypes = {
  className: _pt.string,
  debounceTime: _pt.number,
  enableDebounceLeadingCall: _pt.bool,
  ignoreDimensions: _pt.oneOfType([_pt.any, _pt.arrayOf(_pt.any)]),
  children: _pt.func.isRequired
};