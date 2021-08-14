import { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';
import { BaseDatum, WordcloudConfig } from './types';

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
  const [cloudWords, setCloudWords] = useState<d3Cloud.Word[]>([]);

  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }

    const layout = d3Cloud<Datum>();

    if (width !== undefined && height !== undefined) layout.size([width, height]);
    if (words !== undefined) layout.words(words);
    if (random !== undefined) layout.random(random);
    if (font !== undefined) layout.font(font);
    if (padding !== undefined) layout.padding(padding);
    if (fontSize !== undefined) layout.fontSize(fontSize);
    if (fontStyle !== undefined) layout.fontStyle(fontStyle);
    if (fontWeight !== undefined) layout.fontWeight(fontWeight);
    if (rotate !== undefined) layout.rotate(rotate);
    if (spiral !== undefined) layout.spiral(spiral);

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
