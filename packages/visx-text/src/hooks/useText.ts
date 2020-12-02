import { useMemo } from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import { TextProps, WordsWithWidth } from '../types';
import getStringWidth from '../util/getStringWidth';

function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export default function useText(
  props: TextProps,
): {
  wordsByLines: WordsWithWidth[];
  startDy: string;
  transform: string;
} {
  const {
    verticalAnchor = 'end',
    scaleToFit = false,
    angle,
    width,
    lineHeight = '1em',
    capHeight = '0.71em', // Magic number from d3
    children,
    style,
    ...textProps
  } = props;

  const { x = 0, y = 0 } = textProps;

  const { wordsWithWidth, spaceWidth } = useMemo(() => {
    const words: string[] = children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/);
    return {
      wordsWithWidth: words.map(word => ({
        word,
        wordWidth: getStringWidth(word, style) || 0,
      })),
      spaceWidth: getStringWidth('\u00A0', style) || 0,
    };
  }, [children, style]);

  const wordsByLines = useMemo(() => {
    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (width || scaleToFit) {
      return wordsWithWidth.reduce((result: WordsWithWidth[], { word, wordWidth }) => {
        const currentLine = result[result.length - 1];

        if (
          currentLine &&
          (width == null || scaleToFit || (currentLine.width || 0) + wordWidth + spaceWidth < width)
        ) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width = currentLine.width || 0;
          currentLine.width += wordWidth + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          const newLine = { words: [word], width: wordWidth };
          result.push(newLine);
        }

        return result;
      }, []);
    }

    return [
      {
        words: children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/),
      },
    ];
  }, [width, scaleToFit, children, wordsWithWidth, spaceWidth]);

  const startDy = useMemo(() => {
    const startDyStr =
      verticalAnchor === 'start'
        ? reduceCSSCalc(`calc(${capHeight})`)
        : verticalAnchor === 'middle'
        ? reduceCSSCalc(
            `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`,
          )
        : reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);

    return startDyStr;
  }, [verticalAnchor, capHeight, wordsByLines, lineHeight]);

  const transform = useMemo(() => {
    const transforms: string[] = [];
    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      const lineWidth = wordsByLines[0].width || 1;
      const sx = width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }
    if (angle) {
      transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }

    return transforms.length > 0 ? transforms.join(' ') : '';
  }, [x, y, width, wordsByLines, angle, scaleToFit]);

  return { wordsByLines, startDy, transform };
}
