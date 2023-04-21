var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { HtmlLabel, Label, Connector, CircleSubject, LineSubject } from '@visx/annotation';
import { LinePath } from '@visx/shape';
import ExampleControls from './ExampleControls';
import findNearestDatum from './findNearestDatum';
export var orange = '#ff7e67';
export var greens = ['#ecf4f3', '#68b0ab', '#006a71'];
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.compact, compact = _b === void 0 ? false : _b;
    return (<ExampleControls width={width} height={height} compact={compact}>
      {function (_a) {
        var AnnotationComponent = _a.AnnotationComponent, annotationPosition = _a.annotationPosition, approxTooltipHeight = _a.approxTooltipHeight, connectorType = _a.connectorType, data = _a.data, editLabelPosition = _a.editLabelPosition, editSubjectPosition = _a.editSubjectPosition, getDate = _a.getDate, getStockValue = _a.getStockValue, horizontalAnchor = _a.horizontalAnchor, labelType = _a.labelType, labelWidth = _a.labelWidth, setAnnotationPosition = _a.setAnnotationPosition, showAnchorLine = _a.showAnchorLine, subjectType = _a.subjectType, subtitle = _a.subtitle, title = _a.title, verticalAnchor = _a.verticalAnchor, xScale = _a.xScale, yScale = _a.yScale;
        return (<svg width={width} height={height}>
          <rect width={width} height={height} fill={greens[0]}/>
          <LinePath stroke={greens[2]} strokeWidth={2} data={data} x={function (d) { var _a; return (_a = xScale(getDate(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = yScale(getStockValue(d))) !== null && _a !== void 0 ? _a : 0; }}/>
          <AnnotationComponent width={width} height={height} x={annotationPosition.x} y={annotationPosition.y} dx={annotationPosition.dx} dy={annotationPosition.dy} canEditLabel={editLabelPosition} canEditSubject={editSubjectPosition} onDragEnd={function (_a) {
            var _b, _c;
            var event = _a.event, nextPosition = __rest(_a, ["event"]);
            // snap Annotation to the nearest data point
            var nearestDatum = findNearestDatum({
                accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
                data: data,
                scale: subjectType === 'horizontal-line' ? yScale : xScale,
                value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
            });
            var x = (_b = xScale(getDate(nearestDatum))) !== null && _b !== void 0 ? _b : 0;
            var y = (_c = yScale(getStockValue(nearestDatum))) !== null && _c !== void 0 ? _c : 0;
            // flip label to keep in view
            var shouldFlipDx = (nextPosition.dx > 0 && x + nextPosition.dx + labelWidth > width) ||
                (nextPosition.dx < 0 && x + nextPosition.dx - labelWidth <= 0);
            var shouldFlipDy = // 100 is est. tooltip height
             (nextPosition.dy > 0 && height - (y + nextPosition.dy) < approxTooltipHeight) ||
                (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
            setAnnotationPosition({
                x: x,
                y: y,
                dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
                dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
            });
        }}>
            <Connector stroke={orange} type={connectorType}/>
            {labelType === 'svg' ? (<Label backgroundFill="white" showAnchorLine={showAnchorLine} anchorLineStroke={greens[2]} backgroundProps={{ stroke: greens[1] }} fontColor={greens[2]} horizontalAnchor={horizontalAnchor} subtitle={subtitle} title={title} verticalAnchor={verticalAnchor} width={labelWidth}/>) : (<HtmlLabel showAnchorLine={showAnchorLine} anchorLineStroke={greens[2]} horizontalAnchor={horizontalAnchor} verticalAnchor={verticalAnchor} containerStyle={{
            width: labelWidth,
            background: 'white',
            border: "1px solid " + greens[1],
            borderRadius: 2,
            color: greens[2],
            fontSize: '0.55em',
            lineHeight: '1em',
            padding: '0 0.4em 0 1em',
            fontWeight: 200,
        }}>
                <h3 style={{ margin: '1em 0 -0.5em' }}>{title}</h3>
                <p>{subtitle}</p>
              </HtmlLabel>)}
            {subjectType === 'circle' && <CircleSubject stroke={orange}/>}
            {subjectType !== 'circle' && (<LineSubject orientation={subjectType === 'vertical-line' ? 'vertical' : 'horizontal'} stroke={orange} min={0} max={subjectType === 'vertical-line' ? height : width}/>)}
          </AnnotationComponent>
        </svg>);
    }}
    </ExampleControls>);
}
