import React from 'react';
import d3Cloud from 'd3-cloud';
import { Group } from '@visx/group';
import { BaseDatum, WordcloudConfig } from './types';
import useWordcloud from './useWordcloud';

export interface WordcloudProps<Datum extends BaseDatum> extends WordcloudConfig<Datum> {
  children: (words: d3Cloud.Word[]) => React.ReactNode;
}

export default function Wordcloud<Datum extends BaseDatum>(props: WordcloudProps<Datum>) {
  const { children, ...wordcloudConfig } = props;
  const { width, height } = wordcloudConfig;
  const words = useWordcloud(wordcloudConfig);

  if (width === 0 || height === 0) return null;

  return (
    <svg width={width} height={height}>
      <Group left={width / 2} top={height / 2}>
        {children(words)}
      </Group>
    </svg>
  );
}
