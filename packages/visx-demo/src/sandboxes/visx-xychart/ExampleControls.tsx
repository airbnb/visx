/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo, useState } from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { PatternLines } from '@visx/pattern';
import { GlyphProps } from '@visx/xychart/lib/types';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import { RenderTooltipGlyphProps } from '@visx/xychart/src/components/Tooltip';
import customTheme from './customTheme';
import userPrefersReducedMotion from './userPrefersReducedMotion';
import getAnimatedOrUnanimatedComponents from './getAnimatedOrUnanimatedComponents';

const dateScaleConfig = { type: 'band', paddingInner: 0.3 } as const;
const temperatureScaleConfig = { type: 'linear' } as const;
const numTicks = 4;
const data = cityTemperature.slice(225, 275);
const dataMissingValues = data.map((d, i) =>
  i === 10 || i === 11
    ? { ...d, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
    : d,
);
const dataSmall = data.slice(0, 15);
const dataSmallMissingValues = dataMissingValues.slice(0, 15);
const getDate = (d: CityTemperature) => d.date;
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);
const defaultAnnotationDataIndex = 13;
const selectedDatumPatternId = 'xychart-selected-datum';

type Accessor = (d: CityTemperature) => number | string;

interface Accessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

type DataKey = keyof Accessors;

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number };

type ProvidedProps = {
  accessors: {
    x: Accessors;
    y: Accessors;
    date: Accessor;
  };
  animationTrajectory?: AnimationTrajectory;
  annotationDataKey: DataKey | null;
  annotationDatum?: CityTemperature;
  annotationLabelPosition: { dx: number; dy: number };
  annotationType?: 'line' | 'circle';
  colorAccessorFactory: (key: DataKey) => (d: CityTemperature) => string | null;
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
  data: CityTemperature[];
  editAnnotationLabelPosition: boolean;
  numTicks: number;
  setAnnotationDataIndex: (index: number) => void;
  setAnnotationDataKey: (key: DataKey | null) => void;
  setAnnotationLabelPosition: (position: { dx: number; dy: number }) => void;
  renderAreaSeries: boolean;
  renderAreaStack: boolean;
  renderBarGroup: boolean;
  renderBarSeries: boolean;
  renderBarStack: boolean;
  renderGlyph: React.FC<GlyphProps<CityTemperature>>;
  renderGlyphSeries: boolean;
  enableTooltipGlyph: boolean;
  renderTooltipGlyph: React.FC<RenderTooltipGlyphProps<CityTemperature>>;
  renderHorizontally: boolean;
  renderLineSeries: boolean;
  sharedTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showTooltip: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  stackOffset?: 'wiggle' | 'expand' | 'diverging' | 'silhouette';
  theme: XYChartTheme;
  xAxisOrientation: 'top' | 'bottom';
  yAxisOrientation: 'left' | 'right';
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;

type ControlsProps = {
  children: (props: ProvidedProps) => React.ReactNode;
};

export default function ExampleControls({ children }: ControlsProps) {
  const [useAnimatedComponents, setUseAnimatedComponents] = useState(!userPrefersReducedMotion());
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory | undefined>(
    'center',
  );
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([false, false]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [annotationDataKey, setAnnotationDataKey] =
    useState<ProvidedProps['annotationDataKey']>(null);
  const [annotationType, setAnnotationType] = useState<ProvidedProps['annotationType']>('circle');
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true);
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false);
  const [snapTooltipToDatumX, setSnapTooltipToDatumX] = useState(true);
  const [snapTooltipToDatumY, setSnapTooltipToDatumY] = useState(true);
  const [sharedTooltip, setSharedTooltip] = useState(true);
  const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<
    'bar' | 'barstack' | 'bargroup' | 'none'
  >('none');
  const [renderAreaLineOrStack, setRenderAreaLineOrStack] = useState<
    'line' | 'area' | 'areastack' | 'none'
  >('areastack');
  const [stackOffset, setStackOffset] = useState<ProvidedProps['stackOffset']>();
  const [renderGlyphSeries, setRenderGlyphSeries] = useState(false);
  const [editAnnotationLabelPosition, setEditAnnotationLabelPosition] = useState(false);
  const [annotationLabelPosition, setAnnotationLabelPosition] = useState({ dx: -40, dy: -20 });
  const [annotationDataIndex, setAnnotationDataIndex] = useState(defaultAnnotationDataIndex);
  const [negativeValues, setNegativeValues] = useState(false);
  const [fewerDatum, setFewerDatum] = useState(false);
  const [missingValues, setMissingValues] = useState(false);
  const [glyphComponent, setGlyphComponent] = useState<'star' | 'cross' | 'circle' | '🍍'>('star');
  const [curveType, setCurveType] = useState<'linear' | 'cardinal' | 'step'>('linear');
  const glyphOutline = theme.gridStyles.stroke;
  const renderGlyph = useCallback(
    ({ size, color, onPointerMove, onPointerOut, onPointerUp }: GlyphProps<CityTemperature>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp };
      if (glyphComponent === 'star') {
        return <GlyphStar stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
      }
      if (glyphComponent === 'circle') {
        return <GlyphDot stroke={glyphOutline} fill={color} r={size / 2} {...handlers} />;
      }
      if (glyphComponent === 'cross') {
        return <GlyphCross stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
      }
      return (
        <text dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
        </text>
      );
    },
    [glyphComponent, glyphOutline],
  );
  const [enableTooltipGlyph, setEnableTooltipGlyph] = useState(false);
  const [tooltipGlyphComponent, setTooltipGlyphComponent] = useState<
    'star' | 'cross' | 'circle' | '🍍'
  >('star');
  const renderTooltipGlyph = useCallback(
    ({
      x,
      y,
      size,
      color,
      onPointerMove,
      onPointerOut,
      onPointerUp,
      isNearestDatum,
    }: RenderTooltipGlyphProps<CityTemperature>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp };
      if (tooltipGlyphComponent === 'star') {
        return (
          <GlyphStar
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        );
      }
      if (tooltipGlyphComponent === 'circle') {
        return (
          <GlyphDot left={x} top={y} stroke={glyphOutline} fill={color} r={size} {...handlers} />
        );
      }
      if (tooltipGlyphComponent === 'cross') {
        return (
          <GlyphCross
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        );
      }
      return (
        <text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          {isNearestDatum ? '🍍' : '🍌'}
        </text>
      );
    },
    [tooltipGlyphComponent, glyphOutline],
  );
  // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
  const colorAccessorFactory = useCallback(
    (dataKey: DataKey) => (d: CityTemperature) =>
      annotationDataKey === dataKey && d === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );

  const accessors = useMemo(
    () => ({
      x: {
        'San Francisco': renderHorizontally
          ? negativeValues
            ? getNegativeSfTemperature
            : getSfTemperature
          : getDate,
        'New York': renderHorizontally ? getNyTemperature : getDate,
        Austin: renderHorizontally ? getAustinTemperature : getDate,
      },
      y: {
        'San Francisco': renderHorizontally
          ? getDate
          : negativeValues
          ? getNegativeSfTemperature
          : getSfTemperature,
        'New York': renderHorizontally ? getDate : getNyTemperature,
        Austin: renderHorizontally ? getDate : getAustinTemperature,
      },
      date: getDate,
    }),
    [renderHorizontally, negativeValues],
  );

  const config = useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );

  // cannot snap to a stack position
  const canSnapTooltipToDatum =
    renderBarStackOrGroup !== 'barstack' && renderAreaLineOrStack !== 'areastack';

  return (
    <>
      {children({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum: data[annotationDataIndex],
        annotationLabelPosition,
        annotationType,
        colorAccessorFactory,
        config,
        curve:
          (curveType === 'cardinal' && curveCardinal) ||
          (curveType === 'step' && curveStep) ||
          curveLinear,
        data: fewerDatum
          ? missingValues
            ? dataSmallMissingValues
            : dataSmall
          : missingValues
          ? dataMissingValues
          : data,
        editAnnotationLabelPosition,
        numTicks,
        renderBarGroup: renderBarStackOrGroup === 'bargroup',
        renderBarSeries: renderBarStackOrGroup === 'bar',
        renderBarStack: renderBarStackOrGroup === 'barstack',
        renderGlyphSeries,
        renderGlyph,
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
        renderAreaSeries: renderAreaLineOrStack === 'area',
        renderAreaStack: renderAreaLineOrStack === 'areastack',
        renderLineSeries: renderAreaLineOrStack === 'line',
        setAnnotationDataIndex,
        setAnnotationDataKey,
        setAnnotationLabelPosition,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX: canSnapTooltipToDatum && snapTooltipToDatumX,
        snapTooltipToDatumY: canSnapTooltipToDatum && snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,
        ...getAnimatedOrUnanimatedComponents(useAnimatedComponents),
      })}
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
      <div className="controls">
        {/** data */}
        <div>
          <strong>data</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setNegativeValues(!negativeValues)}
              checked={negativeValues}
            />
            negative values (SF)
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setMissingValues(!missingValues)}
              checked={missingValues}
            />
            missing values
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setFewerDatum(!fewerDatum)}
              checked={fewerDatum}
            />
            fewer datum
          </label>
        </div>

        {/** theme */}
        <div>
          <strong>theme</strong>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(lightTheme)}
              checked={theme === lightTheme}
            />
            light
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(darkTheme)}
              checked={theme === darkTheme}
            />
            dark
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(customTheme)}
              checked={theme === customTheme}
            />
            custom
          </label>
        </div>

        <br />

        {/** series */}
        {/** orientation */}
        <div>
          <strong>series orientation</strong>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(false)}
              checked={!renderHorizontally}
            />
            vertical
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(true)}
              checked={renderHorizontally}
            />
            horizontal
          </label>
        </div>
        <div>
          <strong>line series</strong>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
                  setRenderBarStackOrGroup('none');
                }
                setRenderAreaLineOrStack('line');
              }}
              checked={renderAreaLineOrStack === 'line'}
            />
            line
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
                  setRenderBarStackOrGroup('none');
                }
                setRenderAreaLineOrStack('area');
              }}
              checked={renderAreaLineOrStack === 'area'}
            />
            area
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderBarStackOrGroup('none');
                setRenderAreaLineOrStack('areastack');
              }}
              checked={renderAreaLineOrStack === 'areastack'}
            />
            area stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderAreaLineOrStack('none')}
              checked={renderAreaLineOrStack === 'none'}
            />
            none
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>curve shape</strong>
          <label>
            <input
              type="radio"
              disabled={renderAreaLineOrStack === 'none'}
              onChange={() => setCurveType('linear')}
              checked={curveType === 'linear'}
            />
            linear
          </label>
          <label>
            <input
              type="radio"
              disabled={renderAreaLineOrStack === 'none'}
              onChange={() => setCurveType('cardinal')}
              checked={curveType === 'cardinal'}
            />
            cardinal (smooth)
          </label>
          <label>
            <input
              type="radio"
              disabled={renderAreaLineOrStack === 'none'}
              onChange={() => setCurveType('step')}
              checked={curveType === 'step'}
            />
            step
          </label>
        </div>
        {/** glyph */}
        <div>
          <strong>glyph series</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setRenderGlyphSeries(!renderGlyphSeries)}
              checked={renderGlyphSeries}
            />
            render glyphs
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              disabled={!renderGlyphSeries}
              onChange={() => setGlyphComponent('circle')}
              checked={glyphComponent === 'circle'}
            />
            circle
          </label>
          <label>
            <input
              type="radio"
              disabled={!renderGlyphSeries}
              onChange={() => setGlyphComponent('star')}
              checked={glyphComponent === 'star'}
            />
            star
          </label>
          <label>
            <input
              type="radio"
              disabled={!renderGlyphSeries}
              onChange={() => setGlyphComponent('cross')}
              checked={glyphComponent === 'cross'}
            />
            cross
          </label>
          <label>
            <input
              type="radio"
              disabled={!renderGlyphSeries}
              onChange={() => setGlyphComponent('🍍')}
              checked={glyphComponent === '🍍'}
            />
            🍍
          </label>
        </div>
        <div>
          <strong>bar series</strong>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderAreaLineOrStack === 'areastack') {
                  setRenderAreaLineOrStack('none');
                }
                setRenderBarStackOrGroup('bar');
              }}
              checked={renderBarStackOrGroup === 'bar'}
            />
            bar
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderAreaLineOrStack('none');
                setRenderBarStackOrGroup('barstack');
              }}
              checked={renderBarStackOrGroup === 'barstack'}
            />
            bar stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderAreaLineOrStack('none');
                setRenderBarStackOrGroup('bargroup');
              }}
              checked={renderBarStackOrGroup === 'bargroup'}
            />
            bar group
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('none')}
              checked={renderBarStackOrGroup === 'none'}
            />
            none
          </label>
        </div>
        <div>
          <strong>stack series offset</strong>
          <label>
            <input
              type="radio"
              disabled={
                renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'
              }
              onChange={() => setStackOffset(undefined)}
              checked={stackOffset == null}
            />
            auto (zero-baseline)
          </label>
          <label>
            <input
              type="radio"
              disabled={
                renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'
              }
              onChange={() => setStackOffset('expand')}
              checked={stackOffset === 'expand'}
            />
            expand (values sum to 1)
          </label>
          <label>
            <input
              type="radio"
              disabled={
                renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'
              }
              onChange={() => setStackOffset('wiggle')}
              checked={stackOffset === 'wiggle'}
            />
            wiggle (stream graph)
          </label>
        </div>

        <br />
        {/** tooltip */}
        <div>
          <strong>tooltip</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setShowTooltip(!showTooltip)}
              checked={showTooltip}
            />
            show tooltip
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip || !canSnapTooltipToDatum}
              onChange={() => setSnapTooltipToDatumX(!snapTooltipToDatumX)}
              checked={showTooltip && snapTooltipToDatumX}
            />
            snap tooltip to datum x
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip || !canSnapTooltipToDatum}
              onChange={() => setSnapTooltipToDatumY(!snapTooltipToDatumY)}
              checked={showTooltip && snapTooltipToDatumY}
            />
            snap tooltip to datum y
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setShowVerticalCrosshair(!showVerticalCrosshair)}
              checked={showTooltip && showVerticalCrosshair}
            />
            vertical crosshair
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setShowHorizontalCrosshair(!showHorizontalCrosshair)}
              checked={showTooltip && showHorizontalCrosshair}
            />
            horizontal crosshair
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setSharedTooltip(!sharedTooltip)}
              checked={showTooltip && sharedTooltip}
            />
            shared tooltip
          </label>
        </div>
        <div>
          <strong>tooltip gliph</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setEnableTooltipGlyph(!enableTooltipGlyph)}
              disabled={!canSnapTooltipToDatum}
              checked={enableTooltipGlyph}
            />
            show custom tooltip gliph
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              disabled={!enableTooltipGlyph || !canSnapTooltipToDatum}
              onChange={() => setTooltipGlyphComponent('circle')}
              checked={tooltipGlyphComponent === 'circle'}
            />
            circle
          </label>
          <label>
            <input
              type="radio"
              disabled={!enableTooltipGlyph || !canSnapTooltipToDatum}
              onChange={() => setTooltipGlyphComponent('star')}
              checked={tooltipGlyphComponent === 'star'}
            />
            star
          </label>
          <label>
            <input
              type="radio"
              disabled={!enableTooltipGlyph || !canSnapTooltipToDatum}
              onChange={() => setTooltipGlyphComponent('cross')}
              checked={tooltipGlyphComponent === 'cross'}
            />
            cross
          </label>
          <label>
            <input
              type="radio"
              disabled={!enableTooltipGlyph || !canSnapTooltipToDatum}
              onChange={() => setTooltipGlyphComponent('🍍')}
              checked={tooltipGlyphComponent === '🍍'}
            />
            🍍
          </label>
        </div>
        {/** annotation */}
        <div>
          <strong>annotation</strong> (click chart to update)
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey(null)}
              checked={annotationDataKey == null}
            />
            none
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('San Francisco')}
              checked={annotationDataKey === 'San Francisco'}
            />
            SF
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('New York')}
              checked={annotationDataKey === 'New York'}
            />
            NY
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('Austin')}
              checked={annotationDataKey === 'Austin'}
            />
            Austin
          </label>
          &nbsp;&nbsp;&nbsp;
          <strong>type</strong>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationType('circle')}
              checked={annotationType === 'circle'}
            />
            circle
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationType('line')}
              checked={annotationType === 'line'}
            />
            line
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              onChange={() => setEditAnnotationLabelPosition(!editAnnotationLabelPosition)}
              checked={editAnnotationLabelPosition}
            />
            edit label position
          </label>
        </div>

        <br />

        {/** axes */}
        <div>
          <strong>axes</strong>
          <label>
            <input
              type="radio"
              onChange={() => setXAxisOrientation('bottom')}
              checked={xAxisOrientation === 'bottom'}
            />
            bottom
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setXAxisOrientation('top')}
              checked={xAxisOrientation === 'top'}
            />
            top
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              onChange={() => setYAxisOrientation('left')}
              checked={yAxisOrientation === 'left'}
            />
            left
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setYAxisOrientation('right')}
              checked={yAxisOrientation === 'right'}
            />
            right
          </label>
        </div>

        {/** grid */}
        <div>
          <strong>grid</strong>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([true, false])}
              checked={showGridRows && !showGridColumns}
            />
            rows
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([false, true])}
              checked={!showGridRows && showGridColumns}
            />
            columns
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([true, true])}
              checked={showGridRows && showGridColumns}
            />
            both
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([false, false])}
              checked={!showGridRows && !showGridColumns}
            />
            none
          </label>
        </div>
        {/** animation trajectory */}
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => setUseAnimatedComponents(!useAnimatedComponents)}
              checked={useAnimatedComponents}
            />
            use animated components
          </label>

          {useAnimatedComponents && (
            <>
              &nbsp;&nbsp;&nbsp;
              <strong>axis + grid animation</strong>
              <label>
                <input
                  type="radio"
                  onChange={() => setAnimationTrajectory('center')}
                  checked={animationTrajectory === 'center'}
                />
                from center
              </label>
              <label>
                <input
                  type="radio"
                  onChange={() => setAnimationTrajectory('outside')}
                  checked={animationTrajectory === 'outside'}
                />
                from outside
              </label>
              <label>
                <input
                  type="radio"
                  onChange={() => setAnimationTrajectory('min')}
                  checked={animationTrajectory === 'min'}
                />
                from min
              </label>
              <label>
                <input
                  type="radio"
                  onChange={() => setAnimationTrajectory('max')}
                  checked={animationTrajectory === 'max'}
                />
                from max
              </label>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
