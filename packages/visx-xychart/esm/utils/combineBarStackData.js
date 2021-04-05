/** Returns the value which forms a stack group. */
export var getStackValue = function getStackValue(d) {
  return d.stack;
};
/**
 * Merges `seriesChildren` `props.data` by their `stack` value which
 * forms the stack grouping (`x` if vertical, `y` if horizontal)
 * and returns `CombinedStackData[]`.
 */

export default function combineBarStackData(seriesChildren, horizontal) {
  var dataByStackValue = {};
  seriesChildren.forEach(function (child) {
    var _child$props = child.props,
        dataKey = _child$props.dataKey,
        data = _child$props.data,
        xAccessor = _child$props.xAccessor,
        yAccessor = _child$props.yAccessor; // this should exist but double check

    if (!xAccessor || !yAccessor) return;

    var _ref = horizontal ? [yAccessor, xAccessor] : [xAccessor, yAccessor],
        stackFn = _ref[0],
        valueFn = _ref[1];

    data.forEach(function (d) {
      var stack = stackFn(d);
      var numericValue = valueFn(d);
      var stackKey = String(stack);

      if (!dataByStackValue[stackKey]) {
        dataByStackValue[stackKey] = {
          stack: stack,
          positiveSum: 0,
          negativeSum: 0
        };
      }

      dataByStackValue[stackKey][dataKey] = numericValue;
      dataByStackValue[stackKey][numericValue >= 0 ? 'positiveSum' : 'negativeSum'] += numericValue;
    });
  });
  return Object.values(dataByStackValue);
}