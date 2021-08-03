import React from 'react';
import { Label, Connector, CircleSubject, LineSubject } from '@visx/annotation';
import { LinePath } from '@visx/shape';

import ExampleControls from './ExampleControls';
import findNearestDatum from './findNearestDatum';

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];

export default function Example({ width, height, compact = false }: AnnotationProps) {
  return (
    <ExampleControls width={width} height={height} compact={compact}>
      {({
        AnnotationComponent,
        annotationPosition,
        approxTooltipHeight,
        connectorType,
        data,
        editLabelPosition,
        editSubjectPosition,
        getDate,
        getStockValue,
        horizontalAnchor,
        labelWidth,
        setAnnotationPosition,
        showAnchorLine,
        subjectType,
        subtitle,
        title,
        verticalAnchor,
        xScale,
        yScale,
      }) => (
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={greens[0]} />
          <LinePath
            stroke={greens[2]}
            strokeWidth={2}
            data={data}
            x={(d) => xScale(getDate(d)) ?? 0}
            y={(d) => yScale(getStockValue(d)) ?? 0}
          />
          <AnnotationComponent
            width={width}
            height={height}
            x={annotationPosition.x}
            y={annotationPosition.y}
            dx={annotationPosition.dx}
            dy={annotationPosition.dy}
            canEditLabel={editLabelPosition}
            canEditSubject={editSubjectPosition}
            onDragEnd={({ event, ...nextPosition }) => {
              // snap Annotation to the nearest data point
              const nearestDatum = findNearestDatum({
                accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
                data,
                scale: subjectType === 'horizontal-line' ? yScale : xScale,
                value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
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
              backgroundFill="white"
              showAnchorLine={showAnchorLine}
              anchorLineStroke={greens[2]}
              backgroundProps={{ stroke: greens[1] }}
              fontColor={greens[2]}
              horizontalAnchor={horizontalAnchor}
              subtitle={subtitle}
              title={title}
              verticalAnchor={verticalAnchor}
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
      )}
    </ExampleControls>
  );
}
