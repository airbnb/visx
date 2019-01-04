# @vx/marker

<a title="@vx/marker npm downloads" href="https://www.npmjs.com/package/@vx/marker">
  <img src="https://img.shields.io/npm/dm/@vx/marker.svg?style=flat-square" />
</a>

A Marker is a line with a piece of text attached to it. It's great for highlighting locations in your graph.

## Example

![marker example](http://i.imgur.com/vbW3Ysa.png)

```js
<Marker
  from={markerFrom}
  to={markerTo}
  stroke={'white'}
  label={'deploy'}
  labelStroke={'none'}
  labelDx={6}
  labelDy={15}
/>
```


## Installation

```
npm install --save @vx/marker
```


## Components



  - [Marker](#marker-)

## API



<h3 id="marker-">&lt;Marker /&gt;</h3>



<a id="#Marker__className" name="Marker__className" href="#Marker__className">#</a> *Marker*.**className**&lt;string&gt;  

<a id="#Marker__from" name="Marker__from" href="#Marker__from">#</a> *Marker*.**from**&lt;object&gt;  

<a id="#Marker__label" name="Marker__label" href="#Marker__label">#</a> *Marker*.**label**&lt;union(string|func)&gt;  

<a id="#Marker__labelAnchor" name="Marker__labelAnchor" href="#Marker__labelAnchor">#</a> *Marker*.**labelAnchor**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'left'</td></td></table>

<a id="#Marker__labelDx" name="Marker__labelDx" href="#Marker__labelDx">#</a> *Marker*.**labelDx**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Marker__labelDy" name="Marker__labelDy" href="#Marker__labelDy">#</a> *Marker*.**labelDy**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Marker__labelFill" name="Marker__labelFill" href="#Marker__labelFill">#</a> *Marker*.**labelFill**&lt;string&gt;  

<a id="#Marker__labelFontSize" name="Marker__labelFontSize" href="#Marker__labelFontSize">#</a> *Marker*.**labelFontSize**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>10</td></td></table>

<a id="#Marker__labelPaintOrder" name="Marker__labelPaintOrder" href="#Marker__labelPaintOrder">#</a> *Marker*.**labelPaintOrder**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'stroke'</td></td></table>

<a id="#Marker__labelStroke" name="Marker__labelStroke" href="#Marker__labelStroke">#</a> *Marker*.**labelStroke**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'white'</td></td></table>

<a id="#Marker__labelStrokeWidth" name="Marker__labelStrokeWidth" href="#Marker__labelStrokeWidth">#</a> *Marker*.**labelStrokeWidth**&lt;union(string|number)&gt;  <table><tr><td><strong>Default</strong></td><td>3</td></td></table>

<a id="#Marker__left" name="Marker__left" href="#Marker__left">#</a> *Marker*.**left**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Marker__stroke" name="Marker__stroke" href="#Marker__stroke">#</a> *Marker*.**stroke**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'magenta'</td></td></table>

<a id="#Marker__strokeDasharray" name="Marker__strokeDasharray" href="#Marker__strokeDasharray">#</a> *Marker*.**strokeDasharray**&lt;string&gt;  

<a id="#Marker__strokeWidth" name="Marker__strokeWidth" href="#Marker__strokeWidth">#</a> *Marker*.**strokeWidth**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>2</td></td></table>

<a id="#Marker__to" name="Marker__to" href="#Marker__to">#</a> *Marker*.**to**&lt;object&gt;  

<a id="#Marker__top" name="Marker__top" href="#Marker__top">#</a> *Marker*.**top**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Marker__transform" name="Marker__transform" href="#Marker__transform">#</a> *Marker*.**transform**&lt;string&gt;  
