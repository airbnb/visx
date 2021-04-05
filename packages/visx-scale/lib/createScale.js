"use strict";

exports.__esModule = true;
exports.default = void 0;

var _linear = _interopRequireDefault(require("./scales/linear"));

var _log = _interopRequireDefault(require("./scales/log"));

var _power = _interopRequireDefault(require("./scales/power"));

var _squareRoot = _interopRequireDefault(require("./scales/squareRoot"));

var _symlog = _interopRequireDefault(require("./scales/symlog"));

var _time = _interopRequireDefault(require("./scales/time"));

var _utc = _interopRequireDefault(require("./scales/utc"));

var _quantile = _interopRequireDefault(require("./scales/quantile"));

var _quantize = _interopRequireDefault(require("./scales/quantize"));

var _threshold = _interopRequireDefault(require("./scales/threshold"));

var _ordinal = _interopRequireDefault(require("./scales/ordinal"));

var _point = _interopRequireDefault(require("./scales/point"));

var _band = _interopRequireDefault(require("./scales/band"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Actual implementation
function createScale(config) {
  if (typeof config !== 'undefined' && 'type' in config) {
    switch (config.type) {
      case 'linear':
        return (0, _linear.default)(config);

      case 'log':
        return (0, _log.default)(config);

      case 'pow':
        return (0, _power.default)(config);

      case 'sqrt':
        return (0, _squareRoot.default)(config);

      case 'symlog':
        return (0, _symlog.default)(config);

      case 'time':
        return (0, _time.default)(config);

      case 'utc':
        return (0, _utc.default)(config);

      case 'quantile':
        return (0, _quantile.default)(config);

      case 'quantize':
        return (0, _quantize.default)(config);

      case 'threshold':
        return (0, _threshold.default)(config);

      case 'ordinal':
        return (0, _ordinal.default)(config);

      case 'point':
        return (0, _point.default)(config);

      case 'band':
        return (0, _band.default)(config);

      default:
    }
  } // If type is not specified, fallback to linear scale


  return (0, _linear.default)(config);
}

var _default = createScale;
exports.default = _default;