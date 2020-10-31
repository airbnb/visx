/* eslint @typescript-eslint/no-use-before-define: 'off', jsx-a11y/label-has-associated-control: 'off' */
import React, { useMemo, useState } from 'react';
import {
  Annotation,
  EditableAnnotation,
  Label,
  Connector,
  CircleSubject,
  LineSubject,
} from '@visx/annotation';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent, bisector } from 'd3-array';

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

const data = appleStock.slice(-100);
const getDate = (d: AppleStock) => new Date(d.date).valueOf();
const getStockValue = (d: AppleStock) => d.close;
const annotateDatum = data[Math.floor(data.length / 2) + 4];

const approxTooltipHeight = 60;
export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];

export default function Example({ width, height, compact }: AnnotationProps) {
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: extent(data, d => getDate(d)) as number[],
        range: [0, width],
      }),
    [width],
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, d => getStockValue(d)) as number[],
        range: [height - 100, 100],
      }),
    [height],
  );

  const [editAnnotation, setEditAnnotation] = useState(false);
  const [connectorType, setConnectorType] = useState<'line' | 'elbow'>('elbow');
  const [subjectType, setSubjectType] = useState<'circle' | 'horizontal-line' | 'vertical-line'>(
    'circle',
  );
  const [labelWidth] = useState(compact ? 100 : 175);
  const [annotationPosition, setAnnotationPosition] = useState({
    x: xScale(getDate(annotateDatum)) ?? 0,
    y: yScale(getStockValue(annotateDatum)) ?? 0,
    dx: compact ? -50 : -100,
    dy: compact ? -30 : -50,
  });

  const AnnotationComponent = editAnnotation ? EditableAnnotation : Annotation;

  return (
    <>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={greens[0]} />
        <LinePath
          stroke={greens[2]}
          strokeWidth={2}
          data={data}
          x={d => xScale(getDate(d)) ?? 0}
          y={d => yScale(getStockValue(d)) ?? 0}
        />
        <AnnotationComponent
          width={width}
          height={height}
          x={annotationPosition.x}
          y={annotationPosition.y}
          dx={annotationPosition.dx}
          dy={annotationPosition.dy}
          onDragEnd={({ event, ...nextPosition }) => {
            // snap Annotation to the nearest data point
            const nearestDatum = findNearestDatum({
              value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
              scale: subjectType === 'horizontal-line' ? yScale : xScale,
              accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
            });
            const x = xScale(getDate(nearestDatum)) ?? 0;
            const y = yScale(getStockValue(nearestDatum)) ?? 0;

            // flip label to keep in view
            const shouldFlipDx =
              (nextPosition.dx > 0 && x + nextPosition.dx + labelWidth > width) ||
              (nextPosition.dx < 0 && x + nextPosition.dx - labelWidth <= 0);
            const shouldFlipDy = // 100 is est. tooltip height
              (nextPosition.dy > 0 && height - (y + nextPosition.dy) < approxTooltipHeight) ||
              (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
            setAnnotationPosition({
              x,
              y,
              dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
              dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
            });
          }}
        >
          <Connector stroke={orange} type={connectorType} />
          <Label
            title="Annotation"
            subtitle={compact ? 'Subtitle' : 'Subtitle with deets and deets and deets and deets'}
            fontColor={greens[2]}
            backgroundFill={greens[0]}
            backgroundProps={{ stroke: orange }}
            width={labelWidth}
          />
          {subjectType === 'circle' && <CircleSubject stroke={orange} />}
          {subjectType !== 'circle' && (
            <LineSubject
              orientation={subjectType === 'vertical-line' ? 'vertical' : 'horizontal'}
              stroke={orange}
              min={0}
              max={subjectType === 'vertical-line' ? height : width}
            />
          )}
        </AnnotationComponent>
      </svg>
      {!compact && (
        <div className="controls">
          <div>
            <label>
              <input
                type="checkbox"
                onChange={() => setEditAnnotation(!editAnnotation)}
                checked={editAnnotation}
              />
              Edit annotation
            </label>
          </div>
          <div>
            <strong>Connector type</strong>
            <label>
              <input
                type="radio"
                onChange={() => setConnectorType('elbow')}
                checked={connectorType === 'elbow'}
              />
              Elbow
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setConnectorType('line')}
                checked={connectorType === 'line'}
              />
              Straight line
            </label>
          </div>
          <div>
            <strong>Subject type</strong>
            <label>
              <input
                type="radio"
                onChange={() => setSubjectType('circle')}
                checked={subjectType === 'circle'}
              />
              Circle
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setSubjectType('vertical-line')}
                checked={subjectType === 'vertical-line'}
              />
              Vertical line
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setSubjectType('horizontal-line')}
                checked={subjectType === 'horizontal-line'}
              />
              Horizontal line
            </label>
          </div>
        </div>
      )}
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
      `}</style>
    </>
  );
}

function findNearestDatum({
  value,
  scale,
  accessor,
}: {
  value: number;
  scale: ReturnType<typeof scaleLinear | typeof scaleTime>;
  accessor: (d: AppleStock) => number;
}): AppleStock {
  const bisect = bisector(accessor).left;
  const nearestValue = scale.invert(value) as number;
  const nearestValueIndex = bisect(data, nearestValue, 1);
  const d0 = data[nearestValueIndex - 1];
  const d1 = data[nearestValueIndex];
  let nearestDatum = d0;
  if (d1 && getDate(d1)) {
    nearestDatum = nearestValue - accessor(d0) > accessor(d1) - nearestValue ? d1 : d0;
  }
  return nearestDatum;
}
