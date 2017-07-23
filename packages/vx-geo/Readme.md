# @vx/geo

```
npm install --save @vx/geo
```

Draw GeoJSON/TopoJSON features with different projections using d3-geo and react to render it.

## `<Mercator />`

The spherical Mercator projection. Many online street mapping services use a variant of the spherical Mercator projection (OpenStreetMap, Bing Maps, Google Maps, ...).

### Example

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