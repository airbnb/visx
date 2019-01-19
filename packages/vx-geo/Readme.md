# @vx/geo

<a title="@vx/geo npm downloads" href="https://www.npmjs.com/package/@vx/geo">
  <img src="https://img.shields.io/npm/dm/@vx/geo.svg?style=flat-square" />
</a>


## Installation

```
npm install --save @vx/geo
```


## Components



  - [Graticule](#graticule-)
  - [Albers](#albers-)
  - [AlbersUsa](#albersusa-)
  - [EqualEarth](#equalearth-)
  - [Mercator](#mercator-)
  - [NaturalEarth](#naturalearth-)
  - [Orthographic](#orthographic-)
  - [Projection](#projection-)

## API



<h3 id="graticule-">&lt;Graticule /&gt;</h3>



<a id="#Graticule__children" name="Graticule__children" href="#Graticule__children">#</a> *Graticule*.**children**&lt;func&gt;  

<a id="#Graticule__graticule" name="Graticule__graticule" href="#Graticule__graticule">#</a> *Graticule*.**graticule**&lt;func&gt;  

<a id="#Graticule__lines" name="Graticule__lines" href="#Graticule__lines">#</a> *Graticule*.**lines**&lt;func&gt;  

<a id="#Graticule__outline" name="Graticule__outline" href="#Graticule__outline">#</a> *Graticule*.**outline**&lt;func&gt;  

<h3 id="albers-">&lt;Albers /&gt;</h3>

All props pass through to `<Projection projection="albers" {...props} />`


<h3 id="albersusa-">&lt;AlbersUsa /&gt;</h3>

All props pass through to `<Projection projection="albersUsa" {...props} />`


<h3 id="equalearth-">&lt;EqualEarth /&gt;</h3>

All props pass through to `<Projection projection="equalEarth" {...props} />`


<h3 id="mercator-">&lt;Mercator /&gt;</h3>

All props pass through to `<Projection projection="mercator" {...props} />`


<h3 id="naturalearth-">&lt;NaturalEarth /&gt;</h3>

All props pass through to `<Projection projection="naturalEarth" {...props} />`


<h3 id="orthographic-">&lt;Orthographic /&gt;</h3>

All props pass through to `<Projection projection="orthographic" {...props} />`


<h3 id="projection-">&lt;Projection /&gt;</h3>

Component for all projections.

<a id="#Projection__center" name="Projection__center" href="#Projection__center">#</a> *Projection*.**center**&lt;array&gt;  

<a id="#Projection__centroid" name="Projection__centroid" href="#Projection__centroid">#</a> *Projection*.**centroid**&lt;func&gt;  

<a id="#Projection__children" name="Projection__children" href="#Projection__children">#</a> *Projection*.**children**&lt;func&gt;  

<a id="#Projection__className" name="Projection__className" href="#Projection__className">#</a> *Projection*.**className**&lt;string&gt;  

<a id="#Projection__clipAngle" name="Projection__clipAngle" href="#Projection__clipAngle">#</a> *Projection*.**clipAngle**&lt;number&gt;  

<a id="#Projection__clipExtent" name="Projection__clipExtent" href="#Projection__clipExtent">#</a> *Projection*.**clipExtent**&lt;array&gt;  

<a id="#Projection__data" name="Projection__data" href="#Projection__data">#</a> *Projection*.**data**&lt;array&gt; `required` 

<a id="#Projection__fitExtent" name="Projection__fitExtent" href="#Projection__fitExtent">#</a> *Projection*.**fitExtent**&lt;array&gt;  

<a id="#Projection__fitSize" name="Projection__fitSize" href="#Projection__fitSize">#</a> *Projection*.**fitSize**&lt;array&gt;  

<a id="#Projection__precision" name="Projection__precision" href="#Projection__precision">#</a> *Projection*.**precision**&lt;number&gt;  

<a id="#Projection__projection" name="Projection__projection" href="#Projection__projection">#</a> *Projection*.**projection**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'mercator'</td></td></table>

<a id="#Projection__projectionFunc" name="Projection__projectionFunc" href="#Projection__projectionFunc">#</a> *Projection*.**projectionFunc**&lt;func&gt;  

<a id="#Projection__rotate" name="Projection__rotate" href="#Projection__rotate">#</a> *Projection*.**rotate**&lt;array&gt;  

<a id="#Projection__scale" name="Projection__scale" href="#Projection__scale">#</a> *Projection*.**scale**&lt;number&gt;  

<a id="#Projection__translate" name="Projection__translate" href="#Projection__translate">#</a> *Projection*.**translate**&lt;array&gt;  
