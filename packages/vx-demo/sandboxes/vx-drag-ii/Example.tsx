import React, { useState } from 'react';
import { LinePath } from '@vx/shape';
import { Drag } from '@vx/drag';
import { curveBasis } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';

type Line = { x: number; y: number }[];
type Lines = Line[];

export type DragIIProps = {
  width: number;
  height: number;
  data?: Lines;
};

export default function DragII({ data = [], width, height }: DragIIProps) {
  const [lines, setLines] = useState<Lines>(data);

  return width < 10 ? null : (
    <div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
            data={line}
            curve={curveBasis}
            x={d => d.x}
            y={d => d.y}
          />
        ))}
        <Drag
          width={width}
          height={height}
          resetOnStart
          onDragStart={({ x = 0, y = 0 }) => {
            // add the new line with the starting point
            setLines(currLines => [...currLines, [{ x, y }]]);
          }}
          onDragMove={({ x = 0, y = 0, dx, dy }) => {
            // add the new point to the current line
            setLines(currLines => {
              const nextLines = [...currLines];
              const newPoint = { x: x + dx, y: y + dy };
              const lastIndex = nextLines.length - 1;
              nextLines[lastIndex] = [...(nextLines[lastIndex] || []), newPoint];
              return nextLines;
            });
          }}
        >
          {({ x = 0, y = 0, dx, dy, isDragging, dragStart, dragEnd, dragMove }) => (
            <g>
              {/* decorate the currently drawing line */}
              {isDragging && (
                <g>
                  <rect
                    fill="white"
                    width={8}
                    height={8}
                    x={x + dx - 4}
                    y={y + dy - 4}
                    pointerEvents="none"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={4}
                    fill="transparent"
                    stroke="white"
                    pointerEvents="none"
                  />
                </g>
              )}
              {/* create the drawing area */}
              <rect
                fill="transparent"
                width={width}
                height={height}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                onMouseMove={dragMove}
                onTouchStart={dragStart}
                onTouchEnd={dragEnd}
                onTouchMove={dragMove}
              />
            </g>
          )}
        </Drag>
      </svg>
      <div className="deets">
        <div>
          Based on Mike Bostock's{' '}
          <a href="https://bl.ocks.org/mbostock/f705fc55e6f26df29354">Line Drawing</a>
        </div>
      </div>

      <style jsx>{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: crosshair;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
}
