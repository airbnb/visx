var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint jsx-a11y/label-has-associated-control: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useEffect, useMemo, useState } from 'react';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent } from 'd3-array';
import { Annotation, EditableAnnotation } from '@visx/annotation';
var data = appleStock.slice(-100);
var getDate = function (d) { return new Date(d.date).valueOf(); };
var getStockValue = function (d) { return d.close; };
var annotateDatum = data[Math.floor(data.length / 2) + 4];
var approxTooltipHeight = 70;
export default function ExampleControls(_a) {
    var _b, _c;
    var width = _a.width, height = _a.height, _d = _a.compact, compact = _d === void 0 ? false : _d, children = _a.children;
    var xScale = useMemo(function () {
        return scaleTime({
            domain: extent(data, function (d) { return getDate(d); }),
            range: [0, width],
        });
    }, [width]);
    var yScale = useMemo(function () {
        return scaleLinear({
            domain: extent(data, function (d) { return getStockValue(d); }),
            range: [height - 100, 100],
        });
    }, [height]);
    var _e = useState(false), editLabelPosition = _e[0], setEditLabelPosition = _e[1];
    var _f = useState(false), editSubjectPosition = _f[0], setEditSubjectPosition = _f[1];
    var _g = useState('Title'), title = _g[0], setTitle = _g[1];
    var _h = useState(compact ? 'Subtitle' : 'Subtitle with deets and deets and deets and deets'), subtitle = _h[0], setSubtitle = _h[1];
    var _j = useState('elbow'), connectorType = _j[0], setConnectorType = _j[1];
    var _k = useState('circle'), subjectType = _k[0], setSubjectType = _k[1];
    var _l = useState(true), showAnchorLine = _l[0], setShowAnchorLine = _l[1];
    var _m = useState('svg'), labelType = _m[0], setLabelType = _m[1];
    var _o = useState('auto'), verticalAnchor = _o[0], setVerticalAnchor = _o[1];
    var _p = useState('auto'), horizontalAnchor = _p[0], setHorizontalAnchor = _p[1];
    var labelWidth = useState(compact ? 100 : 175)[0];
    var _q = useState({
        x: (_b = xScale(getDate(annotateDatum))) !== null && _b !== void 0 ? _b : 0,
        y: (_c = yScale(getStockValue(annotateDatum))) !== null && _c !== void 0 ? _c : 0,
        dx: compact ? -50 : -100,
        dy: compact ? -30 : -50,
    }), annotationPosition = _q[0], setAnnotationPosition = _q[1];
    // update annotation position when scale's change
    useEffect(function () {
        setAnnotationPosition(function (currPosition) {
            var _a, _b;
            return (__assign(__assign({}, currPosition), { x: (_a = xScale(getDate(annotateDatum))) !== null && _a !== void 0 ? _a : 0, y: (_b = yScale(getStockValue(annotateDatum))) !== null && _b !== void 0 ? _b : 0 }));
        });
    }, [xScale, yScale]);
    return (<>
      {children({
        AnnotationComponent: editLabelPosition || editSubjectPosition ? EditableAnnotation : Annotation,
        annotationPosition: annotationPosition,
        approxTooltipHeight: approxTooltipHeight,
        connectorType: connectorType,
        data: data,
        editLabelPosition: editLabelPosition,
        editSubjectPosition: editSubjectPosition,
        getDate: getDate,
        getStockValue: getStockValue,
        horizontalAnchor: horizontalAnchor === 'auto' ? undefined : horizontalAnchor,
        labelType: labelType,
        labelWidth: labelWidth,
        setAnnotationPosition: setAnnotationPosition,
        showAnchorLine: showAnchorLine,
        subjectType: subjectType,
        subtitle: subtitle,
        title: title,
        verticalAnchor: verticalAnchor === 'auto' ? undefined : verticalAnchor,
        xScale: xScale,
        yScale: yScale,
    })}
      {!compact && (<div className="controls">
          <div>
            <label>
              <strong>Title</strong>&nbsp;&nbsp;
              <input type="text" onChange={function (e) { return setTitle(e.target.value); }} value={title}/>
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              <strong>Subtitle</strong>&nbsp;&nbsp;
              <input type="text" onChange={function (e) { return setSubtitle(e.target.value); }} value={subtitle}/>
            </label>
            &nbsp;&nbsp;&nbsp;
            <label>
              <input type="checkbox" onChange={function () { return setEditSubjectPosition(!editSubjectPosition); }} checked={editSubjectPosition}/>
              Edit subject position
            </label>
            &nbsp;&nbsp;
            <label>
              <input type="checkbox" onChange={function () { return setEditLabelPosition(!editLabelPosition); }} checked={editLabelPosition}/>
              Edit label position
            </label>
          </div>
          <div>
            <strong>Label content type</strong>
            <label>
              <input type="radio" onChange={function () { return setLabelType('svg'); }} checked={labelType === 'svg'}/>
              Svg
            </label>
            <label>
              <input type="radio" onChange={function () { return setLabelType('html'); }} checked={labelType === 'html'}/>
              Html
            </label>
          </div>
          <div>
            <strong>Connector type</strong>
            <label>
              <input type="radio" onChange={function () { return setConnectorType('elbow'); }} checked={connectorType === 'elbow'}/>
              Elbow
            </label>
            <label>
              <input type="radio" onChange={function () { return setConnectorType('line'); }} checked={connectorType === 'line'}/>
              Straight line
            </label>
          </div>
          <div>
            <strong>Subject type</strong>
            <label>
              <input type="radio" onChange={function () { return setSubjectType('circle'); }} checked={subjectType === 'circle'}/>
              Circle
            </label>
            <label>
              <input type="radio" onChange={function () { return setSubjectType('vertical-line'); }} checked={subjectType === 'vertical-line'}/>
              Vertical line
            </label>
            <label>
              <input type="radio" onChange={function () { return setSubjectType('horizontal-line'); }} checked={subjectType === 'horizontal-line'}/>
              Horizontal line
            </label>
          </div>
          <div>
            <strong>Horizontal label anchor</strong>
            <label>
              <input type="radio" onChange={function () { return setHorizontalAnchor('auto'); }} checked={horizontalAnchor === 'auto'}/>
              auto
            </label>
            <label>
              <input type="radio" onChange={function () { return setHorizontalAnchor('start'); }} checked={horizontalAnchor === 'start'}/>
              left
            </label>
            <label>
              <input type="radio" onChange={function () { return setHorizontalAnchor('middle'); }} checked={horizontalAnchor === 'middle'}/>
              middle
            </label>
            <label>
              <input type="radio" onChange={function () { return setHorizontalAnchor('end'); }} checked={horizontalAnchor === 'end'}/>
              right
            </label>
          </div>
          <div>
            <strong>Vertical label anchor</strong>
            <label>
              <input type="radio" onChange={function () { return setVerticalAnchor('auto'); }} checked={verticalAnchor === 'auto'}/>
              auto
            </label>
            <label>
              <input type="radio" onChange={function () { return setVerticalAnchor('start'); }} checked={verticalAnchor === 'start'}/>
              top
            </label>
            <label>
              <input type="radio" onChange={function () { return setVerticalAnchor('middle'); }} checked={verticalAnchor === 'middle'}/>
              middle
            </label>
            <label>
              <input type="radio" onChange={function () { return setVerticalAnchor('end'); }} checked={verticalAnchor === 'end'}/>
              bottom
            </label>
            <div>
              <label>
                <input type="checkbox" onChange={function () { return setShowAnchorLine(!showAnchorLine); }} checked={showAnchorLine}/>
                Show anchor line
              </label>
            </div>
          </div>
        </div>)}
      <style jsx>{"\n        .controls {\n          font-size: 13px;\n          line-height: 1.5em;\n        }\n        .controls > div {\n          margin-bottom: 4px;\n        }\n      "}</style>
    </>);
}
