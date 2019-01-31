# @vx/Zoom

<a title="@vx/zoom npm downloads" href="https://www.npmjs.com/package/@vx/zoom">
  <img src="https://img.shields.io/npm/dm/@vx/zoom.svg?style=flat-square" />
</a>


## Installation

```
npm install --save @vx/zoom
```


## Components



  - [Zoom](#zoom-)

## API



<h3 id="zoom-">&lt;Zoom /&gt;</h3>



<a id="#Zoom__children" name="Zoom__children" href="#Zoom__children">#</a> *Zoom*.**children**&lt;func&gt; `required` 

<a id="#Zoom__constrain" name="Zoom__constrain" href="#Zoom__constrain">#</a> *Zoom*.**constrain**&lt;func&gt; 

By default constrain() will only constrain scale values. To change
constraints you can pass in your own constrain function as a prop.

For example, if you wanted to constrain your view to within [[0, 0], [width, height]]:

```js
function constrain(transformMatrix, prevTransformMatrix) {
  const min = applyMatrixToPoint(transformMatrix, { x: 0, y: 0 });
  const max = applyMatrixToPoint(transformMatrix, { x: width, y: height });
  if (max.x < width || max.y < height) {
    return prevTransformMatrix;
  }
  if (min.x > 0 || min.y > 0) {
    return prevTransformMatrix;
  }
  return transformMatrix;
}
```

@param {matrix} transformMatrix
@param {matrix} prevTransformMatrix
@returns {martix} 

<a id="#Zoom__height" name="Zoom__height" href="#Zoom__height">#</a> *Zoom*.**height**&lt;number&gt; `required` 

<a id="#Zoom__scaleXMax" name="Zoom__scaleXMax" href="#Zoom__scaleXMax">#</a> *Zoom*.**scaleXMax**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>Infinity</td></td></table>

<a id="#Zoom__scaleXMin" name="Zoom__scaleXMin" href="#Zoom__scaleXMin">#</a> *Zoom*.**scaleXMin**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Zoom__scaleYMax" name="Zoom__scaleYMax" href="#Zoom__scaleYMax">#</a> *Zoom*.**scaleYMax**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>Infinity</td></td></table>

<a id="#Zoom__scaleYMin" name="Zoom__scaleYMin" href="#Zoom__scaleYMin">#</a> *Zoom*.**scaleYMin**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>0</td></td></table>

<a id="#Zoom__transformMatrix" name="Zoom__transformMatrix" href="#Zoom__transformMatrix">#</a> *Zoom*.**transformMatrix**&lt;shape[object Object]&gt;  <table><tr><td><strong>Default</strong></td><td>{
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0
}</td></td></table>

<a id="#Zoom__wheelDelta" name="Zoom__wheelDelta" href="#Zoom__wheelDelta">#</a> *Zoom*.**wheelDelta**&lt;func&gt; 

```js
 wheelDelta(event.deltaY)
```

A function that returns {scaleX,scaleY} factors to scale the matrix by.
Scale factors greater than 1 will increase (zoom in), less than 1 will descrease (zoom out). <table><tr><td><strong>Default</strong></td><td>event => {
  return -event.deltaY > 0 ? { scaleX: 1.1, scaleY: 1.1 } : { scaleX: 0.9, scaleY: 0.9 };
}</td></td></table>

<a id="#Zoom__width" name="Zoom__width" href="#Zoom__width">#</a> *Zoom*.**width**&lt;number&gt; `required` 
