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
  - [Mercator](#mercator-)
  - [NaturalEarth](#naturalearth-)
  - [Orthographic](#orthographic-)
  - [Projection](#projection-)

## API



### &lt;Graticule /&gt;


<a name="Graticule__children" href="#Graticule__children">#</a> *Graticule*.**children**&lt;func&gt;  

<a name="Graticule__graticule" href="#Graticule__graticule">#</a> *Graticule*.**graticule**&lt;func&gt;  

<a name="Graticule__lines" href="#Graticule__lines">#</a> *Graticule*.**lines**&lt;func&gt;  

<a name="Graticule__outline" href="#Graticule__outline">#</a> *Graticule*.**outline**&lt;func&gt;  

### &lt;Albers /&gt;
All props pass through to `<Projection projection="albers" {...props} />`


### &lt;Mercator /&gt;
All props pass through to `<Projection projection="mercator" {...props} />`


### &lt;NaturalEarth /&gt;
All props pass through to `<Projection projection="naturalEarth" {...props} />`


### &lt;Orthographic /&gt;
All props pass through to `<Projection projection="orthographic" {...props} />`


### &lt;Projection /&gt;
Component for all projections.

<a name="Projection__center" href="#Projection__center">#</a> *Projection*.**center**&lt;array&gt;  

<a name="Projection__centroid" href="#Projection__centroid">#</a> *Projection*.**centroid**&lt;func&gt;  

<a name="Projection__children" href="#Projection__children">#</a> *Projection*.**children**&lt;func&gt;  

<a name="Projection__className" href="#Projection__className">#</a> *Projection*.**className**&lt;string&gt;  

<a name="Projection__clipAngle" href="#Projection__clipAngle">#</a> *Projection*.**clipAngle**&lt;number&gt;  

<a name="Projection__clipExtent" href="#Projection__clipExtent">#</a> *Projection*.**clipExtent**&lt;array&gt;  

<a name="Projection__data" href="#Projection__data">#</a> *Projection*.**data**&lt;array&gt; `required` 

<a name="Projection__fitExtent" href="#Projection__fitExtent">#</a> *Projection*.**fitExtent**&lt;array&gt;  

<a name="Projection__fitSize" href="#Projection__fitSize">#</a> *Projection*.**fitSize**&lt;array&gt;  

<a name="Projection__precision" href="#Projection__precision">#</a> *Projection*.**precision**&lt;number&gt;  

<a name="Projection__projection" href="#Projection__projection">#</a> *Projection*.**projection**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'mercator'</td></td></table>

<a name="Projection__projectionFunc" href="#Projection__projectionFunc">#</a> *Projection*.**projectionFunc**&lt;func&gt;  

<a name="Projection__rotate" href="#Projection__rotate">#</a> *Projection*.**rotate**&lt;array&gt;  

<a name="Projection__scale" href="#Projection__scale">#</a> *Projection*.**scale**&lt;number&gt;  

<a name="Projection__translate" href="#Projection__translate">#</a> *Projection*.**translate**&lt;array&gt;  
