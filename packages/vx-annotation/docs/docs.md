# @vx/annotation

<p>
  <a title="@vx/annotation npm downloads" href="https://www.npmjs.com/package/@vx/annotation">
    <img src="https://img.shields.io/npm/dm/@vx/annotation.svg?style=flat-square" />
  </a>
</p>

**Status**

We recommend using [react-annotation](http://react-annotation.susielu.com/) by @susielu. This package is a work in progress. In the future we may make some helpers built on top of react-annotation.


## Installation

```
npm install --save @vx/annotation
```


## Components



  - [LinePathAnnotation](#linepathannotation-)

## API



<h3 id="linepathannotation-">&lt;LinePathAnnotation /&gt;</h3>



<a id="#LinePathAnnotation__className" name="LinePathAnnotation__className" href="#LinePathAnnotation__className">#</a> *LinePathAnnotation*.**className**&lt;string&gt; 

Add a class name to the line path. 

<a id="#LinePathAnnotation__label" name="LinePathAnnotation__label" href="#LinePathAnnotation__label">#</a> *LinePathAnnotation*.**label**&lt;string&gt; 

The text for your label. 

<a id="#LinePathAnnotation__labelAnchor" name="LinePathAnnotation__labelAnchor" href="#LinePathAnnotation__labelAnchor">#</a> *LinePathAnnotation*.**labelAnchor**&lt;enum('start'|'middle'|'end')&gt; 

The label's textAnchor. <table><tr><td><strong>Default</strong></td><td>'middle'</td></td></table>

<a id="#LinePathAnnotation__labelDx" name="LinePathAnnotation__labelDx" href="#LinePathAnnotation__labelDx">#</a> *LinePathAnnotation*.**labelDx**&lt;number&gt; 

The x-coordinate shift to the label. <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#LinePathAnnotation__labelDy" name="LinePathAnnotation__labelDy" href="#LinePathAnnotation__labelDy">#</a> *LinePathAnnotation*.**labelDy**&lt;number&gt; 

The y-coordinate shift to the label <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#LinePathAnnotation__labelFill" name="LinePathAnnotation__labelFill" href="#LinePathAnnotation__labelFill">#</a> *LinePathAnnotation*.**labelFill**&lt;string&gt; 

The color of label. Defaults to *props*.**stroke**. 

<a id="#LinePathAnnotation__labelFontSize" name="LinePathAnnotation__labelFontSize" href="#LinePathAnnotation__labelFontSize">#</a> *LinePathAnnotation*.**labelFontSize**&lt;number&gt; 

The font size of the label text. <table><tr><td><strong>Default</strong></td><td>10</td></td></table>

<a id="#LinePathAnnotation__labelPaintOrder" name="LinePathAnnotation__labelPaintOrder" href="#LinePathAnnotation__labelPaintOrder">#</a> *LinePathAnnotation*.**labelPaintOrder**&lt;string&gt; 

The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order). <table><tr><td><strong>Default</strong></td><td>'stroke'</td></td></table>

<a id="#LinePathAnnotation__labelStroke" name="LinePathAnnotation__labelStroke" href="#LinePathAnnotation__labelStroke">#</a> *LinePathAnnotation*.**labelStroke**&lt;string&gt; 

The color of the label. <table><tr><td><strong>Default</strong></td><td>'white'</td></td></table>

<a id="#LinePathAnnotation__labelStrokeWidth" name="LinePathAnnotation__labelStrokeWidth" href="#LinePathAnnotation__labelStrokeWidth">#</a> *LinePathAnnotation*.**labelStrokeWidth**&lt;number&gt; 

The stroke width of the label text. <table><tr><td><strong>Default</strong></td><td>3</td></td></table>

<a id="#LinePathAnnotation__left" name="LinePathAnnotation__left" href="#LinePathAnnotation__left">#</a> *LinePathAnnotation*.**left**&lt;number&gt; 

A left pixel offset applied to the entire bar group. <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#LinePathAnnotation__points" name="LinePathAnnotation__points" href="#LinePathAnnotation__points">#</a> *LinePathAnnotation*.**points**&lt;array&gt; 

An array of points describing the line path. <table><tr><td><strong>Default</strong></td><td>[]</td></td></table>

<a id="#LinePathAnnotation__stroke" name="LinePathAnnotation__stroke" href="#LinePathAnnotation__stroke">#</a> *LinePathAnnotation*.**stroke**&lt;string&gt; 

The color of the line. <table><tr><td><strong>Default</strong></td><td>'black'</td></td></table>

<a id="#LinePathAnnotation__strokeWidth" name="LinePathAnnotation__strokeWidth" href="#LinePathAnnotation__strokeWidth">#</a> *LinePathAnnotation*.**strokeWidth**&lt;number&gt; 

The pixel width of the line. <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#LinePathAnnotation__top" name="LinePathAnnotation__top" href="#LinePathAnnotation__top">#</a> *LinePathAnnotation*.**top**&lt;number&gt; 

A top pixel offset applied to the entire bar group. <table><tr><td><strong>Default</strong></td><td>0</td></td></table>
