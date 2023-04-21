"use strict";

exports.__esModule = true;
exports.default = useStackedData;
var _react = require("react");
var _d3Shape = require("d3-shape");
var _stackOffset = _interopRequireDefault(require("@visx/shape/lib/util/stackOffset"));
var _stackOrder = _interopRequireDefault(require("@visx/shape/lib/util/stackOrder"));
var _d3Array = require("d3-array");
var _DataContext = _interopRequireDefault(require("../context/DataContext"));
var _getBarStackRegistryData = _interopRequireDefault(require("../utils/getBarStackRegistryData"));
var _combineBarStackData = _interopRequireDefault(require("../utils/combineBarStackData"));
var _getChildrenAndGrandchildrenWithProps = _interopRequireDefault(require("../utils/getChildrenAndGrandchildrenWithProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useStackedData(_ref) {
  var children = _ref.children,
    order = _ref.order,
    offset = _ref.offset;
  var _ref2 = (0, _react.useContext)(_DataContext.default),
    horizontal = _ref2.horizontal,
    registerData = _ref2.registerData,
    unregisterData = _ref2.unregisterData;

  // find series children
  // @TODO: memoization doesn't work well if at all for this
  var seriesChildren = (0, _react.useMemo)(function () {
    return (0, _getChildrenAndGrandchildrenWithProps.default)(children);
  }, [children]);

  // extract data keys from child series
  var dataKeys = (0, _react.useMemo)(function () {
    return seriesChildren.filter(function (child) {
      return child.props.dataKey;
    }).map(function (child) {
      return child.props.dataKey;
    });
  }, [seriesChildren]);

  // group all child data by stack value { [x | y]: { [dataKey]: value } }
  // this format is needed by d3Stack
  var combinedData = (0, _react.useMemo)(function () {
    return (0, _combineBarStackData.default)(seriesChildren, horizontal);
  }, [horizontal, seriesChildren]);

  // stack data
  var stackedData = (0, _react.useMemo)(function () {
    // automatically set offset to diverging if it's undefined and negative values are present
    var hasSomeNegativeValues = offset ? null : combinedData.some(function (d) {
      return d.negativeSum < 0;
    });
    var stack = (0, _d3Shape.stack)();
    stack.keys(dataKeys);
    if (order) stack.order((0, _stackOrder.default)(order));
    if (offset || hasSomeNegativeValues) stack.offset((0, _stackOffset.default)(offset || 'diverging'));
    return stack(combinedData);
  }, [combinedData, dataKeys, order, offset]);

  // update the domain to account for the (directional) stacked value
  var comprehensiveDomain = (0, _react.useMemo)(function () {
    return (0, _d3Array.extent)(stackedData.reduce(function (allDatum, stack) {
      stack.forEach(function (_ref3) {
        var min = _ref3[0],
          max = _ref3[1];
        allDatum.push(min);
        allDatum.push(max);
      });
      return allDatum;
    }, []));
  }, [stackedData]);

  // register all child data using the stack-transformed values
  (0, _react.useEffect)(function () {
    var dataToRegister = (0, _getBarStackRegistryData.default)(stackedData, comprehensiveDomain, horizontal);
    registerData(dataToRegister);

    // unregister data on unmount
    return function () {
      return unregisterData(dataKeys);
    };
  }, [dataKeys, comprehensiveDomain, horizontal, stackedData, registerData, unregisterData, seriesChildren]);
  return {
    seriesChildren: seriesChildren,
    dataKeys: dataKeys,
    stackedData: stackedData
  };
}