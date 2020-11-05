/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo, useState } from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { GlyphProps } from '@visx/xychart/lib/types';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import customTheme from './customTheme';

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
const defaultAnnotationDataIndex = 10;

type Accessor = (d: CityTemperature) => number | string;

interface Accessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number };

type ProvidedProps = {
  accessors: {
    x: Accessors;
    y: Accessors;
    date: Accessor;
  };
  animationTrajectory: AnimationTrajectory;
  annotationDataKey: keyof Accessors | null;
  annotationDatum?: CityTemperature;
  annotationType?: 'line' | 'circle';
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
  data: CityTemperature[];
  numTicks: number;
  renderAreaSeries: boolean;
  renderBarGroup: boolean;
  renderBarSeries: boolean;
  renderBarStack: boolean;
  renderGlyph: React.FC<GlyphProps<CityTemperature>>;
  renderGlyphSeries: boolean;
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
  theme: XYChartTheme;
  xAxisOrientation: 'top' | 'bottom';
  yAxisOrientation: 'left' | 'right';
};

type ControlsProps = {
  children: (props: ProvidedProps) => React.ReactNode;
};

export default function ExampleControls({ children }: ControlsProps) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory>('center');
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([false, false]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [annotationDataKey, setAnnotationDataKey] = useState<ProvidedProps['annotationDataKey']>(
    'Austin',
  );
  const [annotationType, setAnnotationType] = useState<ProvidedProps['annotationType']>('circle');
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true);
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false);
  const [snapTooltipToDatumX, setSnapTooltipToDatumX] = useState(true);
  const [snapTooltipToDatumY, setSnapTooltipToDatumY] = useState(true);
  const [sharedTooltip, setSharedTooltip] = useState(true);
  const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<
    'bar' | 'stack' | 'group' | 'none'
  >('bar');
  const [renderLineOrAreaSeries, setRenderLineOrAreaSeries] = useState<'line' | 'area' | 'none'>(
    'line',
  );
  const [renderGlyphSeries, setRenderGlyphSeries] = useState(false);
  const [negativeValues, setNegativeValues] = useState(false);
  const [fewerDatum, setFewerDatum] = useState(false);
  const [missingValues, setMissingValues] = useState(false);
  const [glyphComponent, setGlyphComponent] = useState<'star' | 'cross' | 'circle' | '🍍'>('star');
  const [curveType, setCurveType] = useState<'linear' | 'cardinal' | 'step'>('linear');
  const themeBackground = theme.backgroundColor;
  const renderGlyph = useCallback(
    ({ size, color }: GlyphProps<CityTemperature>) => {
      if (glyphComponent === 'star') {
        return <GlyphStar stroke={themeBackground} fill={color} size={size * 8} />;
      }
      if (glyphComponent === 'circle') {
        return <GlyphDot stroke={themeBackground} fill={color} r={size / 2} />;
      }
      if (glyphComponent === 'cross') {
        return <GlyphCross stroke={themeBackground} fill={color} size={size * 8} />;
      }
      return (
        <text dx="-0.75em" dy="0.25em" fontSize={14}>
          🍍
        </text>
      );
    },
    [glyphComponent, themeBackground],
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

  const canRenderLineOrArea = renderBarStackOrGroup === 'bar' || renderBarStackOrGroup === 'none';

  return (
    <>
      {children({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum: data[defaultAnnotationDataIndex],
        annotationType,
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
        numTicks,
        renderBarGroup: renderBarStackOrGroup === 'group',
        renderBarSeries: renderBarStackOrGroup === 'bar',
        renderBarStack: renderBarStackOrGroup === 'stack',
        renderGlyphSeries,
        renderGlyph,
        renderHorizontally,
        renderAreaSeries: canRenderLineOrArea && renderLineOrAreaSeries === 'area',
        renderLineSeries: canRenderLineOrArea && renderLineOrAreaSeries === 'line',
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX: renderBarStackOrGroup !== 'stack' && snapTooltipToDatumX,
        snapTooltipToDatumY: renderBarStackOrGroup !== 'stack' && snapTooltipToDatumY,
        theme,
        xAxisOrientation,
        yAxisOrientation,
      })}
      <div className="controls">
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

        {/** series orientation */}
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
        </div>
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
              disabled={!showTooltip || renderBarStackOrGroup === 'stack'}
              onChange={() => setSnapTooltipToDatumX(!snapTooltipToDatumX)}
              checked={showTooltip && snapTooltipToDatumX}
            />
            snap tooltip to datum x
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip || renderBarStackOrGroup === 'stack'}
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
        {/** series */}
        <div>
          <strong>line series</strong>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea}
              onChange={() => setRenderLineOrAreaSeries('line')}
              checked={canRenderLineOrArea && renderLineOrAreaSeries === 'line'}
            />
            line
          </label>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea}
              onChange={() => setRenderLineOrAreaSeries('area')}
              checked={canRenderLineOrArea && renderLineOrAreaSeries === 'area'}
            />
            area
          </label>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea}
              onChange={() => setRenderLineOrAreaSeries('none')}
              checked={renderLineOrAreaSeries === 'none' || !canRenderLineOrArea}
            />
            none
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>curve shape</strong>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea || renderLineOrAreaSeries === 'none'}
              onChange={() => setCurveType('linear')}
              checked={curveType === 'linear'}
            />
            linear
          </label>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea || renderLineOrAreaSeries === 'none'}
              onChange={() => setCurveType('cardinal')}
              checked={curveType === 'cardinal'}
            />
            cardinal (smooth)
          </label>
          <label>
            <input
              type="radio"
              disabled={!canRenderLineOrArea || renderLineOrAreaSeries === 'none'}
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
              onChange={() => setRenderBarStackOrGroup('bar')}
              checked={renderBarStackOrGroup === 'bar'}
            />
            bar
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('stack')}
              checked={renderBarStackOrGroup === 'stack'}
            />
            bar stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('group')}
              checked={renderBarStackOrGroup === 'group'}
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
        {/** annotation */}
        <div>
          <strong>annotate</strong>
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
        </div>
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 8px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
      `}</style>
    </>
  );
}
