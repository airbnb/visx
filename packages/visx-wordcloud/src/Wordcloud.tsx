import React from 'react';
import d3Cloud from 'd3-cloud';
import { Group } from '@visx/group';
import { useWordcloud, WordcloudConfig } from './useWordcloud';

export interface WordcloudProps<Datum> extends WordcloudConfig<Datum> {
  children: (words: d3Cloud.Word[]) => React.ReactNode;
}

export default function Wordcloud<T>(props: WordcloudProps<T>) {
  const { children, ...wordcloudConfig } = props;
  const words = useWordcloud(wordcloudConfig);

  if (!wordcloudConfig.height || !wordcloudConfig.width) return null;

  return (
    <svg width={wordcloudConfig.width} height={wordcloudConfig.height}>
      <Group left={wordcloudConfig.width / 2} top={wordcloudConfig.height / 2}>
        {children(words)}
      </Group>
    </svg>
  );
}
