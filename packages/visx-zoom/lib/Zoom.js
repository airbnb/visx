"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _event = require("@visx/event");

var _matrix = require("./util/matrix");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Zoom = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Zoom, _React$Component);

  function Zoom() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "containerRef", null);

    _defineProperty(_assertThisInitialized(_this), "startPoint", undefined);

    _defineProperty(_assertThisInitialized(_this), "startTranslate", undefined);

    _defineProperty(_assertThisInitialized(_this), "state", {
      initialTransformMatrix: _this.props.transformMatrix,
      transformMatrix: _this.props.transformMatrix,
      isDragging: false
    });

    _defineProperty(_assertThisInitialized(_this), "applyToPoint", function (_ref) {
      var x = _ref.x,
          y = _ref.y;
      var transformMatrix = _this.state.transformMatrix;
      return (0, _matrix.applyMatrixToPoint)(transformMatrix, {
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyInverseToPoint", function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var transformMatrix = _this.state.transformMatrix;
      return (0, _matrix.applyInverseMatrixToPoint)(transformMatrix, {
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      var initialTransformMatrix = _this.state.initialTransformMatrix;

      _this.setTransformMatrix(initialTransformMatrix);
    });

    _defineProperty(_assertThisInitialized(_this), "scale", function (_ref3) {
      var scaleX = _ref3.scaleX,
          maybeScaleY = _ref3.scaleY,
          point = _ref3.point;
      var scaleY = maybeScaleY || scaleX;
      var transformMatrix = _this.state.transformMatrix;
      var _this$props = _this.props,
          width = _this$props.width,
          height = _this$props.height;
      var cleanPoint = point || {
        x: width / 2,
        y: height / 2
      };
      var translate = (0, _matrix.applyInverseMatrixToPoint)(transformMatrix, cleanPoint);
      var nextMatrix = (0, _matrix.composeMatrices)(transformMatrix, (0, _matrix.translateMatrix)(translate.x, translate.y), (0, _matrix.scaleMatrix)(scaleX, scaleY), (0, _matrix.translateMatrix)(-translate.x, -translate.y));

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty(_assertThisInitialized(_this), "translate", function (_ref4) {
      var translateX = _ref4.translateX,
          translateY = _ref4.translateY;
      var transformMatrix = _this.state.transformMatrix;
      var nextMatrix = (0, _matrix.composeMatrices)(transformMatrix, (0, _matrix.translateMatrix)(translateX, translateY));

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty(_assertThisInitialized(_this), "translateTo", function (_ref5) {
      var x = _ref5.x,
          y = _ref5.y;
      var transformMatrix = _this.state.transformMatrix;
      var point = (0, _matrix.applyInverseMatrixToPoint)(transformMatrix, {
        x: x,
        y: y
      });

      _this.setTranslate({
        translateX: point.x,
        translateY: point.y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setTranslate", function (_ref6) {
      var translateX = _ref6.translateX,
          translateY = _ref6.translateY;
      var transformMatrix = _this.state.transformMatrix;

      var nextMatrix = _extends({}, transformMatrix, {
        translateX: translateX,
        translateY: translateY
      });

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty(_assertThisInitialized(_this), "setTransformMatrix", function (transformMatrix) {
      _this.setState(function (prevState) {
        return {
          transformMatrix: _this.constrain(transformMatrix, prevState.transformMatrix)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "invert", function () {
      return (0, _matrix.inverseMatrix)(_this.state.transformMatrix);
    });

    _defineProperty(_assertThisInitialized(_this), "toStringInvert", function () {
      var _this$invert = _this.invert(),
          translateX = _this$invert.translateX,
          translateY = _this$invert.translateY,
          scaleX = _this$invert.scaleX,
          scaleY = _this$invert.scaleY,
          skewX = _this$invert.skewX,
          skewY = _this$invert.skewY;

      return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
    });

    _defineProperty(_assertThisInitialized(_this), "constrain", function (transformMatrix, prevTransformMatrix) {
      if (_this.props.constrain) return _this.props.constrain(transformMatrix, prevTransformMatrix);
      var _this$props2 = _this.props,
          scaleXMin = _this$props2.scaleXMin,
          scaleXMax = _this$props2.scaleXMax,
          scaleYMin = _this$props2.scaleYMin,
          scaleYMax = _this$props2.scaleYMax;
      var scaleX = transformMatrix.scaleX,
          scaleY = transformMatrix.scaleY;
      var shouldConstrainScaleX = scaleX > scaleXMax || scaleX < scaleXMin;
      var shouldConstrainScaleY = scaleY > scaleYMax || scaleY < scaleYMin;

      if (shouldConstrainScaleX || shouldConstrainScaleY) {
        return prevTransformMatrix;
      }

      return transformMatrix;
    });

    _defineProperty(_assertThisInitialized(_this), "dragStart", function (event) {
      var transformMatrix = _this.state.transformMatrix;
      var translateX = transformMatrix.translateX,
          translateY = transformMatrix.translateY;
      _this.startPoint = (0, _event.localPoint)(event) || undefined;
      _this.startTranslate = {
        translateX: translateX,
        translateY: translateY
      };

      _this.setState({
        isDragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dragMove", function (event) {
      if (!_this.state.isDragging || !_this.startPoint || !_this.startTranslate) return;
      var currentPoint = (0, _event.localPoint)(event);
      var dx = currentPoint ? -(_this.startPoint.x - currentPoint.x) : -_this.startPoint.x;
      var dy = currentPoint ? -(_this.startPoint.y - currentPoint.y) : -_this.startPoint.y;

      _this.setTranslate({
        translateX: _this.startTranslate.translateX + dx,
        translateY: _this.startTranslate.translateY + dy
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dragEnd", function () {
      _this.startPoint = undefined;
      _this.startTranslate = undefined;

      _this.setState({
        isDragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleWheel", function (event) {
      var _this$props3 = _this.props,
          passive = _this$props3.passive,
          wheelDelta = _this$props3.wheelDelta;
      if (!passive) event.preventDefault();
      var point = (0, _event.localPoint)(event) || undefined;

      var _ref7 = wheelDelta(event),
          scaleX = _ref7.scaleX,
          scaleY = _ref7.scaleY;

      _this.scale({
        scaleX: scaleX,
        scaleY: scaleY,
        point: point
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toString", function () {
      var transformMatrix = _this.state.transformMatrix;
      var translateX = transformMatrix.translateX,
          translateY = transformMatrix.translateY,
          scaleX = transformMatrix.scaleX,
          scaleY = transformMatrix.scaleY,
          skewX = transformMatrix.skewX,
          skewY = transformMatrix.skewY;
      return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
    });

    _defineProperty(_assertThisInitialized(_this), "center", function () {
      var _this$props4 = _this.props,
          width = _this$props4.width,
          height = _this$props4.height;
      var center = {
        x: width / 2,
        y: height / 2
      };

      var inverseCentroid = _this.applyInverseToPoint(center);

      _this.translate({
        translateX: inverseCentroid.x - center.x,
        translateY: inverseCentroid.y - center.y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this.setTransformMatrix((0, _matrix.identityMatrix)());
    });

    return _this;
  }

  var _proto = Zoom.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var passive = this.props.passive;

    if (this.containerRef && !passive) {
      this.containerRef.addEventListener('wheel', this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var passive = this.props.passive;

    if (this.containerRef && !passive) {
      this.containerRef.removeEventListener('wheel', this.handleWheel);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        passive = _this$props5.passive,
        children = _this$props5.children,
        style = _this$props5.style,
        className = _this$props5.className;

    var zoom = _extends({}, this.state, {
      center: this.center,
      clear: this.clear,
      scale: this.scale,
      translate: this.translate,
      translateTo: this.translateTo,
      setTranslate: this.setTranslate,
      setTransformMatrix: this.setTransformMatrix,
      reset: this.reset,
      handleWheel: this.handleWheel,
      dragEnd: this.dragEnd,
      dragMove: this.dragMove,
      dragStart: this.dragStart,
      toString: this.toString,
      invert: this.invert,
      toStringInvert: this.toStringInvert,
      applyToPoint: this.applyToPoint,
      applyInverseToPoint: this.applyInverseToPoint
    });

    if (!passive) {
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(c) {
          _this2.containerRef = c;
        },
        style: style,
        className: className
      }, children(zoom));
    }

    return children(zoom);
  };

  return Zoom;
}(_react.default.Component);

_defineProperty(Zoom, "propTypes", {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  wheelDelta: _propTypes.default.func,
  scaleXMin: _propTypes.default.number,
  scaleXMax: _propTypes.default.number,
  scaleYMin: _propTypes.default.number,
  scaleYMax: _propTypes.default.number,
  constrain: _propTypes.default.func,
  passive: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.func.isRequired
});

_defineProperty(Zoom, "defaultProps", {
  passive: false,
  scaleXMin: 0,
  scaleXMax: Infinity,
  scaleYMin: 0,
  scaleYMax: Infinity,
  transformMatrix: {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  },
  wheelDelta: function wheelDelta(event) {
    return -event.deltaY > 0 ? {
      scaleX: 1.1,
      scaleY: 1.1
    } : {
      scaleX: 0.9,
      scaleY: 0.9
    };
  },
  style: undefined,
  className: undefined
});

var _default = Zoom;
exports.default = _default;