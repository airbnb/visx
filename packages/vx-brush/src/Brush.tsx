import React from 'react';
import BaseBrush, { BaseBrushProps, BaseBrushState } from './BaseBrush';
import {
  Bounds,
  PartialBrushStartEnd,
  MarginShape,
  Point,
  ResizeTriggerAreas,
  Scale,
} from './types';
import { scaleInvert, getDomainFromExtent } from './utils';

const SAFE_PIXEL = 2;
const DEFAULT_COLOR = 'steelblue';

export type BrushProps = {
  selectedBoxStyle: React.SVGProps<SVGRectElement>;
  xScale: Scale;
  yScale: Scale;
  height: number;
  width: number;
  onChange: (bounds: Bounds | null) => void;
  onBrushStart: BaseBrushProps['onBrushStart'];
  onBrushEnd: (bounds: Bounds | null) => void;
  onMouseMove: BaseBrushProps['onMouseMove'];
  onMouseLeave: BaseBrushProps['onMouseLeave'];
  onClick: BaseBrushProps['onClick'];
  margin: MarginShape;
  brushDirection: 'vertical' | 'horizontal' | 'both';
  initialBrushPosition?: PartialBrushStartEnd;
  resizeTriggerAreas: ResizeTriggerAreas[];
  brushRegion: 'xAxis' | 'yAxis' | 'chart';
  yAxisOrientation: 'left' | 'right';
  xAxisOrientation: 'top' | 'bottom';
  disableDraggingSelection: boolean;
  resetOnEnd?: boolean;
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
    initialBrushPosition: null,
    resizeTriggerAreas: ['left', 'right'],
    brushRegion: 'chart',
    yAxisOrientation: 'right',
    xAxisOrientation: 'bottom',
    onBrushStart: null,
    onBrushEnd: null,
    disableDraggingSelection: false,
    resetOnEnd: false,
    onMouseMove: null,
    onMouseLeave: null,
    onClick: null,
  };

  handleChange = (brush: BaseBrushState) => {
    const { onChange } = this.props;
    if (!onChange) return;
    const { x0 } = brush.extent;
    if (typeof x0 === 'undefined' || x0 < 0) {
      onChange(null);

      return;
    }
    const domain = this.convertRangeToDomain(brush);
    onChange(domain);
  };

  convertRangeToDomain(brush: BaseBrushState) {
    const { xScale, yScale } = this.props;
    const { x0, x1, y0, y1 } = brush.extent;

    const xDomain = getDomainFromExtent(xScale, x0 || 0, x1 || 0, SAFE_PIXEL);
    const yDomain = getDomainFromExtent(yScale, y0 || 0, y1 || 0, SAFE_PIXEL);

    const domain: Bounds = {
      x0: xDomain.start || 0,
      x1: xDomain.end || 0,
      xValues: xDomain.values,
      y0: yDomain.start || 0,
      y1: yDomain.end || 0,
      yValues: yDomain.values,
    };

    return domain;
  }

  handleBrushStart = (point: Point) => {
    const { onBrushStart } = this.props;
    if (!onBrushStart) return;
    const { x, y } = point;
    const { xScale, yScale } = this.props;
    const invertedX = scaleInvert(xScale, x);
    const invertedY = scaleInvert(yScale, y);
    onBrushStart({
      x: xScale.invert ? invertedX : xScale.domain()[invertedX],
      y: yScale.invert ? invertedY : yScale.domain()[invertedY],
    });
  };

  handleBrushEnd = (brush: BaseBrushState) => {
    const { onBrushEnd } = this.props;
    if (!onBrushEnd) return;
    const { x0 } = brush.extent;
    if (typeof x0 === 'undefined' || x0 < 0) {
      onBrushEnd(null);
      return;
    }
    const domain = this.convertRangeToDomain(brush);
    onBrushEnd(domain);
  };

  render() {
    const {
      xScale,
      yScale,
      height,
      width,
      margin,
      brushDirection,
      initialBrushPosition,
      resizeTriggerAreas,
      brushRegion,
      yAxisOrientation,
      xAxisOrientation,
      selectedBoxStyle,
      disableDraggingSelection,
      resetOnEnd,
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
        initialBrushPosition={initialBrushPosition}
        onChange={this.handleChange}
        onBrushEnd={this.handleBrushEnd}
        onBrushStart={this.handleBrushStart}
        handleSize={handleSize}
        resizeTriggerAreas={resizeTriggerAreas}
        brushDirection={brushDirection}
        selectedBoxStyle={selectedBoxStyle}
        disableDraggingSelection={disableDraggingSelection}
        resetOnEnd={resetOnEnd}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onClick={onClick}
      />
    );
  }
}

export default Brush;
