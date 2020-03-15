import getStringWidth from './getStringWidth';

const truncateWordToLength = (
  word: string,
  width: number,
  truncateText: string,
  style?: object,
) => {
  const truncateTextWidth = getStringWidth(truncateText, style);
  const truncatedResult = word.split('').reduce(
    (result, char) => {
      const charWidth = getStringWidth(char, style);
      if (result.width + charWidth + truncateTextWidth < width) {
        result.word += char;
        result.width += charWidth;
      }
      return result;
    },
    { word: '', width: 0 },
  );

  truncatedResult.word += truncateText;
  truncatedResult.width += truncateTextWidth;
  return truncatedResult;
};

export default truncateWordToLength;
