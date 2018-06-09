# @vx/geo

```
npm install --save @vx/geo
```

Draw GeoJSON/TopoJSON features with different projections using d3-geo and react to render it.

## `<Mercator />`
The spherical Mercator projection. Many online street mapping services use a variant of the spherical Mercator projection (OpenStreetMap, Bing Maps, Google Maps, ...).

### Example

<img width="500" src="https://user-images.githubusercontent.com/3831579/28503643-0fb53628-700b-11e7-824c-293f5df0caf5.png" alt="vx-geo-mercator">

```js
<Mercator
  data={myData}
  scale={myScale}
  translate={[width / 2, height / 2]}
  fill={(feature) => '#aaaaaa'}
  onClick={data => event => {
    alert(`Clicked!`);
  }}
/>
```

### Properties

|      Name       |       Default       |   Type   |                                                 Description                                                 |
|:--------------- |:------------------- |:-------- |:----------------------------------------------------------------------------------------------------------- |
| data            |                     | object   | GeoJSON/TopoJSON features.                                                                                  |
| projectionFunc  |                     | function | Returns projection function.                                                                                |
| clipAngle       |                     | number   | Sets the projection’s clipping circle radius.                                                               |
| clipExtent      |                     | array    | Sets the projection’s viewport clip extent.                                                                 |
| scale           |                     | number   | Sets the projection’s scale.                                                                                |
| translate       | [480, 250]          | array    | Sets the projection’s translation offset.                                                                   |
| center          | [0, 0]              | array    | Sets the projection’s center.                                                                               |
| rotate          |                     | array    | Sets the projection’s three-axis rotation.                                                                  |
| precision       |                     | number   | Sets the threshold for the projection’s adaptive resampling.                                                |
| fitExtent       |                     | array    | Sets the projection’s scale and translate. [extend, object]                                                 |
| fitSize         |                     | array    | A convenience method for fitExtent. [size, object]                                                          |
| centroid        |                     | function | Get centroid of path.                                                                                       |
| className       | `vx-mercator`       | string   | The class name for the `path` element.                                                                      |


## `<Orthographic />`

The orthographic projection.

### Example

<img width="200" src="https://user-images.githubusercontent.com/3831579/28503686-bfb776f8-700b-11e7-942d-8c3124f1f618.png" alt="vx-geo-mercator">

```js
<Orthographic
  data={myData}
  scale={myScale}
  translate={[width / 2, height / 2]}
  fill={(feature) => '#aaaaaa'}
  onClick={data => event => {
    alert(`Clicked!`);
  }}
/>
```

### Properties
Same properties as Mercator.

|      Name       |       Default       |   Type   |                                                 Description                                                 |
|:--------------- |:------------------- |:-------- |:----------------------------------------------------------------------------------------------------------- |
| className       | `vx-orthographic`   | string   | The class name for the `path` element.                                                                      |

## `<Albers />`

The albers projection.

### Example

<img width="250" src="https://user-images.githubusercontent.com/3831579/28503693-d27ed9fc-700b-11e7-9e0a-e6b54a4a9b83.png" alt="vx-geo-mercator">

```js
<Albers
  data={myData}
  scale={myScale}
  translate={[width / 2, height / 2]}
  fill={(feature) => '#aaaaaa'}
  onClick={data => event => {
    alert(`Clicked!`);
  }}
/>
```

### Properties
Same properties as Mercator.

|      Name       |       Default       |   Type   |                                                 Description                                                 |
|:--------------- |:------------------- |:-------- |:----------------------------------------------------------------------------------------------------------- |
| className       | `vx-albers`         | string   | The class name for the `path` element.                                                                      |

## `<NaturalEarth />`

The Natural Earth projection.

### Example

```js
<NaturalEarth
  data={myData}
  scale={myScale}
  translate={[width / 2, height / 2]}
  fill={(feature) => '#aaaaaa'}
  onClick={data => event => {
    alert(`Clicked!`);
  }}
/>
```

### Properties
Same properties as Mercator.

|      Name       |       Default                 |   Type   |                                                 Description                                                 |
|:--------------- |:----------------------------- |:-------- |:----------------------------------------------------------------------------------------------------------- |
| className       | `vx-geo-naturalEarth`         | string   | The class name for the `path` element. 
