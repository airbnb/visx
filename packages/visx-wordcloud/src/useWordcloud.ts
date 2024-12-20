import { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';
import type { BaseDatum, Cloud, CloudWord, WordcloudConfig } from './types';

export default function useWordcloud<Datum extends BaseDatum>({
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
}: WordcloudConfig<Datum>) {
  const [cloudWords, setCloudWords] = useState<CloudWord[]>([]);

  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }

    const layout = d3Cloud() as Cloud<Datum>;

    layout.size([width, height]);
    layout.words(words);
    if (typeof random !== 'undefined') layout.random(random);
    if (typeof font !== 'undefined') layout.font(font);
    if (typeof padding !== 'undefined') layout.padding(padding);
    if (typeof fontSize !== 'undefined') layout.fontSize(fontSize);
    if (typeof fontStyle !== 'undefined') layout.fontStyle(fontStyle);
    if (typeof fontWeight !== 'undefined') layout.fontWeight(fontWeight);
    if (typeof rotate !== 'undefined') layout.rotate(rotate);
    if (typeof spiral !== 'undefined') layout.spiral(spiral);

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
