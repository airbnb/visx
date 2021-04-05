"use strict";

exports.__esModule = true;
exports.default = raise;

/** Given at an array of items, moves the item at the specified index to the end of the array. */
function raise(items, raiseIndex) {
  var array = [].concat(items);
  var lastIndex = array.length - 1;

  var _array$splice = array.splice(raiseIndex, 1),
      raiseItem = _array$splice[0];

  array.splice(lastIndex, 0, raiseItem);
  return array;
}