var _excluded = ["verticalAnchor", "scaleToFit", "angle", "width", "lineHeight", "capHeight", "children", "style"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { useMemo } from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import getStringWidth from '../util/getStringWidth';
function isNumber(val) {
  return typeof val === 'number';
}
function isXOrYInValid(xOrY) {
  return (
    // number that is not NaN or Infinity
    typeof xOrY === 'number' && Number.isFinite(xOrY) ||
    // for percentage
    typeof xOrY === 'string'
  );
}
export default function useText(props) {
  var _props$verticalAnchor = props.verticalAnchor,
    verticalAnchor = _props$verticalAnchor === void 0 ? 'end' : _props$verticalAnchor,
    _props$scaleToFit = props.scaleToFit,
    scaleToFit = _props$scaleToFit === void 0 ? false : _props$scaleToFit,
    angle = props.angle,
    width = props.width,
    _props$lineHeight = props.lineHeight,
    lineHeight = _props$lineHeight === void 0 ? '1em' : _props$lineHeight,
    _props$capHeight = props.capHeight,
    capHeight = _props$capHeight === void 0 ? '0.71em' : _props$capHeight,
    children = props.children,
    style = props.style,
    textProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _textProps$x = textProps.x,
    x = _textProps$x === void 0 ? 0 : _textProps$x,
    _textProps$y = textProps.y,
    y = _textProps$y === void 0 ? 0 : _textProps$y;
  var isXOrYNotValid = !isXOrYInValid(x) || !isXOrYInValid(y);
  var _useMemo = useMemo(function () {
      var words = children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/);
      return {
        wordsWithWidth: words.map(function (word) {
          return {
            word: word,
            wordWidth: getStringWidth(word, style) || 0
          };
        }),
        spaceWidth: getStringWidth("\xA0", style) || 0
      };
    }, [children, style]),
    wordsWithWidth = _useMemo.wordsWithWidth,
    spaceWidth = _useMemo.spaceWidth;
  var wordsByLines = useMemo(function () {
    if (isXOrYNotValid) {
      return [];
    }

    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (width || scaleToFit) {
      return wordsWithWidth.reduce(function (result, _ref) {
        var word = _ref.word,
          wordWidth = _ref.wordWidth;
        var currentLine = result[result.length - 1];
        if (currentLine && (width == null || scaleToFit || (currentLine.width || 0) + wordWidth + spaceWidth < width)) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width = currentLine.width || 0;
          currentLine.width += wordWidth + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          var newLine = {
            words: [word],
            width: wordWidth
          };
          result.push(newLine);
        }
        return result;
      }, []);
    }
    return [{
      words: children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/)
    }];
  }, [isXOrYNotValid, width, scaleToFit, children, wordsWithWidth, spaceWidth]);
  var startDy = useMemo(function () {
    var startDyStr = isXOrYNotValid ? '' : verticalAnchor === 'start' ? reduceCSSCalc("calc(" + capHeight + ")") : verticalAnchor === 'middle' ? reduceCSSCalc("calc(" + (wordsByLines.length - 1) / 2 + " * -" + lineHeight + " + (" + capHeight + " / 2))") : reduceCSSCalc("calc(" + (wordsByLines.length - 1) + " * -" + lineHeight + ")");
    return startDyStr;
  }, [isXOrYNotValid, verticalAnchor, capHeight, wordsByLines.length, lineHeight]);
  var transform = useMemo(function () {
    var transforms = [];
    if (isXOrYNotValid) {
      return '';
    }
    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      var lineWidth = wordsByLines[0].width || 1;
      var sx = scaleToFit === 'shrink-only' ? Math.min(width / lineWidth, 1) : width / lineWidth;
      var sy = sx;
      var originX = x - sx * x;
      var originY = y - sy * y;
      transforms.push("matrix(" + sx + ", 0, 0, " + sy + ", " + originX + ", " + originY + ")");
    }
    if (angle) {
      transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
    }
    return transforms.length > 0 ? transforms.join(' ') : '';
  }, [isXOrYNotValid, x, y, width, scaleToFit, wordsByLines, angle]);
  return {
    wordsByLines: wordsByLines,
    startDy: startDy,
    transform: transform
  };
}