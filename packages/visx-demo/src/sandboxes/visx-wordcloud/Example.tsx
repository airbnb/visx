import React from 'react';

export interface WordcloudProps {
  width: number;
  height: number;
}

export default function Example({ width, height }: WordcloudProps) {
  return (
    <div className="wordcloud">
      <h1>TODO: WORDCLOUD</h1>
      <svg width={width} height={height} />
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        svg {
          margin: 1rem 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
