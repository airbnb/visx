import { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';

export interface WordData {
  text: string;
  value: number;
}

type BultInSpiral = 'archimedean' | 'rectangular';

export interface WordcloudConfig {
  width?: number;
  height?: number;
  words?: WordData[];
  padding?: number;
  font?: string;
  fontSize?: (datum: CloudWord, index: number) => number;
  fontStyle?: string;
  fontWeight?: string | number;
  rotate?: (datum: CloudWord, index: number) => number;
  spiral?: BultInSpiral;
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

    layout.on('end', setCloudWords);
    layout.start();

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
