import React from 'react';
import { Bar } from '@visx/shape';
import { GradientDarkgreenGreen, GradientLightgreenGreen, GradientOrangeRed, GradientPinkBlue, GradientPinkRed, GradientPurpleOrange, GradientPurpleRed, GradientTealBlue, RadialGradient, LinearGradient, } from '@visx/gradient';
var defaultMargin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};
var Gradients = [
    GradientPinkRed,
    function (_a) {
        var id = _a.id;
        return <RadialGradient id={id} from="#55bdd5" to="#4f3681" r="80%"/>;
    },
    GradientOrangeRed,
    GradientPinkBlue,
    function (_a) {
        var id = _a.id;
        return <LinearGradient id={id} from="#351CAB" to="#621A61" rotate="-45"/>;
    },
    GradientLightgreenGreen,
    GradientPurpleOrange,
    GradientTealBlue,
    GradientPurpleRed,
    GradientDarkgreenGreen,
];
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var numColumns = width > 600 ? 5 : 2;
    var numRows = Gradients.length / numColumns;
    var columnWidth = Math.max(width / numColumns, 0);
    var rowHeight = Math.max((height - margin.bottom) / numRows, 0);
    return (<svg width={width} height={height}>
      {Gradients.map(function (Gradient, index) {
        var columnIndex = index % numColumns;
        var rowIndex = Math.floor(index / numColumns);
        var id = "visx-gradient-demo-" + index + "-" + rowIndex + columnIndex;
        return (<React.Fragment key={id}>
            
            <Gradient id={id}/>

            
            <Bar fill={"url(#" + id + ")"} x={columnIndex * columnWidth} y={rowIndex * rowHeight} width={columnWidth} height={rowHeight} stroke="#ffffff" strokeWidth={8} rx={14}/>
          </React.Fragment>);
    })}
    </svg>);
}
