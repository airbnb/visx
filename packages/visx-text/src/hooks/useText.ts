import { useEffect, useState, useRef, useCallback } from 'react';
import reduceCSSCalc from 'reduce-css-calc';
import { usePreviousValue } from '@huse/previous-value';
import { TextProps, WordsWithWidth, WordWithWidth } from '../types';
import getStringWidth from '../util/getStringWidth';

function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function useText(props: TextProps): [WordsWithWidth[], string, string] {
  const [wordsByLines, setWordsByLines] = useState<WordsWithWidth[]>([]);
  const wordsWithWidth = useRef<WordWithWidth[]>([]);
  const spaceWidth = useRef(0);
  const prevProps = usePreviousValue(props);
  const prevWordsByLines = usePreviousValue(wordsByLines);

  const calculateWordsByLines = useCallback(
    (lineWidth?: number) => {
      const { scaleToFit } = props;
      return wordsWithWidth.current.reduce((result: WordsWithWidth[], { word, width }) => {
        const currentLine = result[result.length - 1];

        if (
          currentLine &&
          (lineWidth == null ||
            scaleToFit ||
            (currentLine.width || 0) + width + spaceWidth.current < lineWidth)
        ) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width = currentLine.width || 0;
          currentLine.width += width + spaceWidth.current;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          const newLine = { words: [word], width };
          result.push(newLine);
        }

        return result;
      }, []);
    },
    [props],
  );

  const updateWordsWithoutCalculate = useCallback(() => {
    const words =
      props.children == null ? [] : props.children.toString().split(/(?:(?!\u00A0+)\s+)/);
    setWordsByLines([{ words }]);
  }, [props]);

  const updateWordsByLines = useCallback(
    (needCalculate: boolean = false) => {
      const { width, scaleToFit, children, style } = props;
      // Only perform calculations if using features that require them (multiline, scaleToFit)
      if (width || scaleToFit) {
        if (needCalculate) {
          const words: string[] =
            children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/);
          wordsWithWidth.current = words.map(word => ({
            word,
            width: getStringWidth(word, style) || 0,
          }));
          spaceWidth.current = getStringWidth('\u00A0', style) || 0;
        }

        setWordsByLines(calculateWordsByLines(width));
      } else {
        updateWordsWithoutCalculate();
      }
    },
    [calculateWordsByLines, props, updateWordsWithoutCalculate],
  );

  useEffect(() => {
    if (prevWordsByLines && prevWordsByLines !== wordsByLines) {
      return;
    }

    const needCalculate =
      prevProps?.children !== props.children || prevProps?.style !== props.style;
    updateWordsByLines(needCalculate);
  });

  const {
    verticalAnchor = 'end',
    scaleToFit = false,
    angle,
    lineHeight = '1em',
    capHeight = '0.71em',
    width,
    ...textProps
  } = props;

  const { x = 0, y = 0 } = textProps;

  const startDy =
    verticalAnchor === 'start'
      ? reduceCSSCalc(`calc(${capHeight})`)
      : verticalAnchor === 'middle'
      ? reduceCSSCalc(
          `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`,
        )
      : reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);

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

  const transform = transforms.length > 0 ? transforms.join(' ') : '';

  return [wordsByLines, startDy, transform];
}
