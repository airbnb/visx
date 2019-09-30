# @vx/shape

<a title="@vx/shape npm downloads" href="https://www.npmjs.com/package/@vx/shape">
  <img src="https://img.shields.io/npm/dm/@vx/shape.svg?style=flat-square" />
</a>

Shapes are the core elements of vx. Most of what you see on the screen, like lines, bars, and areas are shapes.


## Installation

```
npm install --save @vx/shape
```


## Components



  - [Arc](#arc-)
  - [Area](#area-)
  - [AreaClosed](#areaclosed-)
  - [AreaStack](#areastack-)
  - [Bar](#bar-)
  - [BarGroup](#bargroup-)
  - [BarGroupHorizontal](#bargrouphorizontal-)
  - [BarStack](#barstack-)
  - [BarStackHorizontal](#barstackhorizontal-)
  - [Circle](#circle-)
  - [Line](#line-)
  - [LinePath](#linepath-)
  - [LineRadial](#lineradial-)
  - [Pie](#pie-)
  - [Polygon](#polygon-)
  - [Stack](#stack-)
  - [LinkHorizontalCurve](#linkhorizontalcurve-)
  - [LinkRadialCurve](#linkradialcurve-)
  - [LinkVerticalCurve](#linkverticalcurve-)
  - [LinkHorizontal](#linkhorizontal-)
  - [LinkRadial](#linkradial-)
  - [LinkVertical](#linkvertical-)
  - [LinkHorizontalLine](#linkhorizontalline-)
  - [LinkRadialLine](#linkradialline-)
  - [LinkVerticalLine](#linkverticalline-)
  - [LinkHorizontalStep](#linkhorizontalstep-)
  - [LinkRadialStep](#linkradialstep-)
  - [LinkVerticalStep](#linkverticalstep-)

## API



<h3 id="arc-">&lt;Arc /&gt;</h3>



<a id="#Arc__centroid" name="Arc__centroid" href="#Arc__centroid">#</a> *Arc*.**centroid**&lt;union(func|number)&gt;  

<a id="#Arc__children" name="Arc__children" href="#Arc__children">#</a> *Arc*.**children**&lt;func&gt;  

<a id="#Arc__className" name="Arc__className" href="#Arc__className">#</a> *Arc*.**className**&lt;string&gt;  

<a id="#Arc__cornerRadius" name="Arc__cornerRadius" href="#Arc__cornerRadius">#</a> *Arc*.**cornerRadius**&lt;union(func|number)&gt;  

<a id="#Arc__data" name="Arc__data" href="#Arc__data">#</a> *Arc*.**data**&lt;any&gt;  

<a id="#Arc__endAngle" name="Arc__endAngle" href="#Arc__endAngle">#</a> *Arc*.**endAngle**&lt;union(func|number)&gt;  

<a id="#Arc__innerRadius" name="Arc__innerRadius" href="#Arc__innerRadius">#</a> *Arc*.**innerRadius**&lt;union(func|number)&gt;  

<a id="#Arc__innerRef" name="Arc__innerRef" href="#Arc__innerRef">#</a> *Arc*.**innerRef**&lt;union(func|object)&gt;  

<a id="#Arc__outerRadius" name="Arc__outerRadius" href="#Arc__outerRadius">#</a> *Arc*.**outerRadius**&lt;union(func|number)&gt;  

<a id="#Arc__padAngle" name="Arc__padAngle" href="#Arc__padAngle">#</a> *Arc*.**padAngle**&lt;union(func|number)&gt;  

<a id="#Arc__padRadius" name="Arc__padRadius" href="#Arc__padRadius">#</a> *Arc*.**padRadius**&lt;union(func|number)&gt;  

<a id="#Arc__startAngle" name="Arc__startAngle" href="#Arc__startAngle">#</a> *Arc*.**startAngle**&lt;union(func|number)&gt;  

<h3 id="area-">&lt;Area /&gt;</h3>



<a id="#Area__children" name="Area__children" href="#Area__children">#</a> *Area*.**children**&lt;func&gt;  

<a id="#Area__className" name="Area__className" href="#Area__className">#</a> *Area*.**className**&lt;string&gt;  

<a id="#Area__curve" name="Area__curve" href="#Area__curve">#</a> *Area*.**curve**&lt;func&gt;  

<a id="#Area__data" name="Area__data" href="#Area__data">#</a> *Area*.**data**&lt;any&gt;  

<a id="#Area__defined" name="Area__defined" href="#Area__defined">#</a> *Area*.**defined**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>() => true</td></td></table>

<a id="#Area__innerRef" name="Area__innerRef" href="#Area__innerRef">#</a> *Area*.**innerRef**&lt;union(func|object)&gt;  

<a id="#Area__x" name="Area__x" href="#Area__x">#</a> *Area*.**x**&lt;union(func|number)&gt;  

<a id="#Area__x0" name="Area__x0" href="#Area__x0">#</a> *Area*.**x0**&lt;union(func|number)&gt;  

<a id="#Area__x1" name="Area__x1" href="#Area__x1">#</a> *Area*.**x1**&lt;union(func|number)&gt;  

<a id="#Area__y" name="Area__y" href="#Area__y">#</a> *Area*.**y**&lt;union(func|number)&gt;  

<a id="#Area__y0" name="Area__y0" href="#Area__y0">#</a> *Area*.**y0**&lt;union(func|number)&gt;  

<a id="#Area__y1" name="Area__y1" href="#Area__y1">#</a> *Area*.**y1**&lt;union(func|number)&gt;  

<h3 id="areaclosed-">&lt;AreaClosed /&gt;</h3>



<a id="#AreaClosed__children" name="AreaClosed__children" href="#AreaClosed__children">#</a> *AreaClosed*.**children**&lt;func&gt;  

<a id="#AreaClosed__className" name="AreaClosed__className" href="#AreaClosed__className">#</a> *AreaClosed*.**className**&lt;string&gt;  

<a id="#AreaClosed__curve" name="AreaClosed__curve" href="#AreaClosed__curve">#</a> *AreaClosed*.**curve**&lt;func&gt;  

<a id="#AreaClosed__data" name="AreaClosed__data" href="#AreaClosed__data">#</a> *AreaClosed*.**data**&lt;any&gt;  

<a id="#AreaClosed__defined" name="AreaClosed__defined" href="#AreaClosed__defined">#</a> *AreaClosed*.**defined**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>() => true</td></td></table>

<a id="#AreaClosed__innerRef" name="AreaClosed__innerRef" href="#AreaClosed__innerRef">#</a> *AreaClosed*.**innerRef**&lt;union(func|object)&gt;  

<a id="#AreaClosed__x" name="AreaClosed__x" href="#AreaClosed__x">#</a> *AreaClosed*.**x**&lt;union(func|number)&gt;  

<a id="#AreaClosed__x0" name="AreaClosed__x0" href="#AreaClosed__x0">#</a> *AreaClosed*.**x0**&lt;union(func|number)&gt;  

<a id="#AreaClosed__x1" name="AreaClosed__x1" href="#AreaClosed__x1">#</a> *AreaClosed*.**x1**&lt;union(func|number)&gt;  

<a id="#AreaClosed__y" name="AreaClosed__y" href="#AreaClosed__y">#</a> *AreaClosed*.**y**&lt;union(func|number)&gt;  

<a id="#AreaClosed__y0" name="AreaClosed__y0" href="#AreaClosed__y0">#</a> *AreaClosed*.**y0**&lt;union(func|number)&gt;  

<a id="#AreaClosed__y1" name="AreaClosed__y1" href="#AreaClosed__y1">#</a> *AreaClosed*.**y1**&lt;union(func|number)&gt;  

<a id="#AreaClosed__yScale" name="AreaClosed__yScale" href="#AreaClosed__yScale">#</a> *AreaClosed*.**yScale**&lt;func&gt;  

<h3 id="areastack-">&lt;AreaStack /&gt;</h3>



<a id="#AreaStack__children" name="AreaStack__children" href="#AreaStack__children">#</a> *AreaStack*.**children**&lt;func&gt;  

<a id="#AreaStack__className" name="AreaStack__className" href="#AreaStack__className">#</a> *AreaStack*.**className**&lt;string&gt;  

<a id="#AreaStack__color" name="AreaStack__color" href="#AreaStack__color">#</a> *AreaStack*.**color**&lt;func&gt;  

<a id="#AreaStack__curve" name="AreaStack__curve" href="#AreaStack__curve">#</a> *AreaStack*.**curve**&lt;func&gt;  

<a id="#AreaStack__data" name="AreaStack__data" href="#AreaStack__data">#</a> *AreaStack*.**data**&lt;array&gt;  

<a id="#AreaStack__defined" name="AreaStack__defined" href="#AreaStack__defined">#</a> *AreaStack*.**defined**&lt;union(func|bool)&gt;  

<a id="#AreaStack__keys" name="AreaStack__keys" href="#AreaStack__keys">#</a> *AreaStack*.**keys**&lt;array&gt;  

<a id="#AreaStack__left" name="AreaStack__left" href="#AreaStack__left">#</a> *AreaStack*.**left**&lt;number&gt;  

<a id="#AreaStack__offset" name="AreaStack__offset" href="#AreaStack__offset">#</a> *AreaStack*.**offset**&lt;union(func|array|string)&gt;  

<a id="#AreaStack__order" name="AreaStack__order" href="#AreaStack__order">#</a> *AreaStack*.**order**&lt;union(func|array|string)&gt;  

<a id="#AreaStack__top" name="AreaStack__top" href="#AreaStack__top">#</a> *AreaStack*.**top**&lt;number&gt;  

<a id="#AreaStack__value" name="AreaStack__value" href="#AreaStack__value">#</a> *AreaStack*.**value**&lt;union(func|number)&gt;  

<a id="#AreaStack__x" name="AreaStack__x" href="#AreaStack__x">#</a> *AreaStack*.**x**&lt;union(func|number)&gt;  

<a id="#AreaStack__x0" name="AreaStack__x0" href="#AreaStack__x0">#</a> *AreaStack*.**x0**&lt;union(func|number)&gt;  

<a id="#AreaStack__x1" name="AreaStack__x1" href="#AreaStack__x1">#</a> *AreaStack*.**x1**&lt;union(func|number)&gt;  

<a id="#AreaStack__y" name="AreaStack__y" href="#AreaStack__y">#</a> *AreaStack*.**y**&lt;union(func|number)&gt;  

<a id="#AreaStack__y0" name="AreaStack__y0" href="#AreaStack__y0">#</a> *AreaStack*.**y0**&lt;union(func|number)&gt;  

<a id="#AreaStack__y1" name="AreaStack__y1" href="#AreaStack__y1">#</a> *AreaStack*.**y1**&lt;union(func|number)&gt;  

<h3 id="bar-">&lt;Bar /&gt;</h3>



<a id="#Bar__className" name="Bar__className" href="#Bar__className">#</a> *Bar*.**className**&lt;string&gt;  

<a id="#Bar__innerRef" name="Bar__innerRef" href="#Bar__innerRef">#</a> *Bar*.**innerRef**&lt;union(func|object)&gt;  

<h3 id="bargroup-">&lt;BarGroup /&gt;</h3>

Generates bar groups as an array of objects and renders `<rect />`s for each datum grouped by `key`. A general setup might look like this:

```js
const data = [{
 date: date1,
 key1: value,
 key2: value,
 key3: value
}, {
 date: date2,
 key1: value,
 key2: value,
 key3: value,
}];

const x0 = d => d.date;
const keys = [key1, key2, key3];

const x0Scale = scaleBand({
 domain: data.map(x0),
 padding: 0.2
});
const x1Scale = scaleBand({
 domain: keys,
 padding: 0.1
});
const yScale = scaleLinear({
  domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
});
const color = scaleOrdinal({
  domain: keys,
  range: [blue, green, purple]
});
```

Example: [https://vx-demo.now.sh/bargroup](https://vx-demo.now.sh/bargroup)

<a id="#BarGroup__children" name="BarGroup__children" href="#BarGroup__children">#</a> *BarGroup*.**children**&lt;func&gt; 

A function that returns a react component. Useful for generating the bar group data with full control over what is rendered. The functions first argument will be the bar groups data as an array of objects with the following properties:

 - `index<number>` - the index of the group based on *props*.**data** array.
 - `x0<number>` - the position of the group based on *props*.**x0** & *props*.**x0Scale**.
 - `bars<array>` - array of objects, ordered by *props*.**keys**, with the following properties:
   + `index<number>` - the index of the bar for the current group.
   + `key<string>` - the key of the bar.
   + `width<number>` - the width of the bar. This will be `x1Scale.bandwidth()`. If `x1Scale` does not have a bandwidth property, then it becomes:
     ```js
     x1Range = x1Scale.range();
     x1Domain = x1Scale.domain();
     barWidth = Math.abs(x1Range[x1Range.length - 1] - x1Range[0]) / x1Domain.length
     ```
   + `height<number>` - the height of the bar.
   + `x<number>` - the x position of the bar.
   + `y<number>` - the y position of the bar.
   + `color<string>` - the color of the bar. 

<a id="#BarGroup__className" name="BarGroup__className" href="#BarGroup__className">#</a> *BarGroup*.**className**&lt;string&gt; 

Add a class name to the containing `<g>` element. 

<a id="#BarGroup__color" name="BarGroup__color" href="#BarGroup__color">#</a> *BarGroup*.**color**&lt;func&gt; `required`

```js
color(key, barIndex)
```
A function that returns color for each bar within a bar group. 

<a id="#BarGroup__data" name="BarGroup__data" href="#BarGroup__data">#</a> *BarGroup*.**data**&lt;array&gt; `required`

An array of bar group objects. 

<a id="#BarGroup__height" name="BarGroup__height" href="#BarGroup__height">#</a> *BarGroup*.**height**&lt;number&gt; `required`

Height is used to align the bottom of the the bars. barHeight = height - yScale(bar.value), where bar.y = yScale(bar.value). 

<a id="#BarGroup__keys" name="BarGroup__keys" href="#BarGroup__keys">#</a> *BarGroup*.**keys**&lt;array&gt; `required`

An array of strings containing the key for each bar group. Each bar within a bar group will follow the order of this array. 

<a id="#BarGroup__left" name="BarGroup__left" href="#BarGroup__left">#</a> *BarGroup*.**left**&lt;number&gt; 

A left pixel offset applied to the entire bar group. 

<a id="#BarGroup__top" name="BarGroup__top" href="#BarGroup__top">#</a> *BarGroup*.**top**&lt;number&gt; 

A top pixel offset applied to the entire bar group. 

<a id="#BarGroup__x0" name="BarGroup__x0" href="#BarGroup__x0">#</a> *BarGroup*.**x0**&lt;func&gt; `required`

```js
x0(barGroup)
```
An accessor function that returns the `x0` value for each datum in *props*.**data**. 

<a id="#BarGroup__x0Scale" name="BarGroup__x0Scale" href="#BarGroup__x0Scale">#</a> *BarGroup*.**x0Scale**&lt;func&gt; `required`

```js
x0Scale(x0(barGroup))
```
A scale function that returns the x position of the bar group. 

<a id="#BarGroup__x1Scale" name="BarGroup__x1Scale" href="#BarGroup__x1Scale">#</a> *BarGroup*.**x1Scale**&lt;func&gt; `required`

```js
x1Scale(key)
```
A scale function that returns the x position of the bar within a bar group. 

<a id="#BarGroup__yScale" name="BarGroup__yScale" href="#BarGroup__yScale">#</a> *BarGroup*.**yScale**&lt;func&gt; `required`

```js
yScale(value)
```
A scale function that retuns the y position of the bar within a bar group. `value` is the value of the `key` in the bar group. 

<h3 id="bargrouphorizontal-">&lt;BarGroupHorizontal /&gt;</h3>



<a id="#BarGroupHorizontal__children" name="BarGroupHorizontal__children" href="#BarGroupHorizontal__children">#</a> *BarGroupHorizontal*.**children**&lt;func&gt;  

<a id="#BarGroupHorizontal__className" name="BarGroupHorizontal__className" href="#BarGroupHorizontal__className">#</a> *BarGroupHorizontal*.**className**&lt;string&gt;  

<a id="#BarGroupHorizontal__color" name="BarGroupHorizontal__color" href="#BarGroupHorizontal__color">#</a> *BarGroupHorizontal*.**color**&lt;func&gt; `required` 

<a id="#BarGroupHorizontal__data" name="BarGroupHorizontal__data" href="#BarGroupHorizontal__data">#</a> *BarGroupHorizontal*.**data**&lt;array&gt; `required` 

<a id="#BarGroupHorizontal__keys" name="BarGroupHorizontal__keys" href="#BarGroupHorizontal__keys">#</a> *BarGroupHorizontal*.**keys**&lt;array&gt; `required` 

<a id="#BarGroupHorizontal__left" name="BarGroupHorizontal__left" href="#BarGroupHorizontal__left">#</a> *BarGroupHorizontal*.**left**&lt;number&gt;  

<a id="#BarGroupHorizontal__top" name="BarGroupHorizontal__top" href="#BarGroupHorizontal__top">#</a> *BarGroupHorizontal*.**top**&lt;number&gt;  

<a id="#BarGroupHorizontal__width" name="BarGroupHorizontal__width" href="#BarGroupHorizontal__width">#</a> *BarGroupHorizontal*.**width**&lt;number&gt; `required` 

<a id="#BarGroupHorizontal__x" name="BarGroupHorizontal__x" href="#BarGroupHorizontal__x">#</a> *BarGroupHorizontal*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>(/** val */) => 0</td></td></table>

<a id="#BarGroupHorizontal__xScale" name="BarGroupHorizontal__xScale" href="#BarGroupHorizontal__xScale">#</a> *BarGroupHorizontal*.**xScale**&lt;func&gt; `required` 

<a id="#BarGroupHorizontal__y0" name="BarGroupHorizontal__y0" href="#BarGroupHorizontal__y0">#</a> *BarGroupHorizontal*.**y0**&lt;func&gt; `required` 

<a id="#BarGroupHorizontal__y0Scale" name="BarGroupHorizontal__y0Scale" href="#BarGroupHorizontal__y0Scale">#</a> *BarGroupHorizontal*.**y0Scale**&lt;func&gt; `required` 

<a id="#BarGroupHorizontal__y1Scale" name="BarGroupHorizontal__y1Scale" href="#BarGroupHorizontal__y1Scale">#</a> *BarGroupHorizontal*.**y1Scale**&lt;func&gt; `required` 

<h3 id="barstack-">&lt;BarStack /&gt;</h3>



<a id="#BarStack__children" name="BarStack__children" href="#BarStack__children">#</a> *BarStack*.**children**&lt;func&gt;  

<a id="#BarStack__className" name="BarStack__className" href="#BarStack__className">#</a> *BarStack*.**className**&lt;string&gt;  

<a id="#BarStack__color" name="BarStack__color" href="#BarStack__color">#</a> *BarStack*.**color**&lt;func&gt; `required` 

<a id="#BarStack__data" name="BarStack__data" href="#BarStack__data">#</a> *BarStack*.**data**&lt;array&gt; `required` 

<a id="#BarStack__keys" name="BarStack__keys" href="#BarStack__keys">#</a> *BarStack*.**keys**&lt;array&gt; `required` 

<a id="#BarStack__left" name="BarStack__left" href="#BarStack__left">#</a> *BarStack*.**left**&lt;number&gt;  

<a id="#BarStack__offset" name="BarStack__offset" href="#BarStack__offset">#</a> *BarStack*.**offset**&lt;union(func|array|string)&gt;  

<a id="#BarStack__order" name="BarStack__order" href="#BarStack__order">#</a> *BarStack*.**order**&lt;union(func|array|string)&gt;  

<a id="#BarStack__top" name="BarStack__top" href="#BarStack__top">#</a> *BarStack*.**top**&lt;number&gt;  

<a id="#BarStack__value" name="BarStack__value" href="#BarStack__value">#</a> *BarStack*.**value**&lt;union(func|number)&gt;  

<a id="#BarStack__x" name="BarStack__x" href="#BarStack__x">#</a> *BarStack*.**x**&lt;func&gt; `required` 

<a id="#BarStack__xScale" name="BarStack__xScale" href="#BarStack__xScale">#</a> *BarStack*.**xScale**&lt;func&gt; `required` 

<a id="#BarStack__y0" name="BarStack__y0" href="#BarStack__y0">#</a> *BarStack*.**y0**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d[0]</td></td></table>

<a id="#BarStack__y1" name="BarStack__y1" href="#BarStack__y1">#</a> *BarStack*.**y1**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d[1]</td></td></table>

<a id="#BarStack__yScale" name="BarStack__yScale" href="#BarStack__yScale">#</a> *BarStack*.**yScale**&lt;func&gt; `required` 

<h3 id="barstackhorizontal-">&lt;BarStackHorizontal /&gt;</h3>



<a id="#BarStackHorizontal__children" name="BarStackHorizontal__children" href="#BarStackHorizontal__children">#</a> *BarStackHorizontal*.**children**&lt;func&gt;  

<a id="#BarStackHorizontal__className" name="BarStackHorizontal__className" href="#BarStackHorizontal__className">#</a> *BarStackHorizontal*.**className**&lt;string&gt;  

<a id="#BarStackHorizontal__color" name="BarStackHorizontal__color" href="#BarStackHorizontal__color">#</a> *BarStackHorizontal*.**color**&lt;func&gt; `required` 

<a id="#BarStackHorizontal__data" name="BarStackHorizontal__data" href="#BarStackHorizontal__data">#</a> *BarStackHorizontal*.**data**&lt;array&gt; `required` 

<a id="#BarStackHorizontal__keys" name="BarStackHorizontal__keys" href="#BarStackHorizontal__keys">#</a> *BarStackHorizontal*.**keys**&lt;array&gt; `required` 

<a id="#BarStackHorizontal__left" name="BarStackHorizontal__left" href="#BarStackHorizontal__left">#</a> *BarStackHorizontal*.**left**&lt;number&gt;  

<a id="#BarStackHorizontal__offset" name="BarStackHorizontal__offset" href="#BarStackHorizontal__offset">#</a> *BarStackHorizontal*.**offset**&lt;union(func|array|string)&gt;  

<a id="#BarStackHorizontal__order" name="BarStackHorizontal__order" href="#BarStackHorizontal__order">#</a> *BarStackHorizontal*.**order**&lt;union(func|array|string)&gt;  

<a id="#BarStackHorizontal__top" name="BarStackHorizontal__top" href="#BarStackHorizontal__top">#</a> *BarStackHorizontal*.**top**&lt;number&gt;  

<a id="#BarStackHorizontal__value" name="BarStackHorizontal__value" href="#BarStackHorizontal__value">#</a> *BarStackHorizontal*.**value**&lt;union(func|number)&gt;  

<a id="#BarStackHorizontal__x0" name="BarStackHorizontal__x0" href="#BarStackHorizontal__x0">#</a> *BarStackHorizontal*.**x0**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d[0]</td></td></table>

<a id="#BarStackHorizontal__x1" name="BarStackHorizontal__x1" href="#BarStackHorizontal__x1">#</a> *BarStackHorizontal*.**x1**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d[1]</td></td></table>

<a id="#BarStackHorizontal__xScale" name="BarStackHorizontal__xScale" href="#BarStackHorizontal__xScale">#</a> *BarStackHorizontal*.**xScale**&lt;func&gt; `required` 

<a id="#BarStackHorizontal__y" name="BarStackHorizontal__y" href="#BarStackHorizontal__y">#</a> *BarStackHorizontal*.**y**&lt;func&gt; `required` 

<a id="#BarStackHorizontal__yScale" name="BarStackHorizontal__yScale" href="#BarStackHorizontal__yScale">#</a> *BarStackHorizontal*.**yScale**&lt;func&gt; `required` 

<h3 id="circle-">&lt;Circle /&gt;</h3>



<a id="#Circle__className" name="Circle__className" href="#Circle__className">#</a> *Circle*.**className**&lt;string&gt;  

<a id="#Circle__innerRef" name="Circle__innerRef" href="#Circle__innerRef">#</a> *Circle*.**innerRef**&lt;union(func|object)&gt;  

<h3 id="line-">&lt;Line /&gt;</h3>



<a id="#Line__className" name="Line__className" href="#Line__className">#</a> *Line*.**className**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>''</td></td></table>

<a id="#Line__fill" name="Line__fill" href="#Line__fill">#</a> *Line*.**fill**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'transparent'</td></td></table>

<a id="#Line__from" name="Line__from" href="#Line__from">#</a> *Line*.**from**&lt;shape[object Object]&gt;  <table><tr><td><strong>Default</strong></td><td>new Point({ x: 0, y: 0 })</td></td></table>

<a id="#Line__innerRef" name="Line__innerRef" href="#Line__innerRef">#</a> *Line*.**innerRef**&lt;union(func|object)&gt;  

<a id="#Line__to" name="Line__to" href="#Line__to">#</a> *Line*.**to**&lt;shape[object Object]&gt;  <table><tr><td><strong>Default</strong></td><td>new Point({ x: 1, y: 1 })</td></td></table>

<h3 id="linepath-">&lt;LinePath /&gt;</h3>



<a id="#LinePath__children" name="LinePath__children" href="#LinePath__children">#</a> *LinePath*.**children**&lt;func&gt;  

<a id="#LinePath__className" name="LinePath__className" href="#LinePath__className">#</a> *LinePath*.**className**&lt;string&gt;  

<a id="#LinePath__curve" name="LinePath__curve" href="#LinePath__curve">#</a> *LinePath*.**curve**&lt;func&gt;  

<a id="#LinePath__data" name="LinePath__data" href="#LinePath__data">#</a> *LinePath*.**data**&lt;array&gt;  

<a id="#LinePath__defined" name="LinePath__defined" href="#LinePath__defined">#</a> *LinePath*.**defined**&lt;union(func|bool)&gt;  <table><tr><td><strong>Default</strong></td><td>() => true</td></td></table>

<a id="#LinePath__fill" name="LinePath__fill" href="#LinePath__fill">#</a> *LinePath*.**fill**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'transparent'</td></td></table>

<a id="#LinePath__innerRef" name="LinePath__innerRef" href="#LinePath__innerRef">#</a> *LinePath*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinePath__x" name="LinePath__x" href="#LinePath__x">#</a> *LinePath*.**x**&lt;union(func|number)&gt;  

<a id="#LinePath__y" name="LinePath__y" href="#LinePath__y">#</a> *LinePath*.**y**&lt;union(func|number)&gt;  

<h3 id="lineradial-">&lt;LineRadial /&gt;</h3>



<a id="#LineRadial__angle" name="LineRadial__angle" href="#LineRadial__angle">#</a> *LineRadial*.**angle**&lt;union(func|number)&gt;  

<a id="#LineRadial__children" name="LineRadial__children" href="#LineRadial__children">#</a> *LineRadial*.**children**&lt;func&gt;  

<a id="#LineRadial__className" name="LineRadial__className" href="#LineRadial__className">#</a> *LineRadial*.**className**&lt;string&gt;  

<a id="#LineRadial__curve" name="LineRadial__curve" href="#LineRadial__curve">#</a> *LineRadial*.**curve**&lt;func&gt;  

<a id="#LineRadial__data" name="LineRadial__data" href="#LineRadial__data">#</a> *LineRadial*.**data**&lt;any&gt;  

<a id="#LineRadial__defined" name="LineRadial__defined" href="#LineRadial__defined">#</a> *LineRadial*.**defined**&lt;union(func|bool)&gt;  

<a id="#LineRadial__fill" name="LineRadial__fill" href="#LineRadial__fill">#</a> *LineRadial*.**fill**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'transparent'</td></td></table>

<a id="#LineRadial__innerRef" name="LineRadial__innerRef" href="#LineRadial__innerRef">#</a> *LineRadial*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LineRadial__radius" name="LineRadial__radius" href="#LineRadial__radius">#</a> *LineRadial*.**radius**&lt;union(func|number)&gt;  

<h3 id="pie-">&lt;Pie /&gt;</h3>



<a id="#Pie__centroid" name="Pie__centroid" href="#Pie__centroid">#</a> *Pie*.**centroid**&lt;union(func|number)&gt;  

<a id="#Pie__children" name="Pie__children" href="#Pie__children">#</a> *Pie*.**children**&lt;func&gt;  

<a id="#Pie__className" name="Pie__className" href="#Pie__className">#</a> *Pie*.**className**&lt;string&gt;  

<a id="#Pie__cornerRadius" name="Pie__cornerRadius" href="#Pie__cornerRadius">#</a> *Pie*.**cornerRadius**&lt;union(func|number)&gt;  

<a id="#Pie__data" name="Pie__data" href="#Pie__data">#</a> *Pie*.**data**&lt;array&gt;  

<a id="#Pie__endAngle" name="Pie__endAngle" href="#Pie__endAngle">#</a> *Pie*.**endAngle**&lt;union(func|number)&gt;  

<a id="#Pie__innerRadius" name="Pie__innerRadius" href="#Pie__innerRadius">#</a> *Pie*.**innerRadius**&lt;union(func|number)&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Pie__left" name="Pie__left" href="#Pie__left">#</a> *Pie*.**left**&lt;number&gt;  

<a id="#Pie__outerRadius" name="Pie__outerRadius" href="#Pie__outerRadius">#</a> *Pie*.**outerRadius**&lt;union(func|number)&gt;  

<a id="#Pie__padAngle" name="Pie__padAngle" href="#Pie__padAngle">#</a> *Pie*.**padAngle**&lt;union(func|number)&gt;  

<a id="#Pie__padRadius" name="Pie__padRadius" href="#Pie__padRadius">#</a> *Pie*.**padRadius**&lt;union(func|number)&gt;  

<a id="#Pie__pieSort" name="Pie__pieSort" href="#Pie__pieSort">#</a> *Pie*.**pieSort**&lt;func&gt;  

<a id="#Pie__pieSortValues" name="Pie__pieSortValues" href="#Pie__pieSortValues">#</a> *Pie*.**pieSortValues**&lt;func&gt;  

<a id="#Pie__pieValue" name="Pie__pieValue" href="#Pie__pieValue">#</a> *Pie*.**pieValue**&lt;union(func|number)&gt;  

<a id="#Pie__startAngle" name="Pie__startAngle" href="#Pie__startAngle">#</a> *Pie*.**startAngle**&lt;union(func|number)&gt;  

<a id="#Pie__top" name="Pie__top" href="#Pie__top">#</a> *Pie*.**top**&lt;number&gt;  

<h3 id="polygon-">&lt;Polygon /&gt;</h3>



<a id="#Polygon__center" name="Polygon__center" href="#Polygon__center">#</a> *Polygon*.**center**&lt;shape[object Object]&gt;  <table><tr><td><strong>Default</strong></td><td>new Point({ x: 0, y: 0 })</td></td></table>

<a id="#Polygon__children" name="Polygon__children" href="#Polygon__children">#</a> *Polygon*.**children**&lt;func&gt;  

<a id="#Polygon__className" name="Polygon__className" href="#Polygon__className">#</a> *Polygon*.**className**&lt;string&gt;  

<a id="#Polygon__innerRef" name="Polygon__innerRef" href="#Polygon__innerRef">#</a> *Polygon*.**innerRef**&lt;union(func|object)&gt;  

<a id="#Polygon__rotate" name="Polygon__rotate" href="#Polygon__rotate">#</a> *Polygon*.**rotate**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Polygon__sides" name="Polygon__sides" href="#Polygon__sides">#</a> *Polygon*.**sides**&lt;number&gt; `required` 

<a id="#Polygon__size" name="Polygon__size" href="#Polygon__size">#</a> *Polygon*.**size**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>25</td></td></table>

<h3 id="stack-">&lt;Stack /&gt;</h3>



<a id="#Stack__children" name="Stack__children" href="#Stack__children">#</a> *Stack*.**children**&lt;func&gt;  

<a id="#Stack__className" name="Stack__className" href="#Stack__className">#</a> *Stack*.**className**&lt;string&gt;  

<a id="#Stack__color" name="Stack__color" href="#Stack__color">#</a> *Stack*.**color**&lt;func&gt;  

<a id="#Stack__curve" name="Stack__curve" href="#Stack__curve">#</a> *Stack*.**curve**&lt;func&gt;  

<a id="#Stack__data" name="Stack__data" href="#Stack__data">#</a> *Stack*.**data**&lt;array&gt; `required` 

<a id="#Stack__defined" name="Stack__defined" href="#Stack__defined">#</a> *Stack*.**defined**&lt;union(func|bool)&gt;  

<a id="#Stack__keys" name="Stack__keys" href="#Stack__keys">#</a> *Stack*.**keys**&lt;array&gt;  

<a id="#Stack__left" name="Stack__left" href="#Stack__left">#</a> *Stack*.**left**&lt;number&gt;  

<a id="#Stack__offset" name="Stack__offset" href="#Stack__offset">#</a> *Stack*.**offset**&lt;union(func|array|string)&gt;  

<a id="#Stack__order" name="Stack__order" href="#Stack__order">#</a> *Stack*.**order**&lt;union(func|array|string)&gt;  

<a id="#Stack__top" name="Stack__top" href="#Stack__top">#</a> *Stack*.**top**&lt;number&gt;  

<a id="#Stack__value" name="Stack__value" href="#Stack__value">#</a> *Stack*.**value**&lt;union(func|number)&gt;  

<a id="#Stack__x" name="Stack__x" href="#Stack__x">#</a> *Stack*.**x**&lt;union(func|number)&gt;  

<a id="#Stack__x0" name="Stack__x0" href="#Stack__x0">#</a> *Stack*.**x0**&lt;union(func|number)&gt;  

<a id="#Stack__x1" name="Stack__x1" href="#Stack__x1">#</a> *Stack*.**x1**&lt;union(func|number)&gt;  

<a id="#Stack__y" name="Stack__y" href="#Stack__y">#</a> *Stack*.**y**&lt;union(func|number)&gt;  

<a id="#Stack__y0" name="Stack__y0" href="#Stack__y0">#</a> *Stack*.**y0**&lt;union(func|number)&gt;  

<a id="#Stack__y1" name="Stack__y1" href="#Stack__y1">#</a> *Stack*.**y1**&lt;union(func|number)&gt;  

<h3 id="linkhorizontalcurve-">&lt;LinkHorizontalCurve /&gt;</h3>



<a id="#LinkHorizontalCurve__children" name="LinkHorizontalCurve__children" href="#LinkHorizontalCurve__children">#</a> *LinkHorizontalCurve*.**children**&lt;func&gt;  

<a id="#LinkHorizontalCurve__className" name="LinkHorizontalCurve__className" href="#LinkHorizontalCurve__className">#</a> *LinkHorizontalCurve*.**className**&lt;string&gt;  

<a id="#LinkHorizontalCurve__data" name="LinkHorizontalCurve__data" href="#LinkHorizontalCurve__data">#</a> *LinkHorizontalCurve*.**data**&lt;any&gt;  

<a id="#LinkHorizontalCurve__innerRef" name="LinkHorizontalCurve__innerRef" href="#LinkHorizontalCurve__innerRef">#</a> *LinkHorizontalCurve*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkHorizontalCurve__path" name="LinkHorizontalCurve__path" href="#LinkHorizontalCurve__path">#</a> *LinkHorizontalCurve*.**path**&lt;func&gt;  

<a id="#LinkHorizontalCurve__percent" name="LinkHorizontalCurve__percent" href="#LinkHorizontalCurve__percent">#</a> *LinkHorizontalCurve*.**percent**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0.2</td></td></table>

<a id="#LinkHorizontalCurve__source" name="LinkHorizontalCurve__source" href="#LinkHorizontalCurve__source">#</a> *LinkHorizontalCurve*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkHorizontalCurve__target" name="LinkHorizontalCurve__target" href="#LinkHorizontalCurve__target">#</a> *LinkHorizontalCurve*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkHorizontalCurve__x" name="LinkHorizontalCurve__x" href="#LinkHorizontalCurve__x">#</a> *LinkHorizontalCurve*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<a id="#LinkHorizontalCurve__y" name="LinkHorizontalCurve__y" href="#LinkHorizontalCurve__y">#</a> *LinkHorizontalCurve*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<h3 id="linkradialcurve-">&lt;LinkRadialCurve /&gt;</h3>



<a id="#LinkRadialCurve__children" name="LinkRadialCurve__children" href="#LinkRadialCurve__children">#</a> *LinkRadialCurve*.**children**&lt;func&gt;  

<a id="#LinkRadialCurve__className" name="LinkRadialCurve__className" href="#LinkRadialCurve__className">#</a> *LinkRadialCurve*.**className**&lt;string&gt;  

<a id="#LinkRadialCurve__data" name="LinkRadialCurve__data" href="#LinkRadialCurve__data">#</a> *LinkRadialCurve*.**data**&lt;any&gt;  

<a id="#LinkRadialCurve__innerRef" name="LinkRadialCurve__innerRef" href="#LinkRadialCurve__innerRef">#</a> *LinkRadialCurve*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkRadialCurve__path" name="LinkRadialCurve__path" href="#LinkRadialCurve__path">#</a> *LinkRadialCurve*.**path**&lt;func&gt;  

<a id="#LinkRadialCurve__percent" name="LinkRadialCurve__percent" href="#LinkRadialCurve__percent">#</a> *LinkRadialCurve*.**percent**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0.2</td></td></table>

<a id="#LinkRadialCurve__source" name="LinkRadialCurve__source" href="#LinkRadialCurve__source">#</a> *LinkRadialCurve*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkRadialCurve__target" name="LinkRadialCurve__target" href="#LinkRadialCurve__target">#</a> *LinkRadialCurve*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkRadialCurve__x" name="LinkRadialCurve__x" href="#LinkRadialCurve__x">#</a> *LinkRadialCurve*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkRadialCurve__y" name="LinkRadialCurve__y" href="#LinkRadialCurve__y">#</a> *LinkRadialCurve*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkverticalcurve-">&lt;LinkVerticalCurve /&gt;</h3>



<a id="#LinkVerticalCurve__children" name="LinkVerticalCurve__children" href="#LinkVerticalCurve__children">#</a> *LinkVerticalCurve*.**children**&lt;func&gt;  

<a id="#LinkVerticalCurve__className" name="LinkVerticalCurve__className" href="#LinkVerticalCurve__className">#</a> *LinkVerticalCurve*.**className**&lt;string&gt;  

<a id="#LinkVerticalCurve__data" name="LinkVerticalCurve__data" href="#LinkVerticalCurve__data">#</a> *LinkVerticalCurve*.**data**&lt;any&gt;  

<a id="#LinkVerticalCurve__innerRef" name="LinkVerticalCurve__innerRef" href="#LinkVerticalCurve__innerRef">#</a> *LinkVerticalCurve*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkVerticalCurve__path" name="LinkVerticalCurve__path" href="#LinkVerticalCurve__path">#</a> *LinkVerticalCurve*.**path**&lt;func&gt;  

<a id="#LinkVerticalCurve__percent" name="LinkVerticalCurve__percent" href="#LinkVerticalCurve__percent">#</a> *LinkVerticalCurve*.**percent**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0.2</td></td></table>

<a id="#LinkVerticalCurve__source" name="LinkVerticalCurve__source" href="#LinkVerticalCurve__source">#</a> *LinkVerticalCurve*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkVerticalCurve__target" name="LinkVerticalCurve__target" href="#LinkVerticalCurve__target">#</a> *LinkVerticalCurve*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkVerticalCurve__x" name="LinkVerticalCurve__x" href="#LinkVerticalCurve__x">#</a> *LinkVerticalCurve*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkVerticalCurve__y" name="LinkVerticalCurve__y" href="#LinkVerticalCurve__y">#</a> *LinkVerticalCurve*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkhorizontal-">&lt;LinkHorizontal /&gt;</h3>



<a id="#LinkHorizontal__children" name="LinkHorizontal__children" href="#LinkHorizontal__children">#</a> *LinkHorizontal*.**children**&lt;func&gt;  

<a id="#LinkHorizontal__className" name="LinkHorizontal__className" href="#LinkHorizontal__className">#</a> *LinkHorizontal*.**className**&lt;string&gt;  

<a id="#LinkHorizontal__data" name="LinkHorizontal__data" href="#LinkHorizontal__data">#</a> *LinkHorizontal*.**data**&lt;any&gt;  

<a id="#LinkHorizontal__innerRef" name="LinkHorizontal__innerRef" href="#LinkHorizontal__innerRef">#</a> *LinkHorizontal*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkHorizontal__path" name="LinkHorizontal__path" href="#LinkHorizontal__path">#</a> *LinkHorizontal*.**path**&lt;func&gt;  

<a id="#LinkHorizontal__source" name="LinkHorizontal__source" href="#LinkHorizontal__source">#</a> *LinkHorizontal*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkHorizontal__target" name="LinkHorizontal__target" href="#LinkHorizontal__target">#</a> *LinkHorizontal*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkHorizontal__x" name="LinkHorizontal__x" href="#LinkHorizontal__x">#</a> *LinkHorizontal*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<a id="#LinkHorizontal__y" name="LinkHorizontal__y" href="#LinkHorizontal__y">#</a> *LinkHorizontal*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<h3 id="linkradial-">&lt;LinkRadial /&gt;</h3>



<a id="#LinkRadial__angle" name="LinkRadial__angle" href="#LinkRadial__angle">#</a> *LinkRadial*.**angle**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkRadial__children" name="LinkRadial__children" href="#LinkRadial__children">#</a> *LinkRadial*.**children**&lt;func&gt;  

<a id="#LinkRadial__className" name="LinkRadial__className" href="#LinkRadial__className">#</a> *LinkRadial*.**className**&lt;string&gt;  

<a id="#LinkRadial__data" name="LinkRadial__data" href="#LinkRadial__data">#</a> *LinkRadial*.**data**&lt;any&gt;  

<a id="#LinkRadial__innerRef" name="LinkRadial__innerRef" href="#LinkRadial__innerRef">#</a> *LinkRadial*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkRadial__path" name="LinkRadial__path" href="#LinkRadial__path">#</a> *LinkRadial*.**path**&lt;func&gt;  

<a id="#LinkRadial__radius" name="LinkRadial__radius" href="#LinkRadial__radius">#</a> *LinkRadial*.**radius**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<a id="#LinkRadial__source" name="LinkRadial__source" href="#LinkRadial__source">#</a> *LinkRadial*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkRadial__target" name="LinkRadial__target" href="#LinkRadial__target">#</a> *LinkRadial*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<h3 id="linkvertical-">&lt;LinkVertical /&gt;</h3>



<a id="#LinkVertical__children" name="LinkVertical__children" href="#LinkVertical__children">#</a> *LinkVertical*.**children**&lt;func&gt;  

<a id="#LinkVertical__className" name="LinkVertical__className" href="#LinkVertical__className">#</a> *LinkVertical*.**className**&lt;string&gt;  

<a id="#LinkVertical__data" name="LinkVertical__data" href="#LinkVertical__data">#</a> *LinkVertical*.**data**&lt;any&gt;  

<a id="#LinkVertical__innerRef" name="LinkVertical__innerRef" href="#LinkVertical__innerRef">#</a> *LinkVertical*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkVertical__path" name="LinkVertical__path" href="#LinkVertical__path">#</a> *LinkVertical*.**path**&lt;func&gt;  

<a id="#LinkVertical__source" name="LinkVertical__source" href="#LinkVertical__source">#</a> *LinkVertical*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkVertical__target" name="LinkVertical__target" href="#LinkVertical__target">#</a> *LinkVertical*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkVertical__x" name="LinkVertical__x" href="#LinkVertical__x">#</a> *LinkVertical*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkVertical__y" name="LinkVertical__y" href="#LinkVertical__y">#</a> *LinkVertical*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkhorizontalline-">&lt;LinkHorizontalLine /&gt;</h3>



<a id="#LinkHorizontalLine__children" name="LinkHorizontalLine__children" href="#LinkHorizontalLine__children">#</a> *LinkHorizontalLine*.**children**&lt;func&gt;  

<a id="#LinkHorizontalLine__className" name="LinkHorizontalLine__className" href="#LinkHorizontalLine__className">#</a> *LinkHorizontalLine*.**className**&lt;string&gt;  

<a id="#LinkHorizontalLine__data" name="LinkHorizontalLine__data" href="#LinkHorizontalLine__data">#</a> *LinkHorizontalLine*.**data**&lt;any&gt;  

<a id="#LinkHorizontalLine__innerRef" name="LinkHorizontalLine__innerRef" href="#LinkHorizontalLine__innerRef">#</a> *LinkHorizontalLine*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkHorizontalLine__path" name="LinkHorizontalLine__path" href="#LinkHorizontalLine__path">#</a> *LinkHorizontalLine*.**path**&lt;func&gt;  

<a id="#LinkHorizontalLine__source" name="LinkHorizontalLine__source" href="#LinkHorizontalLine__source">#</a> *LinkHorizontalLine*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkHorizontalLine__target" name="LinkHorizontalLine__target" href="#LinkHorizontalLine__target">#</a> *LinkHorizontalLine*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkHorizontalLine__x" name="LinkHorizontalLine__x" href="#LinkHorizontalLine__x">#</a> *LinkHorizontalLine*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<a id="#LinkHorizontalLine__y" name="LinkHorizontalLine__y" href="#LinkHorizontalLine__y">#</a> *LinkHorizontalLine*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<h3 id="linkradialline-">&lt;LinkRadialLine /&gt;</h3>



<a id="#LinkRadialLine__children" name="LinkRadialLine__children" href="#LinkRadialLine__children">#</a> *LinkRadialLine*.**children**&lt;func&gt;  

<a id="#LinkRadialLine__className" name="LinkRadialLine__className" href="#LinkRadialLine__className">#</a> *LinkRadialLine*.**className**&lt;string&gt;  

<a id="#LinkRadialLine__data" name="LinkRadialLine__data" href="#LinkRadialLine__data">#</a> *LinkRadialLine*.**data**&lt;any&gt;  

<a id="#LinkRadialLine__innerRef" name="LinkRadialLine__innerRef" href="#LinkRadialLine__innerRef">#</a> *LinkRadialLine*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkRadialLine__path" name="LinkRadialLine__path" href="#LinkRadialLine__path">#</a> *LinkRadialLine*.**path**&lt;func&gt;  

<a id="#LinkRadialLine__source" name="LinkRadialLine__source" href="#LinkRadialLine__source">#</a> *LinkRadialLine*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkRadialLine__target" name="LinkRadialLine__target" href="#LinkRadialLine__target">#</a> *LinkRadialLine*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkRadialLine__x" name="LinkRadialLine__x" href="#LinkRadialLine__x">#</a> *LinkRadialLine*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkRadialLine__y" name="LinkRadialLine__y" href="#LinkRadialLine__y">#</a> *LinkRadialLine*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkverticalline-">&lt;LinkVerticalLine /&gt;</h3>



<a id="#LinkVerticalLine__children" name="LinkVerticalLine__children" href="#LinkVerticalLine__children">#</a> *LinkVerticalLine*.**children**&lt;func&gt;  

<a id="#LinkVerticalLine__className" name="LinkVerticalLine__className" href="#LinkVerticalLine__className">#</a> *LinkVerticalLine*.**className**&lt;string&gt;  

<a id="#LinkVerticalLine__data" name="LinkVerticalLine__data" href="#LinkVerticalLine__data">#</a> *LinkVerticalLine*.**data**&lt;any&gt;  

<a id="#LinkVerticalLine__innerRef" name="LinkVerticalLine__innerRef" href="#LinkVerticalLine__innerRef">#</a> *LinkVerticalLine*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkVerticalLine__path" name="LinkVerticalLine__path" href="#LinkVerticalLine__path">#</a> *LinkVerticalLine*.**path**&lt;func&gt;  

<a id="#LinkVerticalLine__source" name="LinkVerticalLine__source" href="#LinkVerticalLine__source">#</a> *LinkVerticalLine*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkVerticalLine__target" name="LinkVerticalLine__target" href="#LinkVerticalLine__target">#</a> *LinkVerticalLine*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkVerticalLine__x" name="LinkVerticalLine__x" href="#LinkVerticalLine__x">#</a> *LinkVerticalLine*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkVerticalLine__y" name="LinkVerticalLine__y" href="#LinkVerticalLine__y">#</a> *LinkVerticalLine*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkhorizontalstep-">&lt;LinkHorizontalStep /&gt;</h3>



<a id="#LinkHorizontalStep__children" name="LinkHorizontalStep__children" href="#LinkHorizontalStep__children">#</a> *LinkHorizontalStep*.**children**&lt;func&gt;  

<a id="#LinkHorizontalStep__className" name="LinkHorizontalStep__className" href="#LinkHorizontalStep__className">#</a> *LinkHorizontalStep*.**className**&lt;string&gt;  

<a id="#LinkHorizontalStep__data" name="LinkHorizontalStep__data" href="#LinkHorizontalStep__data">#</a> *LinkHorizontalStep*.**data**&lt;any&gt;  

<a id="#LinkHorizontalStep__innerRef" name="LinkHorizontalStep__innerRef" href="#LinkHorizontalStep__innerRef">#</a> *LinkHorizontalStep*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkHorizontalStep__path" name="LinkHorizontalStep__path" href="#LinkHorizontalStep__path">#</a> *LinkHorizontalStep*.**path**&lt;func&gt;  

<a id="#LinkHorizontalStep__percent" name="LinkHorizontalStep__percent" href="#LinkHorizontalStep__percent">#</a> *LinkHorizontalStep*.**percent**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0.5</td></td></table>

<a id="#LinkHorizontalStep__source" name="LinkHorizontalStep__source" href="#LinkHorizontalStep__source">#</a> *LinkHorizontalStep*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkHorizontalStep__target" name="LinkHorizontalStep__target" href="#LinkHorizontalStep__target">#</a> *LinkHorizontalStep*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkHorizontalStep__x" name="LinkHorizontalStep__x" href="#LinkHorizontalStep__x">#</a> *LinkHorizontalStep*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<a id="#LinkHorizontalStep__y" name="LinkHorizontalStep__y" href="#LinkHorizontalStep__y">#</a> *LinkHorizontalStep*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<h3 id="linkradialstep-">&lt;LinkRadialStep /&gt;</h3>



<a id="#LinkRadialStep__children" name="LinkRadialStep__children" href="#LinkRadialStep__children">#</a> *LinkRadialStep*.**children**&lt;func&gt;  

<a id="#LinkRadialStep__className" name="LinkRadialStep__className" href="#LinkRadialStep__className">#</a> *LinkRadialStep*.**className**&lt;string&gt;  

<a id="#LinkRadialStep__data" name="LinkRadialStep__data" href="#LinkRadialStep__data">#</a> *LinkRadialStep*.**data**&lt;any&gt;  

<a id="#LinkRadialStep__innerRef" name="LinkRadialStep__innerRef" href="#LinkRadialStep__innerRef">#</a> *LinkRadialStep*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkRadialStep__path" name="LinkRadialStep__path" href="#LinkRadialStep__path">#</a> *LinkRadialStep*.**path**&lt;func&gt;  

<a id="#LinkRadialStep__source" name="LinkRadialStep__source" href="#LinkRadialStep__source">#</a> *LinkRadialStep*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkRadialStep__target" name="LinkRadialStep__target" href="#LinkRadialStep__target">#</a> *LinkRadialStep*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkRadialStep__x" name="LinkRadialStep__x" href="#LinkRadialStep__x">#</a> *LinkRadialStep*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkRadialStep__y" name="LinkRadialStep__y" href="#LinkRadialStep__y">#</a> *LinkRadialStep*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>

<h3 id="linkverticalstep-">&lt;LinkVerticalStep /&gt;</h3>



<a id="#LinkVerticalStep__children" name="LinkVerticalStep__children" href="#LinkVerticalStep__children">#</a> *LinkVerticalStep*.**children**&lt;func&gt;  

<a id="#LinkVerticalStep__className" name="LinkVerticalStep__className" href="#LinkVerticalStep__className">#</a> *LinkVerticalStep*.**className**&lt;string&gt;  

<a id="#LinkVerticalStep__data" name="LinkVerticalStep__data" href="#LinkVerticalStep__data">#</a> *LinkVerticalStep*.**data**&lt;any&gt;  

<a id="#LinkVerticalStep__innerRef" name="LinkVerticalStep__innerRef" href="#LinkVerticalStep__innerRef">#</a> *LinkVerticalStep*.**innerRef**&lt;union(func|object)&gt;  

<a id="#LinkVerticalStep__path" name="LinkVerticalStep__path" href="#LinkVerticalStep__path">#</a> *LinkVerticalStep*.**path**&lt;func&gt;  

<a id="#LinkVerticalStep__percent" name="LinkVerticalStep__percent" href="#LinkVerticalStep__percent">#</a> *LinkVerticalStep*.**percent**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0.5</td></td></table>

<a id="#LinkVerticalStep__source" name="LinkVerticalStep__source" href="#LinkVerticalStep__source">#</a> *LinkVerticalStep*.**source**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.source</td></td></table>

<a id="#LinkVerticalStep__target" name="LinkVerticalStep__target" href="#LinkVerticalStep__target">#</a> *LinkVerticalStep*.**target**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.target</td></td></table>

<a id="#LinkVerticalStep__x" name="LinkVerticalStep__x" href="#LinkVerticalStep__x">#</a> *LinkVerticalStep*.**x**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.x</td></td></table>

<a id="#LinkVerticalStep__y" name="LinkVerticalStep__y" href="#LinkVerticalStep__y">#</a> *LinkVerticalStep*.**y**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>d => d.y</td></td></table>
