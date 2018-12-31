### &lt;Axis /&gt;

<a name="#Axis__axisClassName" href="#Axis__axisClassName">#</a> _Axis_.__axisClassName__&lt;string&gt;   

<a name="#Axis__axisLineClassName" href="#Axis__axisLineClassName">#</a> _Axis_.__axisLineClassName__&lt;string&gt;   

<a name="#Axis__children" href="#Axis__children">#</a> _Axis_.__children__&lt;func&gt;   

<a name="#Axis__hideAxisLine" href="#Axis__hideAxisLine">#</a> _Axis_.__hideAxisLine__&lt;bool&gt;  `default: false` 

<a name="#Axis__hideTicks" href="#Axis__hideTicks">#</a> _Axis_.__hideTicks__&lt;bool&gt;  `default: false` 

<a name="#Axis__hideZero" href="#Axis__hideZero">#</a> _Axis_.__hideZero__&lt;bool&gt;  `default: false` 

<a name="#Axis__label" href="#Axis__label">#</a> _Axis_.__label__&lt;string&gt;  `default: ''` 

<a name="#Axis__labelClassName" href="#Axis__labelClassName">#</a> _Axis_.__labelClassName__&lt;string&gt;   

<a name="#Axis__labelOffset" href="#Axis__labelOffset">#</a> _Axis_.__labelOffset__&lt;number&gt;  `default: 14` 

<a name="#Axis__labelProps" href="#Axis__labelProps">#</a> _Axis_.__labelProps__&lt;object&gt;  `default: {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'black'
}` 

<a name="#Axis__left" href="#Axis__left">#</a> _Axis_.__left__&lt;number&gt;  `default: 0` 

<a name="#Axis__numTicks" href="#Axis__numTicks">#</a> _Axis_.__numTicks__&lt;number&gt;  `default: 10` 

<a name="#Axis__orientation" href="#Axis__orientation">#</a> _Axis_.__orientation__&lt;enum(ORIENT.top|ORIENT.right|ORIENT.bottom|ORIENT.left)&gt;  `default: ORIENT.bottom` 

<a name="#Axis__rangePadding" href="#Axis__rangePadding">#</a> _Axis_.__rangePadding__&lt;number&gt;  `default: 0` 

<a name="#Axis__scale" href="#Axis__scale">#</a> _Axis_.__scale__&lt;func&gt; `required`  

<a name="#Axis__stroke" href="#Axis__stroke">#</a> _Axis_.__stroke__&lt;string&gt;  `default: 'black'` 

<a name="#Axis__strokeDasharray" href="#Axis__strokeDasharray">#</a> _Axis_.__strokeDasharray__&lt;string&gt;   

<a name="#Axis__strokeWidth" href="#Axis__strokeWidth">#</a> _Axis_.__strokeWidth__&lt;number&gt;  `default: 1` 

<a name="#Axis__tickClassName" href="#Axis__tickClassName">#</a> _Axis_.__tickClassName__&lt;string&gt;   

<a name="#Axis__tickComponent" href="#Axis__tickComponent">#</a> _Axis_.__tickComponent__&lt;func&gt;   

<a name="#Axis__tickFormat" href="#Axis__tickFormat">#</a> _Axis_.__tickFormat__&lt;func&gt;   

<a name="#Axis__tickLabelProps" href="#Axis__tickLabelProps">#</a> _Axis_.__tickLabelProps__&lt;func&gt;  `default: (tickValue, index) => ({
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'black'
})` 

<a name="#Axis__tickLength" href="#Axis__tickLength">#</a> _Axis_.__tickLength__&lt;number&gt;  `default: 8` 

<a name="#Axis__tickStroke" href="#Axis__tickStroke">#</a> _Axis_.__tickStroke__&lt;string&gt;  `default: 'black'` 

<a name="#Axis__tickTransform" href="#Axis__tickTransform">#</a> _Axis_.__tickTransform__&lt;string&gt;   

<a name="#Axis__tickValues" href="#Axis__tickValues">#</a> _Axis_.__tickValues__&lt;array&gt;   

<a name="#Axis__top" href="#Axis__top">#</a> _Axis_.__top__&lt;number&gt;  `default: 0` 

### &lt;AxisBottom /&gt;

<a name="#AxisBottom__axisClassName" href="#AxisBottom__axisClassName">#</a> _AxisBottom_.__axisClassName__&lt;string&gt;  

The class name applied to the outermost axis group element. 

<a name="#AxisBottom__axisLineClassName" href="#AxisBottom__axisLineClassName">#</a> _AxisBottom_.__axisLineClassName__&lt;string&gt;  

The class name applied to the axis line element. 

<a name="#AxisBottom__children" href="#AxisBottom__children">#</a> _AxisBottom_.__children__&lt;func&gt;  

For more control over rendering or to add event handlers to datum, pass a function as children. 

<a name="#AxisBottom__hideAxisLine" href="#AxisBottom__hideAxisLine">#</a> _AxisBottom_.__hideAxisLine__&lt;bool&gt;  

If true, will hide the axis line. 

<a name="#AxisBottom__hideTicks" href="#AxisBottom__hideTicks">#</a> _AxisBottom_.__hideTicks__&lt;bool&gt;  

If true, will hide the ticks (but not the tick labels). 

<a name="#AxisBottom__hideZero" href="#AxisBottom__hideZero">#</a> _AxisBottom_.__hideZero__&lt;bool&gt;  

If true, will hide the '0' value tick and tick label. 

<a name="#AxisBottom__label" href="#AxisBottom__label">#</a> _AxisBottom_.__label__&lt;string&gt;  

The text for the axis label. 

<a name="#AxisBottom__labelClassName" href="#AxisBottom__labelClassName">#</a> _AxisBottom_.__labelClassName__&lt;string&gt;  

The class name applied to the axis label text element. 

<a name="#AxisBottom__labelOffset" href="#AxisBottom__labelOffset">#</a> _AxisBottom_.__labelOffset__&lt;number&gt;  `default: 8`

Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically) 

<a name="#AxisBottom__labelProps" href="#AxisBottom__labelProps">#</a> _AxisBottom_.__labelProps__&lt;object&gt;  

Props applied to the axis label component. 

<a name="#AxisBottom__left" href="#AxisBottom__left">#</a> _AxisBottom_.__left__&lt;number&gt;  

A left pixel offset applied to the entire axis. 

<a name="#AxisBottom__numTicks" href="#AxisBottom__numTicks">#</a> _AxisBottom_.__numTicks__&lt;number&gt;  

The number of ticks wanted for the axis (note this is approximate) 

<a name="#AxisBottom__rangePadding" href="#AxisBottom__rangePadding">#</a> _AxisBottom_.__rangePadding__&lt;number&gt;  

Pixel padding to apply to both sides of the axis. 

<a name="#AxisBottom__scale" href="#AxisBottom__scale">#</a> _AxisBottom_.__scale__&lt;func&gt; `required` 

A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. 

<a name="#AxisBottom__stroke" href="#AxisBottom__stroke">#</a> _AxisBottom_.__stroke__&lt;string&gt;  

The color for the stroke of the lines. 

<a name="#AxisBottom__strokeDasharray" href="#AxisBottom__strokeDasharray">#</a> _AxisBottom_.__strokeDasharray__&lt;string&gt;  

The pattern of dashes in the stroke. 

<a name="#AxisBottom__strokeWidth" href="#AxisBottom__strokeWidth">#</a> _AxisBottom_.__strokeWidth__&lt;number&gt;  

The pixel value for the width of the lines. 

<a name="#AxisBottom__tickClassName" href="#AxisBottom__tickClassName">#</a> _AxisBottom_.__tickClassName__&lt;string&gt;  

The class name applied to each tick grou 

<a name="#AxisBottom__tickComponent" href="#AxisBottom__tickComponent">#</a> _AxisBottom_.__tickComponent__&lt;func&gt;   

<a name="#AxisBottom__tickFormat" href="#AxisBottom__tickFormat">#</a> _AxisBottom_.__tickFormat__&lt;func&gt;  

A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. 

<a name="#AxisBottom__tickLabelProps" href="#AxisBottom__tickLabelProps">#</a> _AxisBottom_.__tickLabelProps__&lt;func&gt;  `default: ({ tick, index }) => ({
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle'
})`

A function that returns props for a given tick label. 

<a name="#AxisBottom__tickLength" href="#AxisBottom__tickLength">#</a> _AxisBottom_.__tickLength__&lt;number&gt;  `default: 8`

The length of the tick lines. 

<a name="#AxisBottom__tickStroke" href="#AxisBottom__tickStroke">#</a> _AxisBottom_.__tickStroke__&lt;string&gt;  

The color for the tick's stroke value. 

<a name="#AxisBottom__tickTransform" href="#AxisBottom__tickTransform">#</a> _AxisBottom_.__tickTransform__&lt;string&gt;  

A custom SVG transform value to be applied to each tick group. 

<a name="#AxisBottom__tickValues" href="#AxisBottom__tickValues">#</a> _AxisBottom_.__tickValues__&lt;array&gt;  

An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`. 

<a name="#AxisBottom__top" href="#AxisBottom__top">#</a> _AxisBottom_.__top__&lt;number&gt;  

A top pixel offset applied to the entire axis. 

### &lt;AxisLeft /&gt;

<a name="#AxisLeft__axisClassName" href="#AxisLeft__axisClassName">#</a> _AxisLeft_.__axisClassName__&lt;string&gt;   

<a name="#AxisLeft__axisLineClassName" href="#AxisLeft__axisLineClassName">#</a> _AxisLeft_.__axisLineClassName__&lt;string&gt;   

<a name="#AxisLeft__children" href="#AxisLeft__children">#</a> _AxisLeft_.__children__&lt;func&gt;   

<a name="#AxisLeft__hideAxisLine" href="#AxisLeft__hideAxisLine">#</a> _AxisLeft_.__hideAxisLine__&lt;bool&gt;   

<a name="#AxisLeft__hideTicks" href="#AxisLeft__hideTicks">#</a> _AxisLeft_.__hideTicks__&lt;bool&gt;   

<a name="#AxisLeft__hideZero" href="#AxisLeft__hideZero">#</a> _AxisLeft_.__hideZero__&lt;bool&gt;   

<a name="#AxisLeft__label" href="#AxisLeft__label">#</a> _AxisLeft_.__label__&lt;string&gt;   

<a name="#AxisLeft__labelClassName" href="#AxisLeft__labelClassName">#</a> _AxisLeft_.__labelClassName__&lt;string&gt;   

<a name="#AxisLeft__labelOffset" href="#AxisLeft__labelOffset">#</a> _AxisLeft_.__labelOffset__&lt;number&gt;  `default: 36` 

<a name="#AxisLeft__labelProps" href="#AxisLeft__labelProps">#</a> _AxisLeft_.__labelProps__&lt;object&gt;   

<a name="#AxisLeft__left" href="#AxisLeft__left">#</a> _AxisLeft_.__left__&lt;number&gt;   

<a name="#AxisLeft__numTicks" href="#AxisLeft__numTicks">#</a> _AxisLeft_.__numTicks__&lt;number&gt;   

<a name="#AxisLeft__rangePadding" href="#AxisLeft__rangePadding">#</a> _AxisLeft_.__rangePadding__&lt;number&gt;   

<a name="#AxisLeft__scale" href="#AxisLeft__scale">#</a> _AxisLeft_.__scale__&lt;func&gt; `required`  

<a name="#AxisLeft__stroke" href="#AxisLeft__stroke">#</a> _AxisLeft_.__stroke__&lt;string&gt;   

<a name="#AxisLeft__strokeDasharray" href="#AxisLeft__strokeDasharray">#</a> _AxisLeft_.__strokeDasharray__&lt;string&gt;   

<a name="#AxisLeft__strokeWidth" href="#AxisLeft__strokeWidth">#</a> _AxisLeft_.__strokeWidth__&lt;number&gt;   

<a name="#AxisLeft__tickClassName" href="#AxisLeft__tickClassName">#</a> _AxisLeft_.__tickClassName__&lt;string&gt;   

<a name="#AxisLeft__tickComponent" href="#AxisLeft__tickComponent">#</a> _AxisLeft_.__tickComponent__&lt;func&gt;   

<a name="#AxisLeft__tickFormat" href="#AxisLeft__tickFormat">#</a> _AxisLeft_.__tickFormat__&lt;func&gt;   

<a name="#AxisLeft__tickLabelProps" href="#AxisLeft__tickLabelProps">#</a> _AxisLeft_.__tickLabelProps__&lt;func&gt;  `default: ({ tick, index }) => ({
  dx: '-0.25em',
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end'
})` 

<a name="#AxisLeft__tickLength" href="#AxisLeft__tickLength">#</a> _AxisLeft_.__tickLength__&lt;number&gt;  `default: 8` 

<a name="#AxisLeft__tickStroke" href="#AxisLeft__tickStroke">#</a> _AxisLeft_.__tickStroke__&lt;string&gt;   

<a name="#AxisLeft__tickTransform" href="#AxisLeft__tickTransform">#</a> _AxisLeft_.__tickTransform__&lt;string&gt;   

<a name="#AxisLeft__tickValues" href="#AxisLeft__tickValues">#</a> _AxisLeft_.__tickValues__&lt;array&gt;   

<a name="#AxisLeft__top" href="#AxisLeft__top">#</a> _AxisLeft_.__top__&lt;number&gt;   

### &lt;AxisRight /&gt;

<a name="#AxisRight__axisClassName" href="#AxisRight__axisClassName">#</a> _AxisRight_.__axisClassName__&lt;string&gt;   

<a name="#AxisRight__axisLineClassName" href="#AxisRight__axisLineClassName">#</a> _AxisRight_.__axisLineClassName__&lt;string&gt;   

<a name="#AxisRight__children" href="#AxisRight__children">#</a> _AxisRight_.__children__&lt;func&gt;   

<a name="#AxisRight__hideAxisLine" href="#AxisRight__hideAxisLine">#</a> _AxisRight_.__hideAxisLine__&lt;bool&gt;   

<a name="#AxisRight__hideTicks" href="#AxisRight__hideTicks">#</a> _AxisRight_.__hideTicks__&lt;bool&gt;   

<a name="#AxisRight__hideZero" href="#AxisRight__hideZero">#</a> _AxisRight_.__hideZero__&lt;bool&gt;   

<a name="#AxisRight__label" href="#AxisRight__label">#</a> _AxisRight_.__label__&lt;string&gt;   

<a name="#AxisRight__labelClassName" href="#AxisRight__labelClassName">#</a> _AxisRight_.__labelClassName__&lt;string&gt;   

<a name="#AxisRight__labelOffset" href="#AxisRight__labelOffset">#</a> _AxisRight_.__labelOffset__&lt;number&gt;  `default: 36` 

<a name="#AxisRight__labelProps" href="#AxisRight__labelProps">#</a> _AxisRight_.__labelProps__&lt;object&gt;   

<a name="#AxisRight__left" href="#AxisRight__left">#</a> _AxisRight_.__left__&lt;number&gt;   

<a name="#AxisRight__numTicks" href="#AxisRight__numTicks">#</a> _AxisRight_.__numTicks__&lt;number&gt;   

<a name="#AxisRight__rangePadding" href="#AxisRight__rangePadding">#</a> _AxisRight_.__rangePadding__&lt;number&gt;   

<a name="#AxisRight__scale" href="#AxisRight__scale">#</a> _AxisRight_.__scale__&lt;func&gt; `required`  

<a name="#AxisRight__stroke" href="#AxisRight__stroke">#</a> _AxisRight_.__stroke__&lt;string&gt;   

<a name="#AxisRight__strokeDasharray" href="#AxisRight__strokeDasharray">#</a> _AxisRight_.__strokeDasharray__&lt;string&gt;   

<a name="#AxisRight__strokeWidth" href="#AxisRight__strokeWidth">#</a> _AxisRight_.__strokeWidth__&lt;number&gt;   

<a name="#AxisRight__tickClassName" href="#AxisRight__tickClassName">#</a> _AxisRight_.__tickClassName__&lt;string&gt;   

<a name="#AxisRight__tickComponent" href="#AxisRight__tickComponent">#</a> _AxisRight_.__tickComponent__&lt;func&gt;   

<a name="#AxisRight__tickFormat" href="#AxisRight__tickFormat">#</a> _AxisRight_.__tickFormat__&lt;func&gt;   

<a name="#AxisRight__tickLabelProps" href="#AxisRight__tickLabelProps">#</a> _AxisRight_.__tickLabelProps__&lt;func&gt;  `default: ({ tick, index }) => ({
  dx: '0.25em',
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'start'
})` 

<a name="#AxisRight__tickLength" href="#AxisRight__tickLength">#</a> _AxisRight_.__tickLength__&lt;number&gt;  `default: 8` 

<a name="#AxisRight__tickStroke" href="#AxisRight__tickStroke">#</a> _AxisRight_.__tickStroke__&lt;string&gt;   

<a name="#AxisRight__tickTransform" href="#AxisRight__tickTransform">#</a> _AxisRight_.__tickTransform__&lt;string&gt;   

<a name="#AxisRight__tickValues" href="#AxisRight__tickValues">#</a> _AxisRight_.__tickValues__&lt;array&gt;   

<a name="#AxisRight__top" href="#AxisRight__top">#</a> _AxisRight_.__top__&lt;number&gt;   

### &lt;AxisTop /&gt;

<a name="#AxisTop__axisClassName" href="#AxisTop__axisClassName">#</a> _AxisTop_.__axisClassName__&lt;string&gt;   

<a name="#AxisTop__axisLineClassName" href="#AxisTop__axisLineClassName">#</a> _AxisTop_.__axisLineClassName__&lt;string&gt;   

<a name="#AxisTop__children" href="#AxisTop__children">#</a> _AxisTop_.__children__&lt;func&gt;   

<a name="#AxisTop__hideAxisLine" href="#AxisTop__hideAxisLine">#</a> _AxisTop_.__hideAxisLine__&lt;bool&gt;   

<a name="#AxisTop__hideTicks" href="#AxisTop__hideTicks">#</a> _AxisTop_.__hideTicks__&lt;bool&gt;   

<a name="#AxisTop__hideZero" href="#AxisTop__hideZero">#</a> _AxisTop_.__hideZero__&lt;bool&gt;   

<a name="#AxisTop__label" href="#AxisTop__label">#</a> _AxisTop_.__label__&lt;string&gt;   

<a name="#AxisTop__labelClassName" href="#AxisTop__labelClassName">#</a> _AxisTop_.__labelClassName__&lt;string&gt;   

<a name="#AxisTop__labelOffset" href="#AxisTop__labelOffset">#</a> _AxisTop_.__labelOffset__&lt;number&gt;  `default: 8` 

<a name="#AxisTop__labelProps" href="#AxisTop__labelProps">#</a> _AxisTop_.__labelProps__&lt;object&gt;   

<a name="#AxisTop__left" href="#AxisTop__left">#</a> _AxisTop_.__left__&lt;number&gt;   

<a name="#AxisTop__numTicks" href="#AxisTop__numTicks">#</a> _AxisTop_.__numTicks__&lt;number&gt;   

<a name="#AxisTop__rangePadding" href="#AxisTop__rangePadding">#</a> _AxisTop_.__rangePadding__&lt;number&gt;   

<a name="#AxisTop__scale" href="#AxisTop__scale">#</a> _AxisTop_.__scale__&lt;func&gt; `required`  

<a name="#AxisTop__stroke" href="#AxisTop__stroke">#</a> _AxisTop_.__stroke__&lt;string&gt;   

<a name="#AxisTop__strokeDasharray" href="#AxisTop__strokeDasharray">#</a> _AxisTop_.__strokeDasharray__&lt;string&gt;   

<a name="#AxisTop__strokeWidth" href="#AxisTop__strokeWidth">#</a> _AxisTop_.__strokeWidth__&lt;number&gt;   

<a name="#AxisTop__tickClassName" href="#AxisTop__tickClassName">#</a> _AxisTop_.__tickClassName__&lt;string&gt;   

<a name="#AxisTop__tickComponent" href="#AxisTop__tickComponent">#</a> _AxisTop_.__tickComponent__&lt;func&gt;   

<a name="#AxisTop__tickFormat" href="#AxisTop__tickFormat">#</a> _AxisTop_.__tickFormat__&lt;func&gt;   

<a name="#AxisTop__tickLabelProps" href="#AxisTop__tickLabelProps">#</a> _AxisTop_.__tickLabelProps__&lt;func&gt;  `default: ({ tick, index }) => ({
  dy: '-0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle'
})` 

<a name="#AxisTop__tickLength" href="#AxisTop__tickLength">#</a> _AxisTop_.__tickLength__&lt;number&gt;  `default: 8` 

<a name="#AxisTop__tickStroke" href="#AxisTop__tickStroke">#</a> _AxisTop_.__tickStroke__&lt;string&gt;   

<a name="#AxisTop__tickTransform" href="#AxisTop__tickTransform">#</a> _AxisTop_.__tickTransform__&lt;string&gt;   

<a name="#AxisTop__tickValues" href="#AxisTop__tickValues">#</a> _AxisTop_.__tickValues__&lt;array&gt;   

<a name="#AxisTop__top" href="#AxisTop__top">#</a> _AxisTop_.__top__&lt;number&gt;   
