import React from 'react';

type Props = {
  width: number;
  height: number;
};

export default function Example({ width, height }: Props) {
  return (
    <>
      Example
      <div>
        width <em>{width}px</em> height <em>{height}px</em>
      </div>
    </>
  );
}
