import React, { Component } from 'react';
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
  /** Style object for the Brush selection rect. */
  selectedBoxStyle: React.SVGProps<SVGRectElement>;
  /** x-coordinate scale. */
  xScale: Scale;
  /** y-coordinate scale. */
  yScale: Scale;
  /** Brush stage height. */
  height: number;
  /** Brush stage width. */
  width: number;
  /** Callback invoked on a change in Brush bounds. */
  onChange?: (bounds: Bounds | null) => void;
  /** Callback invoked on initialization of a Brush (not Brush move). */
  onBrushStart?: BaseBrushProps['onBrushStart'];
  /** Callback invoked on mouse up when a Brush size is being updated. */
  onBrushEnd?: (bounds: Bounds | null) => void;
  /** Callback invoked on mouse move in Brush stage when *not* dragging. */
  onMouseMove?: BaseBrushProps['onMouseMove'];
  /** Callback invoked on mouse leave from Brush stage when *not* dragging. */
  onMouseLeave?: BaseBrushProps['onMouseLeave'];
  /** Callback invoked on Brush stage click. */
  onClick?: BaseBrushProps['onClick'];
  /** Margin subtracted from Brush stage dimensions. */
  margin?: MarginShape;
  /** Allowed directions for Brush dimensional change. */
  brushDirection?: 'vertical' | 'horizontal' | 'both';
  /** Initial start and end position of the Brush. */
  initialBrushPosition?: PartialBrushStartEnd;
  /** Array of rect sides and corners which should be resizeable / can trigger a Brush size change. */
  resizeTriggerAreas?: ResizeTriggerAreas[];
  /** What is being brushed, used for margin subtraction. */
  brushRegion?: 'xAxis' | 'yAxis' | 'chart';
  /** Orientation of yAxis if `brushRegion=yAxis`. */
  yAxisOrientation?: 'left' | 'right';
  /** Orientation of xAxis if `brushRegion=xAxis`. */
  xAxisOrientation?: 'top' | 'bottom';
  /** Whether movement of Brush should be disabled. */
  disableDraggingSelection: boolean;
  /** Whether to reset the Brush on drag end. */
  resetOnEnd?: boolean;
  /** Size of Brush handles, applies to all `resizeTriggerAreas`. */
  handleSize: number;
  /** Reference to the BaseBrush component. */
  innerRef?: React.MutableRefObject<BaseBrush | null>;
  /** Prevent drag end on mouse leaving from brush stage. */
  useWindowMoveEvents?: boolean;
};

class Brush extends Component<BrushProps> {
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
    useWindowMoveEvents: false,
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
      innerRef,
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
      useWindowMoveEvents,
    } = this.props;
    if (!xScale || !yScale) return null;

    let brushRegionWidth;
    let brushRegionHeight;
    let left;
    let top;
    const marginLeft = margin?.left ? margin.left : 0;
    const marginTop = margin?.top ? margin.top : 0;
    const marginRight = margin?.right ? margin.right : 0;
    const marginBottom = margin?.bottom ? margin.bottom : 0;

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
        brushDirection={brushDirection}
        disableDraggingSelection={disableDraggingSelection}
        handleSize={handleSize}
        inheritedMargin={margin}
        initialBrushPosition={initialBrushPosition}
        ref={innerRef}
        resetOnEnd={resetOnEnd}
        resizeTriggerAreas={resizeTriggerAreas}
        selectedBoxStyle={selectedBoxStyle}
        onBrushEnd={this.handleBrushEnd}
        onBrushStart={this.handleBrushStart}
        onChange={this.handleChange}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        useWindowMoveEvents={useWindowMoveEvents}
      />
    );
  }
}

export default Brush;
