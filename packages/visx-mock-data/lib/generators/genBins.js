"use strict";

exports.__esModule = true;
exports.default = genBins;

var _genBin = _interopRequireDefault(require("./genBin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genBins(length, height, bin, count) {
  return new Array(length).fill(1).reduce(function (arr, _, i) {
    return arr.concat([{
      bin: i,
      bins: (0, _genBin.default)(height, bin, count)
    }]);
  }, []);
}