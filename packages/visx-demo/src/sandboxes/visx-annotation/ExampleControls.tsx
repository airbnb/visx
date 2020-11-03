/* eslint jsx-a11y/label-has-associated-control: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useMemo, useState } from 'react';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { PickD3Scale, scaleTime, scaleLinear } from '@visx/scale';
import { extent } from 'd3-array';
import { Annotation, EditableAnnotation } from '@visx/annotation';
import { AnnotationProps } from './Example';

type ExampleControlsProps = AnnotationProps & {
  children: (props: ProvidedProps) => React.ReactNode;
};

type AnnotationPosition = { x: number; y: number; dx: number; dy: number };

type ProvidedProps = {
  AnnotationComponent: React.FC<any>;
  anchorOutlinePosition?: 'auto' | 'all' | 'none';
  annotationPosition: AnnotationPosition;
  approxTooltipHeight: number;
  connectorType: 'line' | 'elbow';
  data: AppleStock[];
  getDate: (d: AppleStock) => number;
  getStockValue: (d: AppleStock) => number;
  horizontalAnchor?: 'left' | 'middle' | 'right';
  labelWidth: number;
  setAnnotationPosition: (position: AnnotationPosition) => void;
  subjectType: 'circle' | 'horizontal-line' | 'vertical-line';
  subtitle: string;
  title: string;
  verticalAnchor?: 'top' | 'middle' | 'bottom';
  xScale: PickD3Scale<'time'>;
  yScale: PickD3Scale<'linear'>;
};

const data = appleStock.slice(-100);
const getDate = (d: AppleStock) => new Date(d.date).valueOf();
const getStockValue = (d: AppleStock) => d.close;
const annotateDatum = data[Math.floor(data.length / 2) + 4];
const approxTooltipHeight = 70;

export default function ExampleControls({
  width,
  height,
  compact = false,
  children,
}: ExampleControlsProps) {
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
  const [title, setTitle] = useState('Title');
  const [subtitle, setSubtitle] = useState(
    compact ? 'Subtitle' : 'Subtitle with deets and deets and deets and deets',
  );
  const [connectorType, setConnectorType] = useState<ProvidedProps['connectorType']>('elbow');
  const [subjectType, setSubjectType] = useState<ProvidedProps['subjectType']>('circle');
  const [anchorOutlinePosition, setBackgroundOutlinePosition] = useState<
    ProvidedProps['anchorOutlinePosition']
  >('auto');
  const [verticalAnchor, setVerticalAnchor] = useState<ProvidedProps['verticalAnchor'] | 'auto'>(
    'auto',
  );
  const [horizontalAnchor, setHorizontalAnchor] = useState<
    ProvidedProps['horizontalAnchor'] | 'auto'
  >('auto');
  const [labelWidth] = useState(compact ? 100 : 175);
  const [annotationPosition, setAnnotationPosition] = useState({
    x: xScale(getDate(annotateDatum)) ?? 0,
    y: yScale(getStockValue(annotateDatum)) ?? 0,
    dx: compact ? -50 : -100,
    dy: compact ? -30 : -50,
  });

  return (
    <>
      {children({
        AnnotationComponent: editAnnotation ? EditableAnnotation : Annotation,
        annotationPosition,
        approxTooltipHeight,
        anchorOutlinePosition,
        connectorType,
        data,
        getDate,
        getStockValue,
        horizontalAnchor: horizontalAnchor === 'auto' ? undefined : horizontalAnchor,
        labelWidth,
        setAnnotationPosition,
        subjectType,
        subtitle,
        title,
        verticalAnchor: verticalAnchor === 'auto' ? undefined : verticalAnchor,
        xScale,
        yScale,
      })}
      {!compact && (
        <div className="controls">
          <div>
            <label>
              <strong>Title</strong>&nbsp;&nbsp;
              <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              <strong>Subtitle</strong>&nbsp;&nbsp;
              <input type="text" onChange={e => setSubtitle(e.target.value)} value={subtitle} />
            </label>
            &nbsp;&nbsp;&nbsp;
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
          <div>
            <strong>Background outline</strong>&nbsp;&nbsp;
            <label>
              <input
                type="radio"
                onChange={() => setBackgroundOutlinePosition('auto')}
                checked={anchorOutlinePosition === 'auto'}
              />
              auto
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setBackgroundOutlinePosition('none')}
                checked={anchorOutlinePosition === 'none'}
              />
              none
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setBackgroundOutlinePosition('all')}
                checked={anchorOutlinePosition === 'all'}
              />
              all
            </label>
          </div>
          <div>
            <strong>Horizontal label anchor</strong>
            <label>
              <input
                type="radio"
                onChange={() => setHorizontalAnchor('auto')}
                checked={horizontalAnchor === 'auto'}
              />
              auto
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setHorizontalAnchor('left')}
                checked={horizontalAnchor === 'left'}
              />
              left
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setHorizontalAnchor('middle')}
                checked={horizontalAnchor === 'middle'}
              />
              middle
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setHorizontalAnchor('right')}
                checked={horizontalAnchor === 'right'}
              />
              right
            </label>
          </div>
          <div>
            <strong>Vertical label anchor</strong>
            <label>
              <input
                type="radio"
                onChange={() => setVerticalAnchor('auto')}
                checked={verticalAnchor === 'auto'}
              />
              auto
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setVerticalAnchor('top')}
                checked={verticalAnchor === 'top'}
              />
              top
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setVerticalAnchor('middle')}
                checked={verticalAnchor === 'middle'}
              />
              middle
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setVerticalAnchor('bottom')}
                checked={verticalAnchor === 'bottom'}
              />
              bottom
            </label>
          </div>
        </div>
      )}
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
      `}</style>
    </>
  );
}
