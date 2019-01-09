// @ts-nocheck

import React from 'react';
import Show from '../components/show';
import { Drag } from '@vx/drag';
import { genPhyllotaxis } from '@vx/mock-data';
import { localPoint } from '@vx/event';

const bg = '#fcd200';

function identityMatrix() {
  return {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  };
}

function createMatrix({
  scaleX = 1,
  scaleY = 1,
  translateX = 0,
  translateY = 0,
  skewX = 0,
  skewY = 0
}) {
  return {
    scaleX,
    scaleY,
    translateX,
    translateY,
    skewX,
    skewY
  };
}

function inverseMatrix({ scaleX, scaleY, translateX, translateY, skewX, skewY }) {
  const denominator = scaleX * scaleY - skewY * skewX;
  return {
    scaleX: scaleY / denominator,
    scaleY: scaleX / denominator,
    translateX: (scaleY * translateX - skewX * translateY) / -denominator,
    translateY: (skewY * translateX - scaleX * translateY) / denominator,
    skewX: skewX / -denominator,
    skewY: skewY / -denominator
  };
}

// |  a  c  e  |
// |  b  d  f  |
//       =
// |  scaleX  skewX  translateX  |
// |  skewY  scaleY  translateY  |

function applyMatrixToPoint(matrix, { x, y }) {
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY
  };
}

function scaleMatrix(scaleX, scaleY = undefined) {
  if (!scaleY) scaleY = scaleX;
  return createMatrix({ scaleX, scaleY });
}

function translateMatrix(translateX, translateY = undefined) {
  if (!translateY) translateY = translateX;
  return createMatrix({ translateX, translateY });
}

function multiplyMatrices(matrix1, matrix2) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    translateX:
      matrix1.scaleX * matrix2.translateX + matrix1.skewX * matrix2.translateY + matrix1.translateX,
    translateY:
      matrix1.skewY * matrix2.translateX + matrix1.scaleY * matrix2.translateY + matrix1.translateY,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY
  };
}

function composeMatrices(...matrices) {
  switch (matrices.length) {
    case 0:
      console.log('composeMatrices() requires arguments: was called with no args');
      break;
    case 1:
      return matrices[0];
    case 2:
      return multiplyMatrices(matrices[0], matrices[1]);
    default:
      const [matrix1, matrix2, ...restMatrices] = matrices;
      const matrix = multiplyMatrices(matrix1, matrix2);
      return composeMatrices(matrix, ...restMatrices);
  }
}

class PanZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // matrix: createMatrix({
      //   scaleX: 0.5,
      //   scaleY: 0.5,
      //   translateX: props.width / 4,
      //   translateY: props.height / 4
      // })
      matrix: identityMatrix()
    };
    this.handleWheel = this.handleWheel.bind(this);
    this.translate = this.translate.bind(this);
    this.translateEnd = this.translateEnd.bind(this);
  }
  translate(drag) {
    const { matrix } = this.state;
    const { scaleX, scaleY, translateX, translateY } = matrix;
    if (!this.start) this.start = { translateX, translateY };
    const currentPoint = applyMatrixToPoint(inverseMatrix(matrix), localPoint(drag.event));
    const startPoint = applyMatrixToPoint(inverseMatrix(matrix), { x: drag.x, y: drag.y });
    const nextMatrix = {
      ...matrix,
      translateX: this.start.translateX + drag.dx,
      translateY: this.start.translateY + drag.dy
    };
    this.setState({ matrix: nextMatrix });

    // if (!this.last) this.last = drag;
    // const tx = drag.dx - this.last.dx;
    // const ty = drag.dy - this.last.dy;
    // console.log(tx, drag.dx);
    // const nextMatrix = composeMatrices(matrix, translateMatrix(tx + scaleX * tx, ty + scaleY * ty));
    // this.setState({ matrix: nextMatrix });
  }
  translateEnd() {
    this.start = undefined;
  }
  handleWheel(event) {
    event.preventDefault();
    const { matrix } = this.state;
    const increase = event.deltaY > 0;
    let scaleBy = increase ? 1.1 : 0.9;
    const wheelPoint = localPoint(this.props.svg, event);
    const { x: tx, y: ty } = applyMatrixToPoint(inverseMatrix(matrix), wheelPoint);
    const nextMatrix = composeMatrices(
      matrix,
      translateMatrix(tx, ty),
      scaleMatrix(scaleBy),
      translateMatrix(-tx, -ty)
    );
    this.setState({ matrix: nextMatrix });
  }
  render() {
    const { children } = this.props;
    const zoom = {
      ...this.state,
      handleWheel: this.handleWheel,
      translate: this.translate,
      translateEnd: this.translateEnd
    };
    return children(zoom);
  }
}

class ZoomDemo extends React.Component {
  constructor(props) {
    super(props);
    this.svg = undefined;
  }
  componentDidMount() {
    this.forceUpdate();
  }
  render() {
    const { width, height, margin } = this.props;
    const gen = genPhyllotaxis({ radius: 10, width, height });
    const phyllotaxis = [...new Array(2000)].map((d, i) => gen(i));
    return (
      <svg
        width={width}
        height={height}
        ref={s => {
          this.svg = s;
        }}
      >
        <defs>
          <linearGradient id="dot-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050300" stopOpacity={1} />
            <stop offset="100%" stopColor="#050300" stopOpacity={0} />
          </linearGradient>
        </defs>
        <rect width={width} height={height} rx={14} fill={bg} />
        <PanZoom width={width} height={height} svg={this.svg}>
          {zoom => {
            const { matrix } = zoom;
            const { scaleX, scaleY, translateX, translateY, skewY, skewX } = matrix;
            const viewport = inverseMatrix(zoom.matrix);
            return (
              <Drag
                svg={this.svg}
                width={width}
                height={height}
                onDragMove={zoom.translate}
                onDragEnd={zoom.translateEnd}
                resetOnStart
              >
                {drag => {
                  return (
                    <g>
                      <g
                        transform={`translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`}
                      >
                        {phyllotaxis.map((d, i) => {
                          const { x, y } = d;
                          return (
                            <circle
                              key={`dot-${i}`}
                              cx={x}
                              cy={y}
                              r={4}
                              fill={i % 2 === 0 ? `url(#dot-gradient)` : '#050300'}
                            />
                          );
                        })}
                      </g>
                      {false && (
                        <g transform={'translate(10, 10) scale(0.25)'}>
                          <rect width={width} height={height} stroke={'black'} strokeWidth={1} />
                          <rect
                            width={width}
                            height={height}
                            x={0}
                            y={0}
                            transform={`matrix(${viewport.scaleX}, ${viewport.skewY}, ${
                              viewport.skewX
                            }, ${viewport.scaleY}, ${viewport.translateX}, ${viewport.translateY})`}
                            fill={'white'}
                          />
                        </g>
                      )}
                      <rect
                        width={width}
                        height={height}
                        rx={14}
                        fill="transparent"
                        onWheel={zoom.handleWheel}
                        onMouseDown={drag.dragStart}
                        onMouseMove={drag.dragMove}
                        onMouseUp={drag.dragEnd}
                      />
                    </g>
                  );
                }}
              </Drag>
            );
          }}
        </PanZoom>
      </svg>
    );
  }
}

export default () => {
  return (
    <Show component={ZoomDemo} title="Zoom">
      {``}
    </Show>
  );
};
