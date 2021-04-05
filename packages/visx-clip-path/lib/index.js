"use strict";

exports.__esModule = true;
exports.RectClipPath = exports.CircleClipPath = exports.ClipPath = void 0;

var _ClipPath = _interopRequireDefault(require("./clip-paths/ClipPath"));

exports.ClipPath = _ClipPath.default;

var _CircleClipPath = _interopRequireDefault(require("./clip-paths/CircleClipPath"));

exports.CircleClipPath = _CircleClipPath.default;

var _RectClipPath = _interopRequireDefault(require("./clip-paths/RectClipPath"));

exports.RectClipPath = _RectClipPath.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }