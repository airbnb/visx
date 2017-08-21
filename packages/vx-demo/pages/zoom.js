import React from 'react';
// import { genPhyllotaxis } from '@vx/mock-data';

function genPhyllotaxis({ radius, width, height }) {
  const theta = Math.PI * (3 - Math.sqrt(5));
  return function(i) {
    const r = radius * Math.sqrt(i);
    const a = theta * i;
    return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
  };
}

export default function Zoom() {
  const width = 960;
  const height = 500;
  const gen = genPhyllotaxis({ radius: 10, width, height });
  const data = [...Array(2000)].map((d, i) => gen(i));

  return (
    <div className="Zoom">
      <svg width={width} height={height}>
        <rect
          width={width}
          height={height}
          stroke="black"
          strokeWidth={1}
          fill="transparent"
        />
        {data.map((d, i) => {
          return <circle key={`dot-${i}`} cx={d[0]} cy={d[1]} r={2.5} />;
        })}
      </svg>
      <style jsx>{`
        .Zoom {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 98vh;
        }
      `}</style>
    </div>
  );
}
