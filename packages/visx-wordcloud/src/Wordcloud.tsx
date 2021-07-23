import React from 'react';

export interface Config {
  /** The total width of the wordcloud layout. */
  width?: number;
  /** The total width of the wordcloud layout. */
  height?: number;
}

export default function Wordcloud({ width = 0, height = 0 }: Config) {
  return (
    <div>
      TODO: Wordcloud!{width}
      {height}
    </div>
  );
}
