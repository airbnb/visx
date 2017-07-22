# @vx/geo

In progress...

Draw GeoJSON/TopoJSON features with different projections using d3-geo and react to render it.

## `<Mercator />`

The spherical Mercator projection. Many online street mapping services use a variant of the spherical Mercator projection (OpenStreetMap, Bing Maps, Google Maps, ...).

### Example

```js
<Mercator
  // TODO: Insert example here.
/>
```

### Properties

|      Name       |       Default       |   Type   |                                                 Description                                                 |
|:--------------- |:------------------- |:-------- |:----------------------------------------------------------------------------------------------------------- |
| data            |                     | object   | GeoJSON/TopoJSON features.                                                                                  |
| projectionFunc  |                     | function |                                                                                                             |
| clipAngle       |                     | number   |                                                                                                             |
| clipExtent      |                     | array    |                                                                                                             |
| scale           |                     | number   |                                                                                                             |
| translate       |                     | array    |                                                                                                             |
| center          | [0, 0]              | array    |                                                                                                             |
| rotate          |                     | array    |                                                                                                             |
| precision       |                     | number   |                                                                                                             |
| fitExtent       |                     | array    |                                                                                                             |
| fitSize         |                     | array    |                                                                                                             |
| centroid        |                     | function |                                                                                                             |
| className       | `vx-mercator`       | string   | The class name for the `path` element.                                                                      |