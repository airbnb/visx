'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Shape = require('d3-shape');

exports.default = {
  basis: _d3Shape.curveBasis,
  basisClose: _d3Shape.curveBasisClosed,
  basisOpen: _d3Shape.curveBasisOpen,
  step: _d3Shape.curveStep,
  stepAfter: _d3Shape.curveStepAfter,
  stepBefore: _d3Shape.curveStepbefore,
  bundle: _d3Shape.curveBundle,
  linear: _d3Shape.curveLinear,
  linearClosed: _d3Shape.curveLinearClosed,
  monotoneX: _d3Shape.curveMonotoneX,
  monotoneY: _d3Shape.curveMonotoneY,
  cardinal: _d3Shape.curveCardinal,
  cardinalClosed: _d3Shape.curveCardinalClosed,
  cardinalOpen: _d3Shape.curveCardinalOpen,
  catmullRom: _d3Shape.curveCatmullRom,
  catmullRomClosed: _d3Shape.curveCatmullRomClosed,
  catmullRomOpen: _d3Shape.curveCatmullRomOpen,
  natural: _d3Shape.curveNatural
};