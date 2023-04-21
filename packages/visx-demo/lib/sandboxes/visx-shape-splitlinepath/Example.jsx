import React, { useMemo } from 'react';
import { chunk } from 'lodash';
import { curveCardinal } from '@visx/curve';
import { LinePath, SplitLinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import generateSinSegments from './generateSinSegments';
import generateSnakePath from './generateSnakePath';
var getX = function (d) { return d.x; };
var getY = function (d) { return d.y; };
export var background = '#045275';
export var backgroundLight = '#089099';
export var foreground = '#b7e6a5';
var renderNumberSegment = function (_a) {
    var segment = _a.segment, styles = _a.styles;
    return (<g>
    {segment.map(function (_a, i) {
        var x = _a.x, y = _a.y;
        return i % 25 === 0 ? (<g key={i} transform={"translate(" + x + "," + y + ")"}>
          <circle r={2} fill="#222"/>
          <text key={i} dx={3} dy={3} fontSize={8}>
            {i}
          </text>
        </g>) : null;
    })}
  </g>);
};
/** Overlay growing circles instead of drawing a line */
var renderCircleSegment = function (_a) {
    var segment = _a.segment, styles = _a.styles;
    return (<g>
    {segment.map(function (_a, i) {
        var x = _a.x, y = _a.y;
        return i % 8 === 0 ? (<circle key={i} cx={x} cy={y} r={10 * (i / segment.length)} stroke={styles === null || styles === void 0 ? void 0 : styles.stroke} fill="transparent" strokeWidth={1}/>) : null;
    })}
  </g>);
};
var PADDING = 30;
export default function SplitLinePathExample(_a) {
    var width = _a.width, height = _a.height, _b = _a.numberOfWaves, numberOfWaves = _b === void 0 ? 10 : _b, _c = _a.pointsPerWave, pointsPerWave = _c === void 0 ? 100 : _c;
    var data = useMemo(function () { return ({
        leftToRight: generateSinSegments({
            width: width / 2 - PADDING * 2,
            height: height / 2 - PADDING * 2,
            numberOfWaves: numberOfWaves,
            pointsPerWave: pointsPerWave,
        }),
        rightToLeft: generateSinSegments({
            width: width / 2 - PADDING * 2,
            height: height / 2 - PADDING * 2,
            numberOfWaves: numberOfWaves,
            pointsPerWave: pointsPerWave,
            direction: 'right-to-left',
        }),
        topToBottom: generateSinSegments({
            width: width / 2 - PADDING * 2,
            height: height / 2 - PADDING * 2,
            numberOfWaves: 5,
            pointsPerWave: pointsPerWave,
            direction: 'top-to-bottom',
        }),
        bottomToTop: generateSinSegments({
            width: width / 2 - PADDING * 2,
            height: height / 2 - PADDING * 2,
            numberOfWaves: 5,
            pointsPerWave: pointsPerWave,
            direction: 'bottom-to-top',
        }),
        snake: chunk(generateSnakePath({ width: width / 4, height: height / 4, step: 20 }), 8),
    }); }, [width, height, numberOfWaves, pointsPerWave]);
    return width < 10 ? null : (<div>
      <svg width={width} height={height}>
        
        <LinearGradient id="visx-shape-splitlinepath-gradient" from={background} to={backgroundLight} fromOpacity={0.8} toOpacity={0.8}/>
        <rect x={0} y={0} width={width} height={height} fill="url(#visx-shape-splitlinepath-gradient)" rx={14}/>

        
        <g transform={"translate(" + PADDING + ", " + height / 4 + ")"}>
          
          <LinePath data={data.leftToRight.flat()} x={getX} y={getY} strokeWidth={8} stroke="#fff" strokeOpacity={0.15} curve={curveCardinal}/>

          <SplitLinePath sampleRate={2} segments={data.leftToRight} segmentation="x" x={getX} y={getY} curve={curveCardinal} styles={[
        { stroke: foreground, strokeWidth: 3 },
        { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
        { stroke: background, strokeWidth: 2 },
    ]}>
            {function (_a) {
        var segment = _a.segment, styles = _a.styles, index = _a.index;
        return index === numberOfWaves - 1 || index === 2 ? (renderCircleSegment({ segment: segment, styles: styles, index: index })) : (<LinePath data={segment} x={getX} y={getY} {...styles}/>);
    }}
          </SplitLinePath>
          <text dy="0.3em" fontSize={10} fontWeight="bold" textAnchor="middle">
            Start
          </text>
        </g>

        
        <g transform={"translate(" + (width / 2 - PADDING) + ", " + (height * 3) / 4 + ")"}>
          
          <LinePath data={data.rightToLeft.flat()} x={getX} y={getY} strokeWidth={8} stroke="#fff" strokeOpacity={0.15} curve={curveCardinal}/>

          <SplitLinePath sampleRate={1} segments={data.rightToLeft} segmentation="x" x={getX} y={getY} curve={curveCardinal} styles={[
        { stroke: foreground, strokeWidth: 3 },
        { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
        { stroke: background, strokeWidth: 2 },
    ]}>
            {function (_a) {
        var segment = _a.segment, styles = _a.styles, index = _a.index;
        return index === numberOfWaves - 1 || index === 2 ? (renderNumberSegment({ segment: segment, styles: styles, index: index })) : (<LinePath data={segment} x={getX} y={getY} {...styles}/>);
    }}
          </SplitLinePath>
          <text dy="0.3em" fontSize={10} fontWeight="bold" textAnchor="middle">
            Start
          </text>
        </g>

        
        <g transform={"translate(" + (width * 3) / 4 + ", " + PADDING + ")"}>
          
          <LinePath data={data.topToBottom.flat()} x={getX} y={getY} strokeWidth={8} stroke="#fff" strokeOpacity={0.15} curve={curveCardinal}/>

          <SplitLinePath sampleRate={1} segments={data.topToBottom} segmentation="y" x={getX} y={getY} curve={curveCardinal} styles={[
        { stroke: foreground, strokeWidth: 3 },
        { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
        { stroke: background, strokeWidth: 2 },
    ]}>
            {function (_a) {
        var segment = _a.segment, styles = _a.styles, index = _a.index;
        return index === numberOfWaves - 1 || index === 2 ? (renderNumberSegment({ segment: segment, styles: styles, index: index })) : (<LinePath data={segment} x={getX} y={getY} {...styles}/>);
    }}
          </SplitLinePath>
          <text dy="0.3em" fontSize={10} fontWeight="bold" textAnchor="middle">
            Start
          </text>
        </g>

        
        <g transform={"translate(" + (width * 3) / 4 + ", " + (height - PADDING) + ")"}>
          
          <LinePath data={data.bottomToTop.flat()} x={getX} y={getY} strokeWidth={8} stroke="#fff" strokeOpacity={0.15} curve={curveCardinal}/>

          <SplitLinePath sampleRate={1} segments={data.bottomToTop} segmentation="y" x={getX} y={getY} curve={curveCardinal} styles={[
        { stroke: foreground, strokeWidth: 3 },
        { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
        { stroke: background, strokeWidth: 2 },
    ]}>
            {function (_a) {
        var segment = _a.segment, styles = _a.styles, index = _a.index;
        return index === numberOfWaves - 1 || index === 2 ? (renderCircleSegment({ segment: segment, styles: styles, index: index })) : (<LinePath data={segment} x={getX} y={getY} {...styles}/>);
    }}
          </SplitLinePath>
          <text dy="0.3em" fontSize={10} fontWeight="bold" textAnchor="middle">
            Start
          </text>
        </g>
        
        <g transform={"translate(" + (width / 2 - width / 8) + ", " + (height / 2 - height / 8) + ")"}>
          
          <LinePath data={data.snake.flat()} x={getX} y={getY} strokeWidth={8} stroke="#fff" strokeOpacity={0.15}/>

          <SplitLinePath sampleRate={1} segments={data.snake} segmentation="length" x={getX} y={getY} styles={[
        { stroke: foreground, strokeWidth: 3 },
        { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9,5' },
        { stroke: background, strokeWidth: 2 },
    ]}/>
          <text x={width / 8} y={height / 8} dy="0.3em" fontSize={10} fontWeight="bold" textAnchor="middle">
            Start
          </text>
        </g>
      </svg>
    </div>);
}
