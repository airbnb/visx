import React from 'react';
import BaseBrush, { BaseBrushState } from './BaseBrush';
import { GeneralStyleShape, MarginShape, Point, ResizeTriggerAreas } from './types';
import { scaleInvert, getDomainFromExtent } from './utils';

const SAFE_PIXEL = 2;
const DEFAULT_COLOR = 'steelblue';

export type BrushProps = {
  selectedBoxStyle: GeneralStyleShape;
  xScale: Function;
  yScale: Function;
  height: number;
  width: number;
  onChange: Function;
  onBrushStart: Function;
  onBrushEnd: Function;
  onMouseMove: Function;
  onMouseLeave: Function;
  onClick: Function;
  margin: MarginShape;
  brushDirection: 'vertical' | 'horizontal' | 'both';
  resizeTriggerAreas: ResizeTriggerAreas;
  brushRegion: 'xAxis' | 'yAxis' | 'chart';
  yAxisOrientation: 'left' | 'right';
  xAxisOrientation: 'top' | 'bottom';
  disableDraggingSelection: boolean;
  handleSize: number;
};

class Brush extends React.Component<BrushProps> {
  static defaultProps = {
    xScale: null,
    yScale: null,
    onChange: null,
    height: 0,
    width: 0,
    selectedBoxStyle: {
      fill: DEFAULT_COLOR,
      fillOpacity: 0.2,
      stroke: DEFAULT_COLOR,
      strokeWidth: 1,
      strokeOpacity: 0.8,
    },
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    handleSize: 4,
    brushDirection: 'horizontal',
    resizeTriggerAreas: ['left', 'right'],
    brushRegion: 'chart',
    yAxisOrientation: 'right',
    xAxisOrientation: 'bottom',
    onBrushStart: null,
    onBrushEnd: null,
    disableDraggingSelection: false,
    onMouseMove: null,
    onMouseLeave: null,
    onClick: null,
  };

  private BaseBrush: BaseBrush | null;

  constructor(props: BrushProps) {
    super(props);

    this.BaseBrush = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleBrushStart = this.handleBrushStart.bind(this);
    this.handleBrushEnd = this.handleBrushEnd.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.BaseBrush && this.BaseBrush.reset();
  }

  handleChange(brush: BaseBrushState) {
    const { onChange } = this.props;
    if (!onChange) return;
    const { x0 } = brush.extent;
    if (x0 < 0 || typeof x0 === 'undefined') {
      onChange(null);

      return;
    }
    const domain = this.convertRangeToDomain(brush);
    onChange(domain);
  }

  convertRangeToDomain(brush: BaseBrushState) {
    const { xScale, yScale } = this.props;
    const { x0, x1, y0, y1 } = brush.extent;

    const xDomain = getDomainFromExtent(xScale, x0, x1, SAFE_PIXEL);
    const yDomain = getDomainFromExtent(yScale, y0, y1, SAFE_PIXEL);

    const domain = {
      x0: xDomain.start,
      x1: xDomain.end,
      xValues: xDomain.values,
      y0: yDomain.start,
      y1: yDomain.end,
      yValues: yDomain.values,
    };

    return domain;
  }

  handleBrushStart(point: Point) {
    const { x, y } = point;
    const { onBrushStart, xScale, yScale } = this.props;
    const invertedX = scaleInvert(xScale, x);
    const invertedY = scaleInvert(yScale, y);
    if (onBrushStart) {
      onBrushStart({
        //@ts-ignore
        x: xScale.invert ? invertedX : xScale.domain()[invertedX],
        //@ts-ignore
        y: yScale.invert ? invertedY : yScale.domain()[invertedY],
      });
    }
  }

  handleBrushEnd(brush: BaseBrushState) {
    const { onBrushEnd } = this.props;
    if (!onBrushEnd) return;
    const { x0 } = brush.extent;
    if (x0 < 0) {
      onBrushEnd(null);

      return;
    }
    const domain = this.convertRangeToDomain(brush);
    onBrushEnd(domain);
  }

  render() {
    const {
      xScale,
      yScale,
      height,
      width,
      margin,
      brushDirection,
      resizeTriggerAreas,
      brushRegion,
      yAxisOrientation,
      xAxisOrientation,
      selectedBoxStyle,
      disableDraggingSelection,
      onMouseLeave,
      onMouseMove,
      onClick,
      handleSize,
    } = this.props;
    if (!xScale || !yScale) return null;

    let brushRegionWidth;
    let brushRegionHeight;
    let left;
    let top;
    const marginLeft = margin && margin.left ? margin.left : 0;
    const marginTop = margin && margin.top ? margin.top : 0;
    const marginRight = margin && margin.right ? margin.right : 0;
    const marginBottom = margin && margin.bottom ? margin.bottom : 0;

    if (brushRegion === 'chart') {
      left = 0;
      top = 0;
      brushRegionWidth = width;
      brushRegionHeight = height;
    } else if (brushRegion === 'yAxis') {
      top = 0;
      brushRegionHeight = height;
      if (yAxisOrientation === 'right') {
        left = width;
        brushRegionWidth = marginRight;
      } else {
        left = -marginLeft;
        brushRegionWidth = marginLeft;
      }
    } else {
      left = 0;
      brushRegionWidth = width;
      if (xAxisOrientation === 'bottom') {
        top = height;
        brushRegionHeight = marginBottom;
      } else {
        top = -marginTop;
        brushRegionHeight = marginTop;
      }
    }

    return (
      <BaseBrush
        width={brushRegionWidth}
        height={brushRegionHeight}
        left={left}
        top={top}
        inheritedMargin={margin}
        onChange={this.handleChange}
        onBrushEnd={this.handleBrushEnd}
        onBrushStart={this.handleBrushStart}
        handleSize={handleSize}
        resizeTriggerAreas={resizeTriggerAreas}
        brushDirection={brushDirection}
        selectedBoxStyle={selectedBoxStyle}
        disableDraggingSelection={disableDraggingSelection}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onClick={onClick}
        ref={el => {
          this.BaseBrush = el;
        }}
      />
    );
  }
}

export default Brush;
