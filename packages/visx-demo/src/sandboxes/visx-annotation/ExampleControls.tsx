/* eslint jsx-a11y/label-has-associated-control: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useEffect, useMemo, useState } from 'react';
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
  AnnotationComponent: typeof Annotation | typeof EditableAnnotation;
  anchorLinePosition?: 'auto' | 'all' | 'none';
  annotationPosition: AnnotationPosition;
  approxTooltipHeight: number;
  connectorType: 'line' | 'elbow';
  data: AppleStock[];
  editLabelPosition: boolean;
  editSubjectPosition: boolean;
  getDate: (d: AppleStock) => number;
  getStockValue: (d: AppleStock) => number;
  horizontalAnchor?: 'start' | 'middle' | 'end';
  labelWidth: number;
  setAnnotationPosition: (position: AnnotationPosition) => void;
  showAnchorLine: boolean;
  subjectType: 'circle' | 'horizontal-line' | 'vertical-line';
  subtitle: string;
  title: string;
  verticalAnchor?: 'start' | 'middle' | 'end';
  xScale: PickD3Scale<'time', number>;
  yScale: PickD3Scale<'linear', number>;
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
        domain: extent(data, (d) => getDate(d)) as number[],
        range: [0, width],
      }),
    [width],
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => getStockValue(d)) as number[],
        range: [height - 100, 100],
      }),
    [height],
  );

  const [editLabelPosition, setEditLabelPosition] = useState(false);
  const [editSubjectPosition, setEditSubjectPosition] = useState(false);
  const [title, setTitle] = useState('Title');
  const [subtitle, setSubtitle] = useState(
    compact ? 'Subtitle' : 'Subtitle with deets and deets and deets and deets',
  );
  const [connectorType, setConnectorType] = useState<ProvidedProps['connectorType']>('elbow');
  const [subjectType, setSubjectType] = useState<ProvidedProps['subjectType']>('circle');
  const [showAnchorLine, setShowAnchorLine] = useState(true);
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
  // update annotation position when scale's change
  useEffect(() => {
    setAnnotationPosition((currPosition) => ({
      ...currPosition,
      x: xScale(getDate(annotateDatum)) ?? 0,
      y: yScale(getStockValue(annotateDatum)) ?? 0,
    }));
  }, [xScale, yScale]);

  return (
    <>
      {children({
        AnnotationComponent:
          editLabelPosition || editSubjectPosition ? EditableAnnotation : Annotation,
        annotationPosition,
        approxTooltipHeight,
        connectorType,
        data,
        editLabelPosition,
        editSubjectPosition,
        getDate,
        getStockValue,
        horizontalAnchor: horizontalAnchor === 'auto' ? undefined : horizontalAnchor,
        labelWidth,
        setAnnotationPosition,
        showAnchorLine,
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
              <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              <strong>Subtitle</strong>&nbsp;&nbsp;
              <input type="text" onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              <input
                type="checkbox"
                onChange={() => setEditSubjectPosition(!editSubjectPosition)}
                checked={editSubjectPosition}
              />
              Edit subject position
            </label>
            &nbsp;&nbsp;
            <label>
              <input
                type="checkbox"
                onChange={() => setEditLabelPosition(!editLabelPosition)}
                checked={editLabelPosition}
              />
              Edit label position
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
                onChange={() => setHorizontalAnchor('start')}
                checked={horizontalAnchor === 'start'}
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
                onChange={() => setHorizontalAnchor('end')}
                checked={horizontalAnchor === 'end'}
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
                onChange={() => setVerticalAnchor('start')}
                checked={verticalAnchor === 'start'}
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
                onChange={() => setVerticalAnchor('end')}
                checked={verticalAnchor === 'end'}
              />
              bottom
            </label>
            <div>
              <label>
                <input
                  type="checkbox"
                  onChange={() => setShowAnchorLine(!showAnchorLine)}
                  checked={showAnchorLine}
                />
                Show anchor line
              </label>
            </div>
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
