# @vx/axis

<p>
  <a title="@vx/axis npm downloads" href="https://www.npmjs.com/package/@vx/axis">
    <img src="https://img.shields.io/npm/dm/@vx/axis.svg?style=flat-square" />
  </a>
</p>

An axis component consists of a line with ticks, tick labels, and an axis label that helps viewers interpret your graph.

You can use one of the 4 pre-made axes, or you can create your own based on the `<Axis />` element.


## Installation

```
npm install --save @vx/axis
```


## Components



  - [Axis](#axis-)
  - [AxisBottom](#axisbottom-)
  - [AxisLeft](#axisleft-)
  - [AxisRight](#axisright-)
  - [AxisTop](#axistop-)

## API



### &lt;Axis /&gt;


<a name="Axis__axisClassName" href="#Axis__axisClassName">#</a> *Axis*.**axisClassName**&lt;string&gt;  

<a name="Axis__axisLineClassName" href="#Axis__axisLineClassName">#</a> *Axis*.**axisLineClassName**&lt;string&gt;  

<a name="Axis__children" href="#Axis__children">#</a> *Axis*.**children**&lt;func&gt;  

<a name="Axis__hideAxisLine" href="#Axis__hideAxisLine">#</a> *Axis*.**hideAxisLine**&lt;bool&gt; 

Default:
```js
false
```
 

<a name="Axis__hideTicks" href="#Axis__hideTicks">#</a> *Axis*.**hideTicks**&lt;bool&gt; 

Default:
```js
false
```
 

<a name="Axis__hideZero" href="#Axis__hideZero">#</a> *Axis*.**hideZero**&lt;bool&gt; 

Default:
```js
false
```
 

<a name="Axis__label" href="#Axis__label">#</a> *Axis*.**label**&lt;string&gt; 

Default:
```js
''
```
 

<a name="Axis__labelClassName" href="#Axis__labelClassName">#</a> *Axis*.**labelClassName**&lt;string&gt;  

<a name="Axis__labelOffset" href="#Axis__labelOffset">#</a> *Axis*.**labelOffset**&lt;number&gt; 

Default:
```js
14
```
 

<a name="Axis__labelProps" href="#Axis__labelProps">#</a> *Axis*.**labelProps**&lt;object&gt; 

Default:
```js
{
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'black'
}
```
 

<a name="Axis__left" href="#Axis__left">#</a> *Axis*.**left**&lt;number&gt; 

Default:
```js
0
```
 

<a name="Axis__numTicks" href="#Axis__numTicks">#</a> *Axis*.**numTicks**&lt;number&gt; 

Default:
```js
10
```
 

<a name="Axis__orientation" href="#Axis__orientation">#</a> *Axis*.**orientation**&lt;enum(ORIENT.top|ORIENT.right|ORIENT.bottom|ORIENT.left)&gt; 

Default:
```js
ORIENT.bottom
```
 

<a name="Axis__rangePadding" href="#Axis__rangePadding">#</a> *Axis*.**rangePadding**&lt;number&gt; 

Default:
```js
0
```
 

<a name="Axis__scale" href="#Axis__scale">#</a> *Axis*.**scale**&lt;func&gt; `required` 

<a name="Axis__stroke" href="#Axis__stroke">#</a> *Axis*.**stroke**&lt;string&gt; 

Default:
```js
'black'
```
 

<a name="Axis__strokeDasharray" href="#Axis__strokeDasharray">#</a> *Axis*.**strokeDasharray**&lt;string&gt;  

<a name="Axis__strokeWidth" href="#Axis__strokeWidth">#</a> *Axis*.**strokeWidth**&lt;number&gt; 

Default:
```js
1
```
 

<a name="Axis__tickClassName" href="#Axis__tickClassName">#</a> *Axis*.**tickClassName**&lt;string&gt;  

<a name="Axis__tickComponent" href="#Axis__tickComponent">#</a> *Axis*.**tickComponent**&lt;func&gt;  

<a name="Axis__tickFormat" href="#Axis__tickFormat">#</a> *Axis*.**tickFormat**&lt;func&gt;  

<a name="Axis__tickLabelProps" href="#Axis__tickLabelProps">#</a> *Axis*.**tickLabelProps**&lt;func&gt; 

Default:
```js
(tickValue, index) => ({
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'black'
})
```
 

<a name="Axis__tickLength" href="#Axis__tickLength">#</a> *Axis*.**tickLength**&lt;number&gt; 

Default:
```js
8
```
 

<a name="Axis__tickStroke" href="#Axis__tickStroke">#</a> *Axis*.**tickStroke**&lt;string&gt; 

Default:
```js
'black'
```
 

<a name="Axis__tickTransform" href="#Axis__tickTransform">#</a> *Axis*.**tickTransform**&lt;string&gt;  

<a name="Axis__tickValues" href="#Axis__tickValues">#</a> *Axis*.**tickValues**&lt;array&gt;  

<a name="Axis__top" href="#Axis__top">#</a> *Axis*.**top**&lt;number&gt; 

Default:
```js
0
```
 

### &lt;AxisBottom /&gt;


<a name="AxisBottom__axisClassName" href="#AxisBottom__axisClassName">#</a> *AxisBottom*.**axisClassName**&lt;string&gt; 

The class name applied to the outermost axis group element. 

<a name="AxisBottom__axisLineClassName" href="#AxisBottom__axisLineClassName">#</a> *AxisBottom*.**axisLineClassName**&lt;string&gt; 

The class name applied to the axis line element. 

<a name="AxisBottom__children" href="#AxisBottom__children">#</a> *AxisBottom*.**children**&lt;func&gt; 

For more control over rendering or to add event handlers to datum, pass a function as children. 

<a name="AxisBottom__hideAxisLine" href="#AxisBottom__hideAxisLine">#</a> *AxisBottom*.**hideAxisLine**&lt;bool&gt; 

If true, will hide the axis line. 

<a name="AxisBottom__hideTicks" href="#AxisBottom__hideTicks">#</a> *AxisBottom*.**hideTicks**&lt;bool&gt; 

If true, will hide the ticks (but not the tick labels). 

<a name="AxisBottom__hideZero" href="#AxisBottom__hideZero">#</a> *AxisBottom*.**hideZero**&lt;bool&gt; 

If true, will hide the '0' value tick and tick label. 

<a name="AxisBottom__label" href="#AxisBottom__label">#</a> *AxisBottom*.**label**&lt;string&gt; 

The text for the axis label. 

<a name="AxisBottom__labelClassName" href="#AxisBottom__labelClassName">#</a> *AxisBottom*.**labelClassName**&lt;string&gt; 

The class name applied to the axis label text element. 

<a name="AxisBottom__labelOffset" href="#AxisBottom__labelOffset">#</a> *AxisBottom*.**labelOffset**&lt;number&gt; 

Default:
```js
8
```


Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically) 

<a name="AxisBottom__labelProps" href="#AxisBottom__labelProps">#</a> *AxisBottom*.**labelProps**&lt;object&gt; 

Props applied to the axis label component. 

<a name="AxisBottom__left" href="#AxisBottom__left">#</a> *AxisBottom*.**left**&lt;number&gt; 

A left pixel offset applied to the entire axis. 

<a name="AxisBottom__numTicks" href="#AxisBottom__numTicks">#</a> *AxisBottom*.**numTicks**&lt;number&gt; 

The number of ticks wanted for the axis (note this is approximate) 

<a name="AxisBottom__rangePadding" href="#AxisBottom__rangePadding">#</a> *AxisBottom*.**rangePadding**&lt;number&gt; 

Pixel padding to apply to both sides of the axis. 

<a name="AxisBottom__scale" href="#AxisBottom__scale">#</a> *AxisBottom*.**scale**&lt;func&gt; `required`

A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. 

<a name="AxisBottom__stroke" href="#AxisBottom__stroke">#</a> *AxisBottom*.**stroke**&lt;string&gt; 

The color for the stroke of the lines. 

<a name="AxisBottom__strokeDasharray" href="#AxisBottom__strokeDasharray">#</a> *AxisBottom*.**strokeDasharray**&lt;string&gt; 

The pattern of dashes in the stroke. 

<a name="AxisBottom__strokeWidth" href="#AxisBottom__strokeWidth">#</a> *AxisBottom*.**strokeWidth**&lt;number&gt; 

The pixel value for the width of the lines. 

<a name="AxisBottom__tickClassName" href="#AxisBottom__tickClassName">#</a> *AxisBottom*.**tickClassName**&lt;string&gt; 

The class name applied to each tick grou 

<a name="AxisBottom__tickComponent" href="#AxisBottom__tickComponent">#</a> *AxisBottom*.**tickComponent**&lt;func&gt;  

<a name="AxisBottom__tickFormat" href="#AxisBottom__tickFormat">#</a> *AxisBottom*.**tickFormat**&lt;func&gt; 

A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. 

<a name="AxisBottom__tickLabelProps" href="#AxisBottom__tickLabelProps">#</a> *AxisBottom*.**tickLabelProps**&lt;func&gt; 

Default:
```js
({ tick, index }) => ({
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle'
})
```


A function that returns props for a given tick label. 

<a name="AxisBottom__tickLength" href="#AxisBottom__tickLength">#</a> *AxisBottom*.**tickLength**&lt;number&gt; 

Default:
```js
8
```


The length of the tick lines. 

<a name="AxisBottom__tickStroke" href="#AxisBottom__tickStroke">#</a> *AxisBottom*.**tickStroke**&lt;string&gt; 

The color for the tick's stroke value. 

<a name="AxisBottom__tickTransform" href="#AxisBottom__tickTransform">#</a> *AxisBottom*.**tickTransform**&lt;string&gt; 

A custom SVG transform value to be applied to each tick group. 

<a name="AxisBottom__tickValues" href="#AxisBottom__tickValues">#</a> *AxisBottom*.**tickValues**&lt;array&gt; 

An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`. 

<a name="AxisBottom__top" href="#AxisBottom__top">#</a> *AxisBottom*.**top**&lt;number&gt; 

A top pixel offset applied to the entire axis. 

### &lt;AxisLeft /&gt;


<a name="AxisLeft__axisClassName" href="#AxisLeft__axisClassName">#</a> *AxisLeft*.**axisClassName**&lt;string&gt;  

<a name="AxisLeft__axisLineClassName" href="#AxisLeft__axisLineClassName">#</a> *AxisLeft*.**axisLineClassName**&lt;string&gt;  

<a name="AxisLeft__children" href="#AxisLeft__children">#</a> *AxisLeft*.**children**&lt;func&gt;  

<a name="AxisLeft__hideAxisLine" href="#AxisLeft__hideAxisLine">#</a> *AxisLeft*.**hideAxisLine**&lt;bool&gt;  

<a name="AxisLeft__hideTicks" href="#AxisLeft__hideTicks">#</a> *AxisLeft*.**hideTicks**&lt;bool&gt;  

<a name="AxisLeft__hideZero" href="#AxisLeft__hideZero">#</a> *AxisLeft*.**hideZero**&lt;bool&gt;  

<a name="AxisLeft__label" href="#AxisLeft__label">#</a> *AxisLeft*.**label**&lt;string&gt;  

<a name="AxisLeft__labelClassName" href="#AxisLeft__labelClassName">#</a> *AxisLeft*.**labelClassName**&lt;string&gt;  

<a name="AxisLeft__labelOffset" href="#AxisLeft__labelOffset">#</a> *AxisLeft*.**labelOffset**&lt;number&gt; 

Default:
```js
36
```
 

<a name="AxisLeft__labelProps" href="#AxisLeft__labelProps">#</a> *AxisLeft*.**labelProps**&lt;object&gt;  

<a name="AxisLeft__left" href="#AxisLeft__left">#</a> *AxisLeft*.**left**&lt;number&gt;  

<a name="AxisLeft__numTicks" href="#AxisLeft__numTicks">#</a> *AxisLeft*.**numTicks**&lt;number&gt;  

<a name="AxisLeft__rangePadding" href="#AxisLeft__rangePadding">#</a> *AxisLeft*.**rangePadding**&lt;number&gt;  

<a name="AxisLeft__scale" href="#AxisLeft__scale">#</a> *AxisLeft*.**scale**&lt;func&gt; `required` 

<a name="AxisLeft__stroke" href="#AxisLeft__stroke">#</a> *AxisLeft*.**stroke**&lt;string&gt;  

<a name="AxisLeft__strokeDasharray" href="#AxisLeft__strokeDasharray">#</a> *AxisLeft*.**strokeDasharray**&lt;string&gt;  

<a name="AxisLeft__strokeWidth" href="#AxisLeft__strokeWidth">#</a> *AxisLeft*.**strokeWidth**&lt;number&gt;  

<a name="AxisLeft__tickClassName" href="#AxisLeft__tickClassName">#</a> *AxisLeft*.**tickClassName**&lt;string&gt;  

<a name="AxisLeft__tickComponent" href="#AxisLeft__tickComponent">#</a> *AxisLeft*.**tickComponent**&lt;func&gt;  

<a name="AxisLeft__tickFormat" href="#AxisLeft__tickFormat">#</a> *AxisLeft*.**tickFormat**&lt;func&gt;  

<a name="AxisLeft__tickLabelProps" href="#AxisLeft__tickLabelProps">#</a> *AxisLeft*.**tickLabelProps**&lt;func&gt; 

Default:
```js
({ tick, index }) => ({
  dx: '-0.25em',
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end'
})
```
 

<a name="AxisLeft__tickLength" href="#AxisLeft__tickLength">#</a> *AxisLeft*.**tickLength**&lt;number&gt; 

Default:
```js
8
```
 

<a name="AxisLeft__tickStroke" href="#AxisLeft__tickStroke">#</a> *AxisLeft*.**tickStroke**&lt;string&gt;  

<a name="AxisLeft__tickTransform" href="#AxisLeft__tickTransform">#</a> *AxisLeft*.**tickTransform**&lt;string&gt;  

<a name="AxisLeft__tickValues" href="#AxisLeft__tickValues">#</a> *AxisLeft*.**tickValues**&lt;array&gt;  

<a name="AxisLeft__top" href="#AxisLeft__top">#</a> *AxisLeft*.**top**&lt;number&gt;  

### &lt;AxisRight /&gt;


<a name="AxisRight__axisClassName" href="#AxisRight__axisClassName">#</a> *AxisRight*.**axisClassName**&lt;string&gt;  

<a name="AxisRight__axisLineClassName" href="#AxisRight__axisLineClassName">#</a> *AxisRight*.**axisLineClassName**&lt;string&gt;  

<a name="AxisRight__children" href="#AxisRight__children">#</a> *AxisRight*.**children**&lt;func&gt;  

<a name="AxisRight__hideAxisLine" href="#AxisRight__hideAxisLine">#</a> *AxisRight*.**hideAxisLine**&lt;bool&gt;  

<a name="AxisRight__hideTicks" href="#AxisRight__hideTicks">#</a> *AxisRight*.**hideTicks**&lt;bool&gt;  

<a name="AxisRight__hideZero" href="#AxisRight__hideZero">#</a> *AxisRight*.**hideZero**&lt;bool&gt;  

<a name="AxisRight__label" href="#AxisRight__label">#</a> *AxisRight*.**label**&lt;string&gt;  

<a name="AxisRight__labelClassName" href="#AxisRight__labelClassName">#</a> *AxisRight*.**labelClassName**&lt;string&gt;  

<a name="AxisRight__labelOffset" href="#AxisRight__labelOffset">#</a> *AxisRight*.**labelOffset**&lt;number&gt; 

Default:
```js
36
```
 

<a name="AxisRight__labelProps" href="#AxisRight__labelProps">#</a> *AxisRight*.**labelProps**&lt;object&gt;  

<a name="AxisRight__left" href="#AxisRight__left">#</a> *AxisRight*.**left**&lt;number&gt;  

<a name="AxisRight__numTicks" href="#AxisRight__numTicks">#</a> *AxisRight*.**numTicks**&lt;number&gt;  

<a name="AxisRight__rangePadding" href="#AxisRight__rangePadding">#</a> *AxisRight*.**rangePadding**&lt;number&gt;  

<a name="AxisRight__scale" href="#AxisRight__scale">#</a> *AxisRight*.**scale**&lt;func&gt; `required` 

<a name="AxisRight__stroke" href="#AxisRight__stroke">#</a> *AxisRight*.**stroke**&lt;string&gt;  

<a name="AxisRight__strokeDasharray" href="#AxisRight__strokeDasharray">#</a> *AxisRight*.**strokeDasharray**&lt;string&gt;  

<a name="AxisRight__strokeWidth" href="#AxisRight__strokeWidth">#</a> *AxisRight*.**strokeWidth**&lt;number&gt;  

<a name="AxisRight__tickClassName" href="#AxisRight__tickClassName">#</a> *AxisRight*.**tickClassName**&lt;string&gt;  

<a name="AxisRight__tickComponent" href="#AxisRight__tickComponent">#</a> *AxisRight*.**tickComponent**&lt;func&gt;  

<a name="AxisRight__tickFormat" href="#AxisRight__tickFormat">#</a> *AxisRight*.**tickFormat**&lt;func&gt;  

<a name="AxisRight__tickLabelProps" href="#AxisRight__tickLabelProps">#</a> *AxisRight*.**tickLabelProps**&lt;func&gt; 

Default:
```js
({ tick, index }) => ({
  dx: '0.25em',
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'start'
})
```
 

<a name="AxisRight__tickLength" href="#AxisRight__tickLength">#</a> *AxisRight*.**tickLength**&lt;number&gt; 

Default:
```js
8
```
 

<a name="AxisRight__tickStroke" href="#AxisRight__tickStroke">#</a> *AxisRight*.**tickStroke**&lt;string&gt;  

<a name="AxisRight__tickTransform" href="#AxisRight__tickTransform">#</a> *AxisRight*.**tickTransform**&lt;string&gt;  

<a name="AxisRight__tickValues" href="#AxisRight__tickValues">#</a> *AxisRight*.**tickValues**&lt;array&gt;  

<a name="AxisRight__top" href="#AxisRight__top">#</a> *AxisRight*.**top**&lt;number&gt;  

### &lt;AxisTop /&gt;


<a name="AxisTop__axisClassName" href="#AxisTop__axisClassName">#</a> *AxisTop*.**axisClassName**&lt;string&gt;  

<a name="AxisTop__axisLineClassName" href="#AxisTop__axisLineClassName">#</a> *AxisTop*.**axisLineClassName**&lt;string&gt;  

<a name="AxisTop__children" href="#AxisTop__children">#</a> *AxisTop*.**children**&lt;func&gt;  

<a name="AxisTop__hideAxisLine" href="#AxisTop__hideAxisLine">#</a> *AxisTop*.**hideAxisLine**&lt;bool&gt;  

<a name="AxisTop__hideTicks" href="#AxisTop__hideTicks">#</a> *AxisTop*.**hideTicks**&lt;bool&gt;  

<a name="AxisTop__hideZero" href="#AxisTop__hideZero">#</a> *AxisTop*.**hideZero**&lt;bool&gt;  

<a name="AxisTop__label" href="#AxisTop__label">#</a> *AxisTop*.**label**&lt;string&gt;  

<a name="AxisTop__labelClassName" href="#AxisTop__labelClassName">#</a> *AxisTop*.**labelClassName**&lt;string&gt;  

<a name="AxisTop__labelOffset" href="#AxisTop__labelOffset">#</a> *AxisTop*.**labelOffset**&lt;number&gt; 

Default:
```js
8
```
 

<a name="AxisTop__labelProps" href="#AxisTop__labelProps">#</a> *AxisTop*.**labelProps**&lt;object&gt;  

<a name="AxisTop__left" href="#AxisTop__left">#</a> *AxisTop*.**left**&lt;number&gt;  

<a name="AxisTop__numTicks" href="#AxisTop__numTicks">#</a> *AxisTop*.**numTicks**&lt;number&gt;  

<a name="AxisTop__rangePadding" href="#AxisTop__rangePadding">#</a> *AxisTop*.**rangePadding**&lt;number&gt;  

<a name="AxisTop__scale" href="#AxisTop__scale">#</a> *AxisTop*.**scale**&lt;func&gt; `required` 

<a name="AxisTop__stroke" href="#AxisTop__stroke">#</a> *AxisTop*.**stroke**&lt;string&gt;  

<a name="AxisTop__strokeDasharray" href="#AxisTop__strokeDasharray">#</a> *AxisTop*.**strokeDasharray**&lt;string&gt;  

<a name="AxisTop__strokeWidth" href="#AxisTop__strokeWidth">#</a> *AxisTop*.**strokeWidth**&lt;number&gt;  

<a name="AxisTop__tickClassName" href="#AxisTop__tickClassName">#</a> *AxisTop*.**tickClassName**&lt;string&gt;  

<a name="AxisTop__tickComponent" href="#AxisTop__tickComponent">#</a> *AxisTop*.**tickComponent**&lt;func&gt;  

<a name="AxisTop__tickFormat" href="#AxisTop__tickFormat">#</a> *AxisTop*.**tickFormat**&lt;func&gt;  

<a name="AxisTop__tickLabelProps" href="#AxisTop__tickLabelProps">#</a> *AxisTop*.**tickLabelProps**&lt;func&gt; 

Default:
```js
({ tick, index }) => ({
  dy: '-0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle'
})
```
 

<a name="AxisTop__tickLength" href="#AxisTop__tickLength">#</a> *AxisTop*.**tickLength**&lt;number&gt; 

Default:
```js
8
```
 

<a name="AxisTop__tickStroke" href="#AxisTop__tickStroke">#</a> *AxisTop*.**tickStroke**&lt;string&gt;  

<a name="AxisTop__tickTransform" href="#AxisTop__tickTransform">#</a> *AxisTop*.**tickTransform**&lt;string&gt;  

<a name="AxisTop__tickValues" href="#AxisTop__tickValues">#</a> *AxisTop*.**tickValues**&lt;array&gt;  

<a name="AxisTop__top" href="#AxisTop__top">#</a> *AxisTop*.**top**&lt;number&gt;  
