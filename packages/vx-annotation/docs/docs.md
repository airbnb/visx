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



### &lt;LinePathAnnotation /&gt;


<a name="LinePathAnnotation__className" href="#LinePathAnnotation__className">#</a> *LinePathAnnotation*.**className**&lt;string&gt; 

Add a class name to the line path. 

<a name="LinePathAnnotation__label" href="#LinePathAnnotation__label">#</a> *LinePathAnnotation*.**label**&lt;string&gt; 

The text for your label. 

<a name="LinePathAnnotation__labelAnchor" href="#LinePathAnnotation__labelAnchor">#</a> *LinePathAnnotation*.**labelAnchor**&lt;enum('start'|'middle'|'end')&gt; 

Default:
```js
'middle'
```


The label's textAnchor. 

<a name="LinePathAnnotation__labelDx" href="#LinePathAnnotation__labelDx">#</a> *LinePathAnnotation*.**labelDx**&lt;number&gt; 

Default:
```js
0
```


The x-coordinate shift to the label. 

<a name="LinePathAnnotation__labelDy" href="#LinePathAnnotation__labelDy">#</a> *LinePathAnnotation*.**labelDy**&lt;number&gt; 

Default:
```js
0
```


The y-coordinate shift to the label 

<a name="LinePathAnnotation__labelFill" href="#LinePathAnnotation__labelFill">#</a> *LinePathAnnotation*.**labelFill**&lt;string&gt; 

The color of label. Defaults to *props*.**stroke**. 

<a name="LinePathAnnotation__labelFontSize" href="#LinePathAnnotation__labelFontSize">#</a> *LinePathAnnotation*.**labelFontSize**&lt;number&gt; 

Default:
```js
10
```


The font size of the label text. 

<a name="LinePathAnnotation__labelPaintOrder" href="#LinePathAnnotation__labelPaintOrder">#</a> *LinePathAnnotation*.**labelPaintOrder**&lt;string&gt; 

Default:
```js
'stroke'
```


The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order). 

<a name="LinePathAnnotation__labelStroke" href="#LinePathAnnotation__labelStroke">#</a> *LinePathAnnotation*.**labelStroke**&lt;string&gt; 

Default:
```js
'white'
```


The color of the label. 

<a name="LinePathAnnotation__labelStrokeWidth" href="#LinePathAnnotation__labelStrokeWidth">#</a> *LinePathAnnotation*.**labelStrokeWidth**&lt;number&gt; 

Default:
```js
3
```


The stroke width of the label text. 

<a name="LinePathAnnotation__left" href="#LinePathAnnotation__left">#</a> *LinePathAnnotation*.**left**&lt;number&gt; 

Default:
```js
0
```


A left pixel offset applied to the entire bar group. 

<a name="LinePathAnnotation__points" href="#LinePathAnnotation__points">#</a> *LinePathAnnotation*.**points**&lt;array&gt; 

Default:
```js
[]
```


An array of points describing the line path. 

<a name="LinePathAnnotation__stroke" href="#LinePathAnnotation__stroke">#</a> *LinePathAnnotation*.**stroke**&lt;string&gt; 

Default:
```js
'black'
```


The color of the line. 

<a name="LinePathAnnotation__strokeWidth" href="#LinePathAnnotation__strokeWidth">#</a> *LinePathAnnotation*.**strokeWidth**&lt;number&gt; 

Default:
```js
1
```


The pixel width of the line. 

<a name="LinePathAnnotation__top" href="#LinePathAnnotation__top">#</a> *LinePathAnnotation*.**top**&lt;number&gt; 

Default:
```js
0
```


A top pixel offset applied to the entire bar group. 
