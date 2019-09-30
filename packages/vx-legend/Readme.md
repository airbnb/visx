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



<h3 id="legend-">&lt;Legend /&gt;</h3>



<a id="#Legend__children" name="Legend__children" href="#Legend__children">#</a> *Legend*.**children**&lt;func&gt;  

<a id="#Legend__className" name="Legend__className" href="#Legend__className">#</a> *Legend*.**className**&lt;string&gt;  

<a id="#Legend__direction" name="Legend__direction" href="#Legend__direction">#</a> *Legend*.**direction**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'column'</td></td></table>

<a id="#Legend__domain" name="Legend__domain" href="#Legend__domain">#</a> *Legend*.**domain**&lt;array&gt;  

<a id="#Legend__fill" name="Legend__fill" href="#Legend__fill">#</a> *Legend*.**fill**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>valueOrIdentity</td></td></table>

<a id="#Legend__itemDirection" name="Legend__itemDirection" href="#Legend__itemDirection">#</a> *Legend*.**itemDirection**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'row'</td></td></table>

<a id="#Legend__itemMargin" name="Legend__itemMargin" href="#Legend__itemMargin">#</a> *Legend*.**itemMargin**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'0'</td></td></table>

<a id="#Legend__labelAlign" name="Legend__labelAlign" href="#Legend__labelAlign">#</a> *Legend*.**labelAlign**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'left'</td></td></table>

<a id="#Legend__labelFlex" name="Legend__labelFlex" href="#Legend__labelFlex">#</a> *Legend*.**labelFlex**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'1'</td></td></table>

<a id="#Legend__labelFormat" name="Legend__labelFormat" href="#Legend__labelFormat">#</a> *Legend*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>valueOrIdentity</td></td></table>

<a id="#Legend__labelMargin" name="Legend__labelMargin" href="#Legend__labelMargin">#</a> *Legend*.**labelMargin**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'0 4px'</td></td></table>

<a id="#Legend__labelTransform" name="Legend__labelTransform" href="#Legend__labelTransform">#</a> *Legend*.**labelTransform**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      datum: d,
      index: i,
      text: `${labelFormat(d, i)}`,
      value: scale(d),
    };
  };
}</td></td></table>

<a id="#Legend__scale" name="Legend__scale" href="#Legend__scale">#</a> *Legend*.**scale**&lt;union(func|object)&gt; `required` 

<a id="#Legend__shape" name="Legend__shape" href="#Legend__shape">#</a> *Legend*.**shape**&lt;any&gt;  

<a id="#Legend__shapeHeight" name="Legend__shapeHeight" href="#Legend__shapeHeight">#</a> *Legend*.**shapeHeight**&lt;union(number|string)&gt;  <table><tr><td><strong>Default</strong></td><td>15</td></td></table>

<a id="#Legend__shapeMargin" name="Legend__shapeMargin" href="#Legend__shapeMargin">#</a> *Legend*.**shapeMargin**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>'2px 4px 2px 0'</td></td></table>

<a id="#Legend__shapeStyle" name="Legend__shapeStyle" href="#Legend__shapeStyle">#</a> *Legend*.**shapeStyle**&lt;any&gt;  

<a id="#Legend__shapeWidth" name="Legend__shapeWidth" href="#Legend__shapeWidth">#</a> *Legend*.**shapeWidth**&lt;union(number|string)&gt;  <table><tr><td><strong>Default</strong></td><td>15</td></td></table>

<a id="#Legend__size" name="Legend__size" href="#Legend__size">#</a> *Legend*.**size**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>valueOrIdentity</td></td></table>

<a id="#Legend__style" name="Legend__style" href="#Legend__style">#</a> *Legend*.**style**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>{
  display: 'flex',
}</td></td></table>

<h3 id="legenditem-">&lt;LegendItem /&gt;</h3>



<a id="#LegendItem__alignItems" name="LegendItem__alignItems" href="#LegendItem__alignItems">#</a> *LegendItem*.**alignItems**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'center'</td></td></table>

<a id="#LegendItem__children" name="LegendItem__children" href="#LegendItem__children">#</a> *LegendItem*.**children**&lt;any&gt;  

<a id="#LegendItem__display" name="LegendItem__display" href="#LegendItem__display">#</a> *LegendItem*.**display**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'flex'</td></td></table>

<a id="#LegendItem__flexDirection" name="LegendItem__flexDirection" href="#LegendItem__flexDirection">#</a> *LegendItem*.**flexDirection**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'row'</td></td></table>

<a id="#LegendItem__margin" name="LegendItem__margin" href="#LegendItem__margin">#</a> *LegendItem*.**margin**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>'0'</td></td></table>

<h3 id="legendlabel-">&lt;LegendLabel /&gt;</h3>



<a id="#LegendLabel__align" name="LegendLabel__align" href="#LegendLabel__align">#</a> *LegendLabel*.**align**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'left'</td></td></table>

<a id="#LegendLabel__children" name="LegendLabel__children" href="#LegendLabel__children">#</a> *LegendLabel*.**children**&lt;any&gt;  

<a id="#LegendLabel__flex" name="LegendLabel__flex" href="#LegendLabel__flex">#</a> *LegendLabel*.**flex**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>'1'</td></td></table>

<a id="#LegendLabel__label" name="LegendLabel__label" href="#LegendLabel__label">#</a> *LegendLabel*.**label**&lt;any&gt;  

<a id="#LegendLabel__margin" name="LegendLabel__margin" href="#LegendLabel__margin">#</a> *LegendLabel*.**margin**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>'5px 0'</td></td></table>

<h3 id="legendshape-">&lt;LegendShape /&gt;</h3>



<a id="#LegendShape__fill" name="LegendShape__fill" href="#LegendShape__fill">#</a> *LegendShape*.**fill**&lt;any&gt;  

<a id="#LegendShape__height" name="LegendShape__height" href="#LegendShape__height">#</a> *LegendShape*.**height**&lt;any&gt;  

<a id="#LegendShape__label" name="LegendShape__label" href="#LegendShape__label">#</a> *LegendShape*.**label**&lt;any&gt;  

<a id="#LegendShape__margin" name="LegendShape__margin" href="#LegendShape__margin">#</a> *LegendShape*.**margin**&lt;any&gt;  

<a id="#LegendShape__shape" name="LegendShape__shape" href="#LegendShape__shape">#</a> *LegendShape*.**shape**&lt;any&gt;  <table><tr><td><strong>Default</strong></td><td>ShapeRect</td></td></table>

<a id="#LegendShape__shapeStyle" name="LegendShape__shapeStyle" href="#LegendShape__shapeStyle">#</a> *LegendShape*.**shapeStyle**&lt;any&gt;  

<a id="#LegendShape__size" name="LegendShape__size" href="#LegendShape__size">#</a> *LegendShape*.**size**&lt;any&gt;  

<a id="#LegendShape__width" name="LegendShape__width" href="#LegendShape__width">#</a> *LegendShape*.**width**&lt;any&gt;  

<h3 id="linear-">&lt;Linear /&gt;</h3>



<a id="#Linear__domain" name="Linear__domain" href="#Linear__domain">#</a> *Linear*.**domain**&lt;array&gt;  

<a id="#Linear__labelFormat" name="Linear__labelFormat" href="#Linear__labelFormat">#</a> *Linear*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>x => x</td></td></table>

<a id="#Linear__labelTransform" name="Linear__labelTransform" href="#Linear__labelTransform">#</a> *Linear*.**labelTransform**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d),
    };
  };
}</td></td></table>

<a id="#Linear__scale" name="Linear__scale" href="#Linear__scale">#</a> *Linear*.**scale**&lt;func&gt; `required` 

<a id="#Linear__steps" name="Linear__steps" href="#Linear__steps">#</a> *Linear*.**steps**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>5</td></td></table>

<h3 id="ordinal-">&lt;Ordinal /&gt;</h3>



<a id="#Ordinal__domain" name="Ordinal__domain" href="#Ordinal__domain">#</a> *Ordinal*.**domain**&lt;array&gt;  

<a id="#Ordinal__labelFormat" name="Ordinal__labelFormat" href="#Ordinal__labelFormat">#</a> *Ordinal*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>valueOrIdentity</td></td></table>

<a id="#Ordinal__labelTransform" name="Ordinal__labelTransform" href="#Ordinal__labelTransform">#</a> *Ordinal*.**labelTransform**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      datum: d,
      index: i,
      text: `${labelFormat(d, i)}`,
      value: scale(d),
    };
  };
}</td></td></table>

<a id="#Ordinal__scale" name="Ordinal__scale" href="#Ordinal__scale">#</a> *Ordinal*.**scale**&lt;func&gt; `required` 

<h3 id="quantile-">&lt;Quantile /&gt;</h3>



<a id="#Quantile__domain" name="Quantile__domain" href="#Quantile__domain">#</a> *Quantile*.**domain**&lt;array&gt;  

<a id="#Quantile__labelDelimiter" name="Quantile__labelDelimiter" href="#Quantile__labelDelimiter">#</a> *Quantile*.**labelDelimiter**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'-'</td></td></table>

<a id="#Quantile__labelFormat" name="Quantile__labelFormat" href="#Quantile__labelFormat">#</a> *Quantile*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>x => x</td></td></table>

<a id="#Quantile__labelTransform" name="Quantile__labelTransform" href="#Quantile__labelTransform">#</a> *Quantile*.**labelTransform**&lt;func&gt;  

<a id="#Quantile__scale" name="Quantile__scale" href="#Quantile__scale">#</a> *Quantile*.**scale**&lt;func&gt; `required` 

<h3 id="size-">&lt;Size /&gt;</h3>



<a id="#Size__domain" name="Size__domain" href="#Size__domain">#</a> *Size*.**domain**&lt;array&gt;  

<a id="#Size__labelFormat" name="Size__labelFormat" href="#Size__labelFormat">#</a> *Size*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>x => x</td></td></table>

<a id="#Size__labelTransform" name="Size__labelTransform" href="#Size__labelTransform">#</a> *Size*.**labelTransform**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d),
      datum: d,
      index: i,
    };
  };
}</td></td></table>

<a id="#Size__scale" name="Size__scale" href="#Size__scale">#</a> *Size*.**scale**&lt;func&gt; `required` 

<a id="#Size__steps" name="Size__steps" href="#Size__steps">#</a> *Size*.**steps**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>5</td></td></table>

<h3 id="threshold-">&lt;Threshold /&gt;</h3>



<a id="#Threshold__domain" name="Threshold__domain" href="#Threshold__domain">#</a> *Threshold*.**domain**&lt;array&gt;  

<a id="#Threshold__labelDelimiter" name="Threshold__labelDelimiter" href="#Threshold__labelDelimiter">#</a> *Threshold*.**labelDelimiter**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'to'</td></td></table>

<a id="#Threshold__labelFormat" name="Threshold__labelFormat" href="#Threshold__labelFormat">#</a> *Threshold*.**labelFormat**&lt;func&gt;  <table><tr><td><strong>Default</strong></td><td>x => x</td></td></table>

<a id="#Threshold__labelLower" name="Threshold__labelLower" href="#Threshold__labelLower">#</a> *Threshold*.**labelLower**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'Less than '</td></td></table>

<a id="#Threshold__labelTransform" name="Threshold__labelTransform" href="#Threshold__labelTransform">#</a> *Threshold*.**labelTransform**&lt;func&gt;  

<a id="#Threshold__labelUpper" name="Threshold__labelUpper" href="#Threshold__labelUpper">#</a> *Threshold*.**labelUpper**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'More than '</td></td></table>

<a id="#Threshold__scale" name="Threshold__scale" href="#Threshold__scale">#</a> *Threshold*.**scale**&lt;func&gt; `required` 

<h3 id="circle-">&lt;Circle /&gt;</h3>



<a id="#Circle__fill" name="Circle__fill" href="#Circle__fill">#</a> *Circle*.**fill**&lt;any&gt;  

<a id="#Circle__height" name="Circle__height" href="#Circle__height">#</a> *Circle*.**height**&lt;union(number|string)&gt;  

<a id="#Circle__style" name="Circle__style" href="#Circle__style">#</a> *Circle*.**style**&lt;object&gt;  

<a id="#Circle__width" name="Circle__width" href="#Circle__width">#</a> *Circle*.**width**&lt;union(number|string)&gt;  

<h3 id="rect-">&lt;Rect /&gt;</h3>



<a id="#Rect__fill" name="Rect__fill" href="#Rect__fill">#</a> *Rect*.**fill**&lt;any&gt;  

<a id="#Rect__height" name="Rect__height" href="#Rect__height">#</a> *Rect*.**height**&lt;union(number|string)&gt;  

<a id="#Rect__style" name="Rect__style" href="#Rect__style">#</a> *Rect*.**style**&lt;object&gt;  

<a id="#Rect__width" name="Rect__width" href="#Rect__width">#</a> *Rect*.**width**&lt;union(number|string)&gt;  
