# @vx/legend

<a title="@vx/legend npm downloads" href="https://www.npmjs.com/package/@vx/legend">
  <img src="https://img.shields.io/npm/dm/@vx/legend.svg?style=flat-square" />
</a>

Legends associate shapes and colors to data.

## Example

```js
import { LegendThreshold } from '@vx/legend';
import { scaleThreshold } from '@vx/scale';

const threshold = scaleThreshold({
  domain: [0.02, 0.04, 0.06, 0.08, 0.1],
  range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']
});

function MyChart() {
  return (
    <div>
      <svg>{/** chart stuff */}</svg>
      <LegendThreshold
        scale={threshold}
        direction="column-reverse"
        itemDirection="row-reverse"
        labelMargin="0 20px 0 0"
        shapeMargin="1px 0 0"
      />
    </div>
  );
}
```


## Installation

```
npm install --save @vx/legend
```


## Components



  - [Legend](#legend-)
  - [LegendItem](#legenditem-)
  - [LegendLabel](#legendlabel-)
  - [LegendShape](#legendshape-)
  - [Linear](#linear-)
  - [Ordinal](#ordinal-)
  - [Quantile](#quantile-)
  - [Size](#size-)
  - [Threshold](#threshold-)
  - [Circle](#circle-)
  - [Rect](#rect-)

## API



### &lt;Legend /&gt;


<a name="Legend__children" href="#Legend__children">#</a> *Legend*.**children**&lt;func&gt;  

<a name="Legend__className" href="#Legend__className">#</a> *Legend*.**className**&lt;string&gt;  

<a name="Legend__direction" href="#Legend__direction">#</a> *Legend*.**direction**&lt;string&gt;  

Default:
```js
'column'
```


<a name="Legend__domain" href="#Legend__domain">#</a> *Legend*.**domain**&lt;array&gt;  

<a name="Legend__fill" href="#Legend__fill">#</a> *Legend*.**fill**&lt;any&gt;  

Default:
```js
valueOrIdentity
```


<a name="Legend__itemDirection" href="#Legend__itemDirection">#</a> *Legend*.**itemDirection**&lt;string&gt;  

Default:
```js
'row'
```


<a name="Legend__itemMargin" href="#Legend__itemMargin">#</a> *Legend*.**itemMargin**&lt;string&gt;  

Default:
```js
'0'
```


<a name="Legend__labelAlign" href="#Legend__labelAlign">#</a> *Legend*.**labelAlign**&lt;string&gt;  

Default:
```js
'left'
```


<a name="Legend__labelFlex" href="#Legend__labelFlex">#</a> *Legend*.**labelFlex**&lt;string&gt;  

Default:
```js
'1'
```


<a name="Legend__labelFormat" href="#Legend__labelFormat">#</a> *Legend*.**labelFormat**&lt;func&gt;  

Default:
```js
valueOrIdentity
```


<a name="Legend__labelMargin" href="#Legend__labelMargin">#</a> *Legend*.**labelMargin**&lt;string&gt;  

Default:
```js
'0 4px'
```


<a name="Legend__labelTransform" href="#Legend__labelTransform">#</a> *Legend*.**labelTransform**&lt;func&gt;  

Default:
```js
function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      datum: d,
      index: i,
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  };
}
```


<a name="Legend__scale" href="#Legend__scale">#</a> *Legend*.**scale**&lt;union(func|object)&gt; `required` 

<a name="Legend__shape" href="#Legend__shape">#</a> *Legend*.**shape**&lt;any&gt;  

<a name="Legend__shapeHeight" href="#Legend__shapeHeight">#</a> *Legend*.**shapeHeight**&lt;union(number|string)&gt;  

Default:
```js
15
```


<a name="Legend__shapeMargin" href="#Legend__shapeMargin">#</a> *Legend*.**shapeMargin**&lt;any&gt;  

Default:
```js
'2px 4px 2px 0'
```


<a name="Legend__shapeStyle" href="#Legend__shapeStyle">#</a> *Legend*.**shapeStyle**&lt;any&gt;  

<a name="Legend__shapeWidth" href="#Legend__shapeWidth">#</a> *Legend*.**shapeWidth**&lt;union(number|string)&gt;  

Default:
```js
15
```


<a name="Legend__size" href="#Legend__size">#</a> *Legend*.**size**&lt;any&gt;  

Default:
```js
valueOrIdentity
```


<a name="Legend__style" href="#Legend__style">#</a> *Legend*.**style**&lt;any&gt;  

Default:
```js
{
  display: 'flex'
}
```


### &lt;LegendItem /&gt;


<a name="LegendItem__alignItems" href="#LegendItem__alignItems">#</a> *LegendItem*.**alignItems**&lt;string&gt;  

Default:
```js
'center'
```


<a name="LegendItem__children" href="#LegendItem__children">#</a> *LegendItem*.**children**&lt;any&gt;  

<a name="LegendItem__display" href="#LegendItem__display">#</a> *LegendItem*.**display**  

Default:
```js
'flex'
```


<a name="LegendItem__flexDirection" href="#LegendItem__flexDirection">#</a> *LegendItem*.**flexDirection**&lt;string&gt;  

Default:
```js
'row'
```


<a name="LegendItem__margin" href="#LegendItem__margin">#</a> *LegendItem*.**margin**&lt;union(string|number)&gt;  

Default:
```js
'0'
```


### &lt;LegendLabel /&gt;


<a name="LegendLabel__align" href="#LegendLabel__align">#</a> *LegendLabel*.**align**&lt;string&gt;  

Default:
```js
'left'
```


<a name="LegendLabel__children" href="#LegendLabel__children">#</a> *LegendLabel*.**children**&lt;any&gt;  

<a name="LegendLabel__flex" href="#LegendLabel__flex">#</a> *LegendLabel*.**flex**&lt;union(string|number)&gt;  

Default:
```js
'1'
```


<a name="LegendLabel__label" href="#LegendLabel__label">#</a> *LegendLabel*.**label**&lt;any&gt;  

<a name="LegendLabel__margin" href="#LegendLabel__margin">#</a> *LegendLabel*.**margin**&lt;union(string|number)&gt;  

Default:
```js
'5px 0'
```


### &lt;LegendShape /&gt;


<a name="LegendShape__fill" href="#LegendShape__fill">#</a> *LegendShape*.**fill**&lt;any&gt;  

<a name="LegendShape__height" href="#LegendShape__height">#</a> *LegendShape*.**height**&lt;any&gt;  

<a name="LegendShape__label" href="#LegendShape__label">#</a> *LegendShape*.**label**&lt;any&gt;  

<a name="LegendShape__margin" href="#LegendShape__margin">#</a> *LegendShape*.**margin**&lt;any&gt;  

<a name="LegendShape__shape" href="#LegendShape__shape">#</a> *LegendShape*.**shape**&lt;any&gt;  

Default:
```js
ShapeRect
```


<a name="LegendShape__shapeStyle" href="#LegendShape__shapeStyle">#</a> *LegendShape*.**shapeStyle**&lt;any&gt;  

<a name="LegendShape__size" href="#LegendShape__size">#</a> *LegendShape*.**size**&lt;any&gt;  

<a name="LegendShape__width" href="#LegendShape__width">#</a> *LegendShape*.**width**&lt;any&gt;  

### &lt;Linear /&gt;


<a name="Linear__domain" href="#Linear__domain">#</a> *Linear*.**domain**&lt;array&gt;  

<a name="Linear__labelFormat" href="#Linear__labelFormat">#</a> *Linear*.**labelFormat**&lt;func&gt;  

Default:
```js
x => x
```


<a name="Linear__labelTransform" href="#Linear__labelTransform">#</a> *Linear*.**labelTransform**&lt;func&gt;  

Default:
```js
function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  };
}
```


<a name="Linear__scale" href="#Linear__scale">#</a> *Linear*.**scale**&lt;func&gt; `required` 

<a name="Linear__steps" href="#Linear__steps">#</a> *Linear*.**steps**&lt;number&gt;  

Default:
```js
5
```


### &lt;Ordinal /&gt;


<a name="Ordinal__domain" href="#Ordinal__domain">#</a> *Ordinal*.**domain**&lt;array&gt;  

<a name="Ordinal__labelFormat" href="#Ordinal__labelFormat">#</a> *Ordinal*.**labelFormat**&lt;func&gt;  

Default:
```js
valueOrIdentity
```


<a name="Ordinal__labelTransform" href="#Ordinal__labelTransform">#</a> *Ordinal*.**labelTransform**&lt;func&gt;  

Default:
```js
function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      datum: d,
      index: i,
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  };
}
```


<a name="Ordinal__scale" href="#Ordinal__scale">#</a> *Ordinal*.**scale**&lt;func&gt; `required` 

### &lt;Quantile /&gt;


<a name="Quantile__domain" href="#Quantile__domain">#</a> *Quantile*.**domain**&lt;array&gt;  

<a name="Quantile__labelDelimiter" href="#Quantile__labelDelimiter">#</a> *Quantile*.**labelDelimiter**&lt;string&gt;  

Default:
```js
'-'
```


<a name="Quantile__labelFormat" href="#Quantile__labelFormat">#</a> *Quantile*.**labelFormat**&lt;func&gt;  

Default:
```js
x => x
```


<a name="Quantile__labelTransform" href="#Quantile__labelTransform">#</a> *Quantile*.**labelTransform**&lt;func&gt;  

<a name="Quantile__scale" href="#Quantile__scale">#</a> *Quantile*.**scale**&lt;func&gt; `required` 

### &lt;Size /&gt;


<a name="Size__labelFormat" href="#Size__labelFormat">#</a> *Size*.**labelFormat**  

Default:
```js
x => x
```


<a name="Size__labelTransform" href="#Size__labelTransform">#</a> *Size*.**labelTransform**  

Default:
```js
function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d),
      datum: d,
      index: i
    };
  };
}
```


<a name="Size__steps" href="#Size__steps">#</a> *Size*.**steps**  

Default:
```js
5
```


### &lt;Threshold /&gt;


<a name="Threshold__domain" href="#Threshold__domain">#</a> *Threshold*.**domain**&lt;array&gt;  

<a name="Threshold__labelDelimiter" href="#Threshold__labelDelimiter">#</a> *Threshold*.**labelDelimiter**&lt;string&gt;  

Default:
```js
'to'
```


<a name="Threshold__labelFormat" href="#Threshold__labelFormat">#</a> *Threshold*.**labelFormat**&lt;func&gt;  

Default:
```js
x => x
```


<a name="Threshold__labelLower" href="#Threshold__labelLower">#</a> *Threshold*.**labelLower**&lt;string&gt;  

Default:
```js
'Less than '
```


<a name="Threshold__labelTransform" href="#Threshold__labelTransform">#</a> *Threshold*.**labelTransform**&lt;func&gt;  

<a name="Threshold__labelUpper" href="#Threshold__labelUpper">#</a> *Threshold*.**labelUpper**&lt;string&gt;  

Default:
```js
'More than '
```


<a name="Threshold__scale" href="#Threshold__scale">#</a> *Threshold*.**scale**&lt;func&gt; `required` 

### &lt;Circle /&gt;


<a name="Circle__fill" href="#Circle__fill">#</a> *Circle*.**fill**&lt;any&gt;  

<a name="Circle__height" href="#Circle__height">#</a> *Circle*.**height**&lt;union(number|string)&gt;  

<a name="Circle__style" href="#Circle__style">#</a> *Circle*.**style**&lt;object&gt;  

<a name="Circle__width" href="#Circle__width">#</a> *Circle*.**width**&lt;union(number|string)&gt;  

### &lt;Rect /&gt;


<a name="Rect__fill" href="#Rect__fill">#</a> *Rect*.**fill**&lt;any&gt;  

<a name="Rect__height" href="#Rect__height">#</a> *Rect*.**height**&lt;union(number|string)&gt;  

<a name="Rect__style" href="#Rect__style">#</a> *Rect*.**style**&lt;object&gt;  

<a name="Rect__width" href="#Rect__width">#</a> *Rect*.**width**&lt;union(number|string)&gt;  
