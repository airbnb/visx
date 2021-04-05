import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/jsx-handler-names */
import React, { useCallback, useRef } from 'react';
import useDrag from '@visx/drag/lib/useDrag';
import Annotation from './Annotation';
var defaultDragHandleProps = {
  r: 10,
  fill: 'transparent',
  stroke: '#777',
  strokeDasharray: '4,2',
  strokeWidth: 2
};
export default function EditableAnnotation(_ref) {
  var _ref$canEditLabel = _ref.canEditLabel,
      canEditLabel = _ref$canEditLabel === void 0 ? true : _ref$canEditLabel,
      _ref$canEditSubject = _ref.canEditSubject,
      canEditSubject = _ref$canEditSubject === void 0 ? true : _ref$canEditSubject,
      children = _ref.children,
      _ref$dx = _ref.dx,
      labelDx = _ref$dx === void 0 ? 0 : _ref$dx,
      _ref$dy = _ref.dy,
      labelDy = _ref$dy === void 0 ? 0 : _ref$dy,
      height = _ref.height,
      labelDragHandleProps = _ref.labelDragHandleProps,
      onDragEnd = _ref.onDragEnd,
      onDragMove = _ref.onDragMove,
      onDragStart = _ref.onDragStart,
      subjectDragHandleProps = _ref.subjectDragHandleProps,
      width = _ref.width,
      _ref$x = _ref.x,
      subjectX = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      subjectY = _ref$y === void 0 ? 0 : _ref$y;
  // chicken before the egg, we need these to reference drag state
  // in drag callbacks which are defined before useDrag() state is available
  var subjectDragRef = useRef();
  var labelDragRef = useRef();
  var handleDragStart = useCallback(function (_ref2) {
    var event = _ref2.event;

    if (onDragStart) {
      var _subjectDragRef$curre, _subjectDragRef$curre2, _subjectDragRef$curre3, _subjectDragRef$curre4, _labelDragRef$current, _labelDragRef$current2, _labelDragRef$current3, _labelDragRef$current4;

      onDragStart({
        event: event,
        x: subjectX + ((_subjectDragRef$curre = (_subjectDragRef$curre2 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre2.dx) != null ? _subjectDragRef$curre : 0),
        y: subjectY + ((_subjectDragRef$curre3 = (_subjectDragRef$curre4 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre4.dy) != null ? _subjectDragRef$curre3 : 0),
        dx: labelDx + ((_labelDragRef$current = (_labelDragRef$current2 = labelDragRef.current) == null ? void 0 : _labelDragRef$current2.dx) != null ? _labelDragRef$current : 0),
        dy: labelDy + ((_labelDragRef$current3 = (_labelDragRef$current4 = labelDragRef.current) == null ? void 0 : _labelDragRef$current4.dy) != null ? _labelDragRef$current3 : 0)
      });
    }
  }, [labelDx, labelDy, onDragStart, subjectX, subjectY]);
  var handleDragMove = useCallback(function (_ref3) {
    var event = _ref3.event;

    if (onDragMove) {
      var _subjectDragRef$curre5, _subjectDragRef$curre6, _subjectDragRef$curre7, _subjectDragRef$curre8, _labelDragRef$current5, _labelDragRef$current6, _labelDragRef$current7, _labelDragRef$current8;

      onDragMove({
        event: event,
        x: subjectX + ((_subjectDragRef$curre5 = (_subjectDragRef$curre6 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre6.dx) != null ? _subjectDragRef$curre5 : 0),
        y: subjectY + ((_subjectDragRef$curre7 = (_subjectDragRef$curre8 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre8.dy) != null ? _subjectDragRef$curre7 : 0),
        dx: labelDx + ((_labelDragRef$current5 = (_labelDragRef$current6 = labelDragRef.current) == null ? void 0 : _labelDragRef$current6.dx) != null ? _labelDragRef$current5 : 0),
        dy: labelDy + ((_labelDragRef$current7 = (_labelDragRef$current8 = labelDragRef.current) == null ? void 0 : _labelDragRef$current8.dy) != null ? _labelDragRef$current7 : 0)
      });
    }
  }, [labelDx, labelDy, onDragMove, subjectX, subjectY]);
  var handleDragEnd = useCallback(function (_ref4) {
    var event = _ref4.event;

    if (onDragEnd) {
      var _subjectDragRef$curre9, _subjectDragRef$curre10, _subjectDragRef$curre11, _subjectDragRef$curre12, _labelDragRef$current9, _labelDragRef$current10, _labelDragRef$current11, _labelDragRef$current12;

      onDragEnd({
        event: event,
        x: subjectX + ((_subjectDragRef$curre9 = (_subjectDragRef$curre10 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre10.dx) != null ? _subjectDragRef$curre9 : 0),
        y: subjectY + ((_subjectDragRef$curre11 = (_subjectDragRef$curre12 = subjectDragRef.current) == null ? void 0 : _subjectDragRef$curre12.dy) != null ? _subjectDragRef$curre11 : 0),
        dx: labelDx + ((_labelDragRef$current9 = (_labelDragRef$current10 = labelDragRef.current) == null ? void 0 : _labelDragRef$current10.dx) != null ? _labelDragRef$current9 : 0),
        dy: labelDy + ((_labelDragRef$current11 = (_labelDragRef$current12 = labelDragRef.current) == null ? void 0 : _labelDragRef$current12.dy) != null ? _labelDragRef$current11 : 0)
      });
    }
  }, [labelDx, labelDy, onDragEnd, subjectX, subjectY]);
  var subjectDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
    x: subjectX,
    y: subjectY
  });
  var labelDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
    x: labelDx,
    y: labelDy
  }); // enable referencing these in the callbacks defined before useDrag is called

  subjectDragRef.current = subjectDrag;
  labelDragRef.current = labelDrag;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Annotation, {
    x: subjectX + subjectDrag.dx,
    y: subjectY + subjectDrag.dy,
    dx: labelDx + labelDrag.dx,
    dy: labelDy + labelDrag.dy
  }, children), subjectDrag.isDragging && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    onMouseMove: subjectDrag.dragMove,
    onMouseUp: subjectDrag.dragEnd,
    fill: "transparent"
  }), canEditSubject && /*#__PURE__*/React.createElement("circle", _extends({
    cx: subjectX,
    cy: subjectY,
    transform: "translate(" + subjectDrag.dx + "," + subjectDrag.dy + ")",
    onMouseMove: subjectDrag.dragMove,
    onMouseUp: subjectDrag.dragEnd,
    onMouseDown: subjectDrag.dragStart,
    onTouchStart: subjectDrag.dragStart,
    onTouchMove: subjectDrag.dragMove,
    onTouchEnd: subjectDrag.dragEnd,
    cursor: subjectDrag.isDragging ? 'grabbing' : 'grab'
  }, defaultDragHandleProps, subjectDragHandleProps)), labelDrag.isDragging && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    onMouseMove: labelDrag.dragMove,
    onMouseUp: labelDrag.dragEnd,
    fill: "transparent"
  }), canEditLabel && /*#__PURE__*/React.createElement("circle", _extends({
    cx: subjectX + subjectDrag.dx + labelDx,
    cy: subjectY + subjectDrag.dy + labelDy,
    transform: "translate(" + labelDrag.dx + "," + labelDrag.dy + ")",
    onMouseMove: labelDrag.dragMove,
    onMouseUp: labelDrag.dragEnd,
    onMouseDown: labelDrag.dragStart,
    onTouchStart: labelDrag.dragStart,
    onTouchMove: labelDrag.dragMove,
    onTouchEnd: labelDrag.dragEnd,
    cursor: labelDrag.isDragging ? 'grabbing' : 'grab'
  }, defaultDragHandleProps, labelDragHandleProps)));
}
EditableAnnotation.propTypes = {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  children: _pt.node.isRequired,
  canEditLabel: _pt.bool,
  canEditSubject: _pt.bool,
  onDragStart: _pt.func,
  onDragMove: _pt.func,
  onDragEnd: _pt.func
};