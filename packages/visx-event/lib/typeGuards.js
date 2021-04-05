"use strict";

exports.__esModule = true;
exports.isElement = isElement;
exports.isSVGElement = isSVGElement;
exports.isSVGSVGElement = isSVGSVGElement;
exports.isSVGGraphicsElement = isSVGGraphicsElement;
exports.isTouchEvent = isTouchEvent;
exports.isMouseEvent = isMouseEvent;
exports.isEvent = isEvent;

function isElement(elem) {
  return !!elem && elem instanceof Element;
} // functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements


function isSVGElement(elem) {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
} // functional definition of SVGGElement


function isSVGSVGElement(elem) {
  return !!elem && 'createSVGPoint' in elem;
}

function isSVGGraphicsElement(elem) {
  return !!elem && 'getScreenCTM' in elem;
} // functional definition of TouchEvent


function isTouchEvent(event) {
  return !!event && 'changedTouches' in event;
} // functional definition of MouseEvent


function isMouseEvent(event) {
  return !!event && 'clientX' in event;
} // functional definition of event


function isEvent(event) {
  return !!event && (event instanceof Event || 'nativeEvent' in event && event.nativeEvent instanceof Event);
}