import React from 'react';
import { format } from 'd3-format';
import { scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';
import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph';
import { Legend, LegendLinear, LegendQuantile, LegendOrdinal, LegendSize, LegendThreshold, LegendItem, LegendLabel, } from '@visx/legend';
var oneDecimalFormat = format('.1f');
var sizeScale = scaleLinear({
    domain: [0, 10],
    range: [5, 13],
});
var sizeColorScale = scaleLinear({
    domain: [0, 10],
    range: ['#75fcfc', '#3236b8'],
});
var quantileScale = scaleQuantile({
    domain: [0, 0.15],
    range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8'],
});
var linearScale = scaleLinear({
    domain: [0, 10],
    range: ['#ed4fbb', '#e9a039'],
});
var thresholdScale = scaleThreshold({
    domain: [0.01, 0.02, 0.04, 0.06, 0.08],
    range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
});
var ordinalColorScale = scaleOrdinal({
    domain: ['a', 'b', 'c', 'd'],
    range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
});
var ordinalColor2Scale = scaleOrdinal({
    domain: ['a', 'b', 'c', 'd'],
    range: ['#fae856', '#f29b38', '#e64357', '#8386f7'],
});
var shapeScale = scaleOrdinal({
    domain: ['a', 'b', 'c', 'd', 'e'],
    range: [
        <GlyphStar key="a" size={50} top={50 / 6} left={50 / 6} fill="#dd59b8"/>,
        <GlyphWye key="b" size={50} top={50 / 6} left={50 / 6} fill="#de6a9a"/>,
        <GlyphTriangle key="c" size={50} top={50 / 6} left={50 / 6} fill="#de7d7b"/>,
        <GlyphDiamond key="d" size={50} top={50 / 6} left={50 / 6} fill="#df905f"/>,
        function () { return (<text key="e" fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
        $
      </text>); },
    ],
});
function LegendDemo(_a) {
    var title = _a.title, children = _a.children;
    return (<div className="legend">
      <div className="title">{title}</div>
      {children}
      <style jsx>{"\n        .legend {\n          line-height: 0.9em;\n          color: #efefef;\n          font-size: 10px;\n          font-family: arial;\n          padding: 10px 10px;\n          float: left;\n          border: 1px solid rgba(255, 255, 255, 0.3);\n          border-radius: 8px;\n          margin: 5px 5px;\n        }\n        .title {\n          font-size: 12px;\n          margin-bottom: 10px;\n          font-weight: 100;\n        }\n      "}</style>
    </div>);
}
var legendGlyphSize = 15;
export default function Example(_a) {
    var _b = _a.events, events = _b === void 0 ? false : _b;
    return (<div className="legends">
      <LegendDemo title="Size">
        <LegendSize scale={sizeScale}>
          {function (labels) {
        return labels.map(function (label) {
            var _a;
            var size = (_a = sizeScale(label.datum)) !== null && _a !== void 0 ? _a : 0;
            var color = sizeColorScale(label.datum);
            return (<LegendItem key={"legend-" + label.text + "-" + label.index} onClick={function () {
                if (events)
                    alert("clicked: " + JSON.stringify(label));
            }}>
                  <svg width={size} height={size} style={{ margin: '5px 0' }}>
                    <circle fill={color} r={size / 2} cx={size / 2} cy={size / 2}/>
                  </svg>
                  <LegendLabel align="left" margin="0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>);
        });
    }}
        </LegendSize>
      </LegendDemo>
      <LegendDemo title="Quantile">
        <LegendQuantile scale={quantileScale}>
          {function (labels) {
        return labels.map(function (label, i) { return (<LegendItem key={"legend-" + i} onClick={function () {
            if (events)
                alert("clicked: " + JSON.stringify(label));
        }}>
                <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '2px 0' }}>
                  <circle fill={label.value} r={legendGlyphSize / 2} cx={legendGlyphSize / 2} cy={legendGlyphSize / 2}/>
                </svg>
                <LegendLabel align="left" margin="0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>); });
    }}
        </LegendQuantile>
      </LegendDemo>
      <LegendDemo title="Linear">
        <LegendLinear scale={linearScale} labelFormat={function (d, i) { return (i % 2 === 0 ? oneDecimalFormat(d) : ''); }}>
          {function (labels) {
        return labels.map(function (label, i) { return (<LegendItem key={"legend-quantile-" + i} onClick={function () {
            if (events)
                alert("clicked: " + JSON.stringify(label));
        }}>
                <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '2px 0' }}>
                  <circle fill={label.value} r={legendGlyphSize / 2} cx={legendGlyphSize / 2} cy={legendGlyphSize / 2}/>
                </svg>
                <LegendLabel align="left" margin="0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>); });
    }}
        </LegendLinear>
      </LegendDemo>
      <LegendDemo title="Threshold">
        <LegendThreshold scale={thresholdScale}>
          {function (labels) {
        return labels.reverse().map(function (label, i) { return (<LegendItem key={"legend-quantile-" + i} margin="1px 0" onClick={function () {
            if (events)
                alert("clicked: " + JSON.stringify(label));
        }}>
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize}/>
                </svg>
                <LegendLabel align="left" margin="2px 0 0 10px">
                  {label.text}
                </LegendLabel>
              </LegendItem>); });
    }}
        </LegendThreshold>
      </LegendDemo>
      <LegendDemo title="Ordinal">
        <LegendOrdinal scale={ordinalColorScale} labelFormat={function (label) { return "" + label.toUpperCase(); }}>
          {function (labels) { return (<div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map(function (label, i) { return (<LegendItem key={"legend-quantile-" + i} margin="0 5px" onClick={function () {
        if (events)
            alert("clicked: " + JSON.stringify(label));
    }}>
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize}/>
                  </svg>
                  <LegendLabel align="left" margin="0 0 0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>); })}
            </div>); }}
        </LegendOrdinal>
      </LegendDemo>
      <LegendDemo title="Custom Legend">
        <Legend scale={shapeScale}>
          {function (labels) { return (<div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map(function (label, i) {
        var color = ordinalColor2Scale(label.datum);
        var shape = shapeScale(label.datum);
        var isValidElement = React.isValidElement(shape);
        return (<LegendItem key={"legend-quantile-" + i} margin="0 4px 0 0" flexDirection="column" onClick={function () {
            var datum = label.datum, index = label.index;
            if (events)
                alert("clicked: " + JSON.stringify({ datum: datum, color: color, index: index }));
        }}>
                    <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '0 0 8px 0' }}>
                      {isValidElement
            ? React.cloneElement(shape)
            : React.createElement(shape, {
                fill: color,
            })}
                    </svg>
                    <LegendLabel align="left" margin={0}>
                      {label.text}
                    </LegendLabel>
                  </LegendItem>);
    })}
            </div>); }}
        </Legend>
      </LegendDemo>

      <style jsx>{"\n        .legends {\n          font-family: arial;\n          font-weight: 900;\n          background-color: black;\n          border-radius: 14px;\n          padding: 24px 24px 24px 32px;\n          overflow-y: auto;\n          flex-grow: 1;\n        }\n        .chart h2 {\n          margin-left: 10px;\n        }\n      "}</style>
    </div>);
}
