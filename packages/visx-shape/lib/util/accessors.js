"use strict";

exports.__esModule = true;
exports.getX = getX;
exports.getY = getY;
exports.getSource = getSource;
exports.getTarget = getTarget;
exports.getFirstItem = getFirstItem;
exports.getSecondItem = getSecondItem;

function getX(l) {
  return typeof (l == null ? void 0 : l.x) === 'number' ? l == null ? void 0 : l.x : 0;
}

function getY(l) {
  return typeof (l == null ? void 0 : l.y) === 'number' ? l == null ? void 0 : l.y : 0;
}

function getSource(l) {
  return l == null ? void 0 : l.source;
}

function getTarget(l) {
  return l == null ? void 0 : l.target;
}

function getFirstItem(d) {
  return d == null ? void 0 : d[0];
}

function getSecondItem(d) {
  return d == null ? void 0 : d[1];
}