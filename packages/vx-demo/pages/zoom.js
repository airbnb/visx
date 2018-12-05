import React from 'react';
import Show from '../components/show';
import { Drag } from '@vx/drag';
import { localPoint } from '@vx/event';

function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function multiply(m1, m2) {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    b: m1.b * m2.a + m1.d * m2.b,
    d: m1.b * m2.c + m1.d * m2.d,
    f: m1.b * m2.e + m1.d * m2.f + m1.f
  };
}

class Zoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scaleX: props.scaleX,
      scaleY: props.scaleY,
      scaleXBy: props.scaleXBy,
      scaleYBy: props.scaleYBy,
      translateX: props.translateX,
      translateY: props.translateY,
      originX: props.originX,
      originY: props.originY,
      extentX: props.extentX || [-Infinity, +Infinity],
      extentY: props.extentY || [-Infinity, +Infinity]
    };

    this.transform = this.transform.bind(this);
    this.invertTransform = this.invertTransform.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.setOrigin = this.setOrigin.bind(this);
    this.update = this.update.bind(this);
  }
  update(state) {
    this.setState(state);
  }
  setTranslate({ x, y }) {
    this.setState({ translateX: x, translateY: y });
  }
  setOrigin({ x, y }) {
    this.setState({ originX: x, originY: y });
  }
  increase({ x, y }) {
    const {
      translateX,
      translateY,
      scaleX,
      scaleY,
      scaleXBy,
      scaleYBy,
      extentX,
      extentY
    } = this.state;
    const scaledX = scaleX + scaleX * scaleXBy;
    const scaledY = scaleY + scaleY * scaleYBy;
    const nextScaleX = Math.min(extentX[1], scaledX);
    const nextScaleY = Math.min(extentY[1], scaledY);
    this.setState(prevState => {
      return {
        originX: x - translateX,
        originY: y - translateY,
        scaleX: nextScaleX,
        scaleY: nextScaleY
      };
    });
  }
  decrease({ x, y }) {
    const {
      scaleX,
      scaleY,
      scaleXBy,
      scaleYBy,
      extentX,
      extentY,
      translateX,
      translateY
    } = this.state;
    const scaledX = scaleX - scaleX * scaleXBy;
    const scaledY = scaleY - scaleY * scaleYBy;
    const nextScaleX = Math.max(extentX[0], scaledX);
    const nextScaleY = Math.max(extentY[0], scaledY);
    this.setState(prevState => {
      return {
        originX: x - translateX,
        originY: y - translateY,
        scaleX: nextScaleX,
        scaleY: nextScaleY
      };
    });
  }
  transform() {
    const { scaleX, scaleY, translateX, translateY, originX, originY } = this.state;
    return `
      translate(${originX}, ${originY})
      scale(${scaleX}, ${scaleY})
      translate(${-originX}, ${-originY})
      translate(${translateX / scaleX}, ${translateY / scaleY})
    `;
  }
  invertTransform() {
    const { scaleX, scaleY, translateX, translateY, originX, originY } = this.state;
    return `
      translate(${originX}, ${originY})
      scale(${1 / scaleX}, ${1 / scaleY})
      translate(${-originX}, ${-originY})
      translate(${-translateX}, ${-translateY})
    `;
  }
  render() {
    const { children } = this.props;
    const zoom = {
      ...this.state,
      setTranslate: this.setTranslate,
      setOrigin: this.setOrigin,
      transform: this.transform,
      invertTransform: this.invertTransform,
      increase: this.increase,
      decrease: this.decrease,
      update: this.update
    };
    return children(zoom);
  }
}

Zoom.defaultProps = {
  scaleX: 1,
  scaleY: 1,
  scaleXBy: 0.1,
  scaleYBy: 0.1,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

class ZoomDemo extends React.Component {
  render() {
    const { width, height } = this.props;
    const origin = { x: width / 2, y: height / 2 };
    return (
      <Zoom originX={origin.x} originY={origin.y} extentX={[1, 6]} extentY={[1, 6]}>
        {zoom => {
          return (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <button onClick={zoom.increase}>+</button>
                <button onClick={zoom.decrease}>-</button>
              </div>
              <svg width={width} height={height}>
                <g
                  onWheel={event => {
                    event.persist();
                    event.stopPropagation();
                    event.preventDefault();
                    const increase = event.deltaY > 0;
                    const decrease = event.deltaY < 0;

                    const point = localPoint(event);
                    this.point = point;

                    if (increase) {
                      zoom.increase(point);
                    } else if (decrease) {
                      zoom.decrease(point);
                    }
                  }}
                >
                  <rect width={width} height={height} fill="#efefef" />
                  <Drag
                    width={width}
                    height={height}
                    onDragMove={drag => {
                      zoom.setTranslate({ x: drag.dx, y: drag.dy });
                    }}
                  >
                    {drag => {
                      return (
                        <g transform={zoom.transform()}>
                          <circle
                            cx={origin.x}
                            cy={origin.y}
                            r={35}
                            fill="#292929"
                            onMouseDown={drag.dragStart}
                            onMouseMove={drag.dragMove}
                            onMouseUp={drag.dragEnd}
                          />
                        </g>
                      );
                    }}
                  </Drag>
                </g>
              </svg>
            </div>
          );
        }}
      </Zoom>
    );
  }
}

export default ({}) => {
  return (
    <Show
      events
      title="Zoom"
      component={ZoomDemo}
      margin={{
        top: 0,
        left: 80,
        right: 80,
        bottom: 10
      }}
    >
      {``}
    </Show>
  );
};
