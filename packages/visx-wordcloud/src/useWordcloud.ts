import { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';

export interface WordData {
  text: string;
  value: number;
}

type BultInSpiral = 'archimedean' | 'rectangular';

export interface WordcloudConfig {
  /**
   * Width of the wordcloud layout.
   */
  width?: number;
  /**
   * Height of the wordcloud layout.
   */
  height?: number;
  /**
   * Sets the words array.
   *
   * @default []
   */
  words?: WordData[];
  /**
   * Sets the padding accessor function, which indicates the numerical padding for each word.
   *
   * @default 1
   */
  padding?: number;
  /**
   * Sets the font accessor function, which indicates the font face for each word.
   *
   * @default serif
   */
  font?: string;
  /**
   * Sets the fontSize accessor function, which indicates the numerical font size for each word.
   *
   * @default function(datum) { return Math.sqrt(datum.value); }
   */
  fontSize?: (datum: CloudWord, index: number) => number;
  /**
   * Sets the fontStyle accessor function, which indicates the font style for each word.
   *
   * @default normal
   */
  fontStyle?: string;
  /**
   * Sets the fontWeight accessor function, which indicates the font weight for each word.
   *
   * @default normal
   */
  fontWeight?: string | number;
  /**
   * Sets the rotate accessor function, which indicates the rotation angle (in degrees) for each word.
   *
   * @default function() { return (~~(Math.random() * 6) -3) * 30; }
   */
  rotate?: (datum: CloudWord, index: number) => number;
  /**
   * Sets the current type of spiral used for positioning words.
   * This can either be one of the two built-in spirals, "archimedean" and "rectangular", or an arbitrary spiral generator can be used.
   *
   * @default archimedean
   */
  spiral?: BultInSpiral;
  /**
   * Sets the internal random number generator, used for selecting the initial position of each word,
   * and the clockwise/counterclockwise direction of the spiral for each word. Random function should return a number in the range [0, 1).
   *
   * @default Math.random
   */
  random?: () => number;
}

export type CloudWord = d3Cloud.Word & {
  value: number;
};

export function useWordcloud({
  width = 0,
  height = 0,
  font,
  fontSize,
  fontStyle,
  fontWeight,
  padding,
  random,
  rotate,
  spiral,
  words,
}: WordcloudConfig) {
  const [cloudWords, setCloudWords] = useState<CloudWord[]>([]);

  useEffect(() => {
    const layout = d3Cloud<CloudWord>().size([width, height]);

    if (words) layout.words(words);
    if (padding) layout.padding(padding);
    if (font) layout.font(font);
    if (fontSize) layout.fontSize(fontSize);
    if (fontStyle) layout.fontStyle(fontStyle);
    if (fontWeight) layout.fontWeight(fontWeight);
    if (rotate) layout.rotate(rotate);
    if (random) layout.random(random);
    if (spiral) layout.spiral(spiral);

    layout.on('end', setCloudWords).start();

    return function cleanup() {
      layout.stop();
    };
  }, [
    width,
    height,
    font,
    fontSize,
    fontStyle,
    fontWeight,
    padding,
    random,
    rotate,
    spiral,
    words,
  ]);

  return cloudWords;
}
