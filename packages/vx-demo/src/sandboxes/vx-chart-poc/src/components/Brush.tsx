import React, { useContext } from 'react';
import BaseBrush, { BrushProps as BaseBrushProps } from '@vx/brush/src/Brush';
import { ResizeTriggerAreas } from '@vx/brush/lib/types';
import ChartContext from '../context/ChartContext';

const leftRightResizeTriggers: ResizeTriggerAreas[] = ['left', 'right'];
const topBottomResizeTriggers: ResizeTriggerAreas[] = ['top', 'bottom'];
const allResizeTriggers: ResizeTriggerAreas[] = [
  'left',
  'right',
  'top',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
];

type BrushProps = Partial<
  Pick<
    BaseBrushProps,
    | 'brushDirection'
    | 'brushRegion'
    | 'handleSize'
    | 'onChange'
    | 'onClick'
    | 'resizeTriggerAreas'
    | 'selectedBoxStyle'
    | 'yAxisOrientation'
    | 'xAxisOrientation'
  >
> & { initialBrushPosition?: (scales) => BaseBrushProps['initialBrushPosition'] };

export default function Brush({
  brushDirection = 'horizontal',
  brushRegion = 'chart',
  handleSize = 8,
  initialBrushPosition,
  onChange,
  onClick,
  resizeTriggerAreas,
  selectedBoxStyle,
  xAxisOrientation,
  yAxisOrientation,
}: BrushProps) {
  const { xScale, yScale, margin } = useContext(ChartContext) || {};

  // not yet available in context
  if (!xScale || !yScale) return null;

  // @TODO make a util for this
  const xRange = xScale.range() as number[];
  const yRange = yScale.range() as number[];
  const width = Math.abs(xRange[1] - xRange[0]);
  const height = Math.abs(yRange[1] - yRange[0]);

  return (
    <BaseBrush
      // force clear the brush if any of these change
      key={`${brushRegion}-${xAxisOrientation}-${yAxisOrientation}`}
      xScale={xScale}
      yScale={yScale}
      width={width}
      height={height}
      margin={margin}
      handleSize={handleSize}
      resizeTriggerAreas={
        resizeTriggerAreas ||
        (brushDirection === 'horizontal'
          ? leftRightResizeTriggers
          : brushDirection === 'vertical'
          ? topBottomResizeTriggers
          : allResizeTriggers)
      }
      brushDirection={brushDirection}
      initialBrushPosition={
        initialBrushPosition ? initialBrushPosition({ xScale, yScale }) : undefined
      }
      onChange={onChange}
      onClick={onClick}
      selectedBoxStyle={selectedBoxStyle}
      brushRegion={brushRegion}
      xAxisOrientation={xAxisOrientation}
      yAxisOrientation={yAxisOrientation}
    />
  );
}
