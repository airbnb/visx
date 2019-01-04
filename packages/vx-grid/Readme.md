# @vx/grid

<a title="@vx/grid npm downloads" href="https://www.npmjs.com/package/@vx/grid">
  <img src="https://img.shields.io/npm/dm/@vx/grid.svg?style=flat-square" />
</a>

The `@vx/grid` package lets you create rows and columns. Or, you can use a `<Grid />` to get them both at once!

## Example

![grid example](http://i.imgur.com/KPmq4XV.png)

```js
import { Grid } from '@vx/grid';
// or
// import * as Grid from '@vx/grid';
// <Grid.Grid />

const grid = (
  <Grid
    xScale={xScale}
    yScale={yScale}
    width={xMax}
    height={yMax}
    numTicksRows={numTicksForHeight(height)}
    numTicksColumns={numTicksForWidth(width)}
  />
);
```


## Installation

```
npm install --save @vx/grid
```


## Components



  - [Grid](#grid-)
  - [GridColumns](#gridcolumns-)
  - [GridRows](#gridrows-)

## API



<h3 id="grid-">&lt;Grid /&gt;</h3>



<a id="#Grid__className" name="Grid__className" href="#Grid__className">#</a> *Grid*.**className**&lt;string&gt;  

<a id="#Grid__columnLineStyle" name="Grid__columnLineStyle" href="#Grid__columnLineStyle">#</a> *Grid*.**columnLineStyle**&lt;object&gt;  

<a id="#Grid__columnTickValues" name="Grid__columnTickValues" href="#Grid__columnTickValues">#</a> *Grid*.**columnTickValues**&lt;array&gt;  

<a id="#Grid__height" name="Grid__height" href="#Grid__height">#</a> *Grid*.**height**&lt;number&gt; `required` 

<a id="#Grid__left" name="Grid__left" href="#Grid__left">#</a> *Grid*.**left**&lt;number&gt;  

<a id="#Grid__numTicksColumns" name="Grid__numTicksColumns" href="#Grid__numTicksColumns">#</a> *Grid*.**numTicksColumns**&lt;number&gt;  

<a id="#Grid__numTicksRows" name="Grid__numTicksRows" href="#Grid__numTicksRows">#</a> *Grid*.**numTicksRows**&lt;number&gt;  

<a id="#Grid__rowLineStyle" name="Grid__rowLineStyle" href="#Grid__rowLineStyle">#</a> *Grid*.**rowLineStyle**&lt;object&gt;  

<a id="#Grid__rowTickValues" name="Grid__rowTickValues" href="#Grid__rowTickValues">#</a> *Grid*.**rowTickValues**&lt;array&gt;  

<a id="#Grid__stroke" name="Grid__stroke" href="#Grid__stroke">#</a> *Grid*.**stroke**&lt;string&gt;  

<a id="#Grid__strokeDasharray" name="Grid__strokeDasharray" href="#Grid__strokeDasharray">#</a> *Grid*.**strokeDasharray**&lt;string&gt;  

<a id="#Grid__strokeWidth" name="Grid__strokeWidth" href="#Grid__strokeWidth">#</a> *Grid*.**strokeWidth**&lt;union(string|number)&gt;  

<a id="#Grid__top" name="Grid__top" href="#Grid__top">#</a> *Grid*.**top**&lt;number&gt;  

<a id="#Grid__width" name="Grid__width" href="#Grid__width">#</a> *Grid*.**width**&lt;number&gt; `required` 

<a id="#Grid__xOffset" name="Grid__xOffset" href="#Grid__xOffset">#</a> *Grid*.**xOffset**&lt;number&gt;  

<a id="#Grid__xScale" name="Grid__xScale" href="#Grid__xScale">#</a> *Grid*.**xScale**&lt;func&gt; `required` 

<a id="#Grid__yOffset" name="Grid__yOffset" href="#Grid__yOffset">#</a> *Grid*.**yOffset**&lt;number&gt;  

<a id="#Grid__yScale" name="Grid__yScale" href="#Grid__yScale">#</a> *Grid*.**yScale**&lt;func&gt; `required` 

<h3 id="gridcolumns-">&lt;GridColumns /&gt;</h3>



<a id="#GridColumns__className" name="GridColumns__className" href="#GridColumns__className">#</a> *GridColumns*.**className**&lt;string&gt;  

<a id="#GridColumns__height" name="GridColumns__height" href="#GridColumns__height">#</a> *GridColumns*.**height**&lt;number&gt; `required` 

<a id="#GridColumns__left" name="GridColumns__left" href="#GridColumns__left">#</a> *GridColumns*.**left**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#GridColumns__lineStyle" name="GridColumns__lineStyle" href="#GridColumns__lineStyle">#</a> *GridColumns*.**lineStyle**&lt;object&gt;  

<a id="#GridColumns__numTicks" name="GridColumns__numTicks" href="#GridColumns__numTicks">#</a> *GridColumns*.**numTicks**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>10</td></td></table>

<a id="#GridColumns__offset" name="GridColumns__offset" href="#GridColumns__offset">#</a> *GridColumns*.**offset**&lt;number&gt;  

<a id="#GridColumns__scale" name="GridColumns__scale" href="#GridColumns__scale">#</a> *GridColumns*.**scale**&lt;func&gt; `required` 

<a id="#GridColumns__stroke" name="GridColumns__stroke" href="#GridColumns__stroke">#</a> *GridColumns*.**stroke**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#eaf0f6'</td></td></table>

<a id="#GridColumns__strokeDasharray" name="GridColumns__strokeDasharray" href="#GridColumns__strokeDasharray">#</a> *GridColumns*.**strokeDasharray**&lt;string&gt;  

<a id="#GridColumns__strokeWidth" name="GridColumns__strokeWidth" href="#GridColumns__strokeWidth">#</a> *GridColumns*.**strokeWidth**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#GridColumns__tickValues" name="GridColumns__tickValues" href="#GridColumns__tickValues">#</a> *GridColumns*.**tickValues**&lt;array&gt;  

<a id="#GridColumns__top" name="GridColumns__top" href="#GridColumns__top">#</a> *GridColumns*.**top**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<h3 id="gridrows-">&lt;GridRows /&gt;</h3>



<a id="#GridRows__className" name="GridRows__className" href="#GridRows__className">#</a> *GridRows*.**className**&lt;string&gt;  

<a id="#GridRows__left" name="GridRows__left" href="#GridRows__left">#</a> *GridRows*.**left**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#GridRows__lineStyle" name="GridRows__lineStyle" href="#GridRows__lineStyle">#</a> *GridRows*.**lineStyle**&lt;object&gt;  

<a id="#GridRows__numTicks" name="GridRows__numTicks" href="#GridRows__numTicks">#</a> *GridRows*.**numTicks**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>10</td></td></table>

<a id="#GridRows__offset" name="GridRows__offset" href="#GridRows__offset">#</a> *GridRows*.**offset**&lt;number&gt;  

<a id="#GridRows__scale" name="GridRows__scale" href="#GridRows__scale">#</a> *GridRows*.**scale**&lt;func&gt; `required` 

<a id="#GridRows__stroke" name="GridRows__stroke" href="#GridRows__stroke">#</a> *GridRows*.**stroke**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#eaf0f6'</td></td></table>

<a id="#GridRows__strokeDasharray" name="GridRows__strokeDasharray" href="#GridRows__strokeDasharray">#</a> *GridRows*.**strokeDasharray**&lt;string&gt;  

<a id="#GridRows__strokeWidth" name="GridRows__strokeWidth" href="#GridRows__strokeWidth">#</a> *GridRows*.**strokeWidth**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#GridRows__tickValues" name="GridRows__tickValues" href="#GridRows__tickValues">#</a> *GridRows*.**tickValues**&lt;array&gt;  

<a id="#GridRows__top" name="GridRows__top" href="#GridRows__top">#</a> *GridRows*.**top**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#GridRows__width" name="GridRows__width" href="#GridRows__width">#</a> *GridRows*.**width**&lt;number&gt; `required` 
