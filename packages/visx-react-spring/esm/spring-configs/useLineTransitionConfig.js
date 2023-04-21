import { useMemo } from 'react';
import { coerceNumber } from '@visx/scale';
function animatedValue(animationTrajectory, positionOnScale, scaleMin, scaleMax, scaleHalfwayPoint) {
  var _ref;
  switch (animationTrajectory) {
    case 'center':
      return scaleHalfwayPoint;
    case 'min':
      return scaleMin != null ? scaleMin : 0;
    case 'max':
      return scaleMax != null ? scaleMax : 0;
    case 'outside':
    default:
      return (_ref = (positionOnScale != null ? positionOnScale : 0) < scaleHalfwayPoint ? scaleMin : scaleMax) != null ? _ref : 0;
  }
}
function enterUpdate(_ref2) {
  var from = _ref2.from,
    to = _ref2.to;
  return {
    fromX: from.x,
    toX: to.x,
    fromY: from.y,
    toY: to.y,
    opacity: 1
  };
}
/**
 * A hook that returns `react-spring` transition config for animating a Line
 * horizontally, vertically, and from a specific starting point.
 */
export default function useLineTransitionConfig(_ref3) {
  var scale = _ref3.scale,
    animateXOrY = _ref3.animateXOrY,
    _ref3$animationTrajec = _ref3.animationTrajectory,
    initAnimationTrajectory = _ref3$animationTrajec === void 0 ? 'outside' : _ref3$animationTrajec;
  var shouldAnimateX = animateXOrY === 'x';
  return useMemo(function () {
    var _scale$range$map = scale.range().map(coerceNumber),
      a = _scale$range$map[0],
      b = _scale$range$map[1];
    var isDescending = b != null && a != null && b < a;
    var _ref4 = isDescending ? [b, a] : [a, b],
      scaleMin = _ref4[0],
      scaleMax = _ref4[1];
    var scaleLength = b != null && a != null ? Math.abs(b - a) : 0;
    var scaleHalfwayPoint = (scaleMin != null ? scaleMin : 0) + scaleLength / 2;
    var animationTrajectory = initAnimationTrajectory;

    // correct direction for y-axis which is inverted due to svg coords
    if (!shouldAnimateX && initAnimationTrajectory === 'min') animationTrajectory = 'max';
    if (!shouldAnimateX && initAnimationTrajectory === 'max') animationTrajectory = 'min';
    var fromLeave = function fromLeave(_ref5) {
      var from = _ref5.from,
        to = _ref5.to;
      return {
        fromX: shouldAnimateX ? animatedValue(animationTrajectory, from.x, scaleMin, scaleMax, scaleHalfwayPoint) : from.x,
        toX: shouldAnimateX ? animatedValue(animationTrajectory, from.x, scaleMin, scaleMax, scaleHalfwayPoint) : to.x,
        fromY: shouldAnimateX ? from.y : animatedValue(animationTrajectory, from.y, scaleMin, scaleMax, scaleHalfwayPoint),
        toY: shouldAnimateX ? to.y : animatedValue(animationTrajectory, from.y, scaleMin, scaleMax, scaleHalfwayPoint),
        opacity: 0
      };
    };
    return {
      from: fromLeave,
      leave: fromLeave,
      enter: enterUpdate,
      update: enterUpdate
    };
  }, [scale, shouldAnimateX, initAnimationTrajectory]);
}