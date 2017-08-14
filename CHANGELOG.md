# Changelog

- [v0.0.135](#v00135)
- [v0.0.134](#v00134)
- [v0.0.133](#v00133)
- [v0.0.132](#v00132)
- [v0.0.131](#v00131)
- [v0.0.130](#v00130)
- [v0.0.129](#v00129)
- [v0.0.128](#v00128)
- [v0.0.127](#v00127)
- [v0.0.126](#v00126)
- [v0.0.125](#v00125)
- [v0.0.124](#v00124)
- [v0.0.123](#v00123)
- [v0.0.122](#v00122)
- [v0.0.121](#v00121)
- [v0.0.120](#v00120)
- [v0.0.114](#v00114)
- [v0.0.113](#v00113)
- [v0.0.112](#v00112)

------

# v0.0.135

- [geo] add graticule [#111](https://github.com/hshoff/vx/pull/111)
- [network] add @vx/network [#113](https://github.com/hshoff/vx/pull/113)
- [demo] fix invalid JSX [#118](https://github.com/hshoff/vx/pull/118)
- [network][geo][demo] polish for v0.0.135 [#119](https://github.com/hshoff/vx/pull/119)

```bash
Changes:
- @vx/demo: 0.0.134 => 0.0.135
- @vx/geo: 0.0.134 => 0.0.135
- @vx/mock-data: 0.0.127 => 0.0.135
- @vx/network: 0.0.127 => 0.0.135
```

# v0.0.134

- [axis] make ticks more customizable [#109](https://github.com/hshoff/vx/pull/109)
- [tooltip] add `<TooltipWithBounds />` and PropTypes to `@vx/tooltip` exports [#108](https://github.com/hshoff/vx/pull/108)
- [demo] use @vx/geo version in deps [#106](https://github.com/hshoff/vx/pull/106)


```bash
Changes:
- @vx/axis: 0.0.133 => 0.0.134
- @vx/demo: 0.0.133 => 0.0.134
- @vx/tooltip: 0.0.133 => 0.0.134
```


# v0.0.133

- ignore this version, lerna got into a bad state.

```bash
Changes:
- @vx/axis: 0.0.131 => 0.0.133
- @vx/demo: 0.0.132 => 0.0.133
- @vx/tooltip: 0.0.127 => 0.0.133
```

# v0.0.132

- [geo] add package geo [#105](https://github.com/hshoff/vx/pull/105)

```bash
Changes:
- @vx/demo: 0.0.131 => 0.0.132
- @vx/geo: 0.0.132 => 0.0.132
```

# v0.0.131

- [shape] LinePath.defined should default to true [#101](https://github.com/hshoff/vx/pull/101)
- [boxplot] add docs [#102](https://github.com/hshoff/vx/pull/102)
- [shape] add x-value mouseover to area demo [#103](https://github.com/hshoff/vx/pull/103)
- [grid] add styles and restProps support for grid lines [#103](https://github.com/hshoff/vx/pull/103)

```bash
Changes:
- @vx/annotation: 0.0.130 => 0.0.131
- @vx/axis: 0.0.130 => 0.0.131
- @vx/boxplot: 0.0.127 => 0.0.131
- @vx/demo: 0.0.130 => 0.0.131
- @vx/grid: 0.0.130 => 0.0.131
- @vx/marker: 0.0.130 => 0.0.131
- @vx/shape: 0.0.130 => 0.0.131
```

# v0.0.130

- [shape] Add tests for Arc, AreaClosed, & Line, fix AreaClosed error [#95](https://github.com/hshoff/vx/pull/95)
- [Axis] Add tests to Axis.test.js [#94](https://github.com/hshoff/vx/pull/94)

```bash
Changes:
- @vx/annotation: 0.0.127 => 0.0.130
- @vx/axis: 0.0.127 => 0.0.130
- @vx/demo: 0.0.129 => 0.0.130
- @vx/grid: 0.0.127 => 0.0.130
- @vx/marker: 0.0.127 => 0.0.130
- @vx/shape: 0.0.127 => 0.0.130
```

# v0.0.129

- [gradient] add <RadialGradient /> [#90](https://github.com/hshoff/vx/pull/90)
- [bounds] add `@vx/bounds` package with `withBoundingRects()` HOC  [#91](https://github.com/hshoff/vx/pull/91)

```bash
Changes:
- @vx/bounds: 0.0.128 => 0.0.129
- @vx/demo: 0.0.128 => 0.0.129
- @vx/gradient: 0.0.128 => 0.0.129
```

# v0.0.128

- ignore this one, `lerna publish` failed midway through

```bash
Changes:
- @vx/bounds: 0.0.0 => 0.0.128
- @vx/demo: 0.0.127 => 0.0.128
- @vx/gradient: 0.0.127 => 0.0.128
```

# v0.0.127

- [boxplot] add `@vx/boxplot` [#89](https://github.com/hshoff/vx/pull/89)
- [mock data] add `genBoxPlot()` [#89](https://github.com/hshoff/vx/pull/89)
- [tooltip] fix pass through style and restProps [#89](https://github.com/hshoff/vx/pull/89)
- [shape] fix BarStack.test.js [#88](https://github.com/hshoff/vx/pull/88)

```bash
Changes:
- @vx/annotation: 0.0.126 => 0.0.127
- @vx/axis: 0.0.126 => 0.0.127
- @vx/boxplot: 1.0.0 => 0.0.127
- @vx/brush: 0.0.126 => 0.0.127
- @vx/clip-path: 0.0.126 => 0.0.127
- @vx/curve: 0.0.126 => 0.0.127
- @vx/demo: 0.0.126 => 0.0.127
- @vx/drag: 0.0.126 => 0.0.127
- @vx/event: 0.0.126 => 0.0.127
- @vx/glyph: 0.0.126 => 0.0.127
- @vx/gradient: 0.0.126 => 0.0.127
- @vx/grid: 0.0.126 => 0.0.127
- @vx/group: 0.0.126 => 0.0.127
- @vx/heatmap: 0.0.126 => 0.0.127
- @vx/hierarchy: 0.0.126 => 0.0.127
- @vx/legend: 0.0.126 => 0.0.127
- @vx/marker: 0.0.126 => 0.0.127
- @vx/mock-data: 0.0.126 => 0.0.127
- @vx/pattern: 0.0.126 => 0.0.127
- @vx/point: 0.0.126 => 0.0.127
- @vx/responsive: 0.0.126 => 0.0.127
- @vx/scale: 0.0.126 => 0.0.127
- @vx/shape: 0.0.126 => 0.0.127
- @vx/text: 0.0.126 => 0.0.127
- @vx/tooltip: 0.0.126 => 0.0.127
- @vx/voronoi: 0.0.126 => 0.0.127
- @vx/zoom: 0.0.126 => 0.0.127
```

# v0.0.126

- [tooltip] add @vx/tooltip [#87](https://github.com/hshoff/vx/pull/87)
- [glyph] put classname on the <path> not on <g> [#87](https://github.com/hshoff/vx/pull/87)
- [mock data] add mock/bitcoinPrice [#87](https://github.com/hshoff/vx/pull/87)
- [demo] add tooltip demo to dots and barstack, add legend to barstack [#87](https://github.com/hshoff/vx/pull/87)
- [shape] update `data` passed to each bar in <BarStack /> [#87](https://github.com/hshoff/vx/pull/87)

# v0.0.125

- ignore this one, `lerna publish` failed midway through

# v0.0.124

- [glyph] add remaining d3 symbols [#84](https://github.com/hshoff/vx/pull/84) + [#81](https://github.com/hshoff/vx/pull/81)
- [gradient] add horizontal linear gradients, make more flexible [#82](https://github.com/hshoff/vx/pull/82)
- [axis] export orientation constants [#80](https://github.com/hshoff/vx/pull/80)
- [legend] fix proptypes check on shape prop [#82](https://github.com/hshoff/vx/pull/82)

```bash
Changes:
- @vx/axis: 0.0.120 => 0.0.124
- @vx/demo: 0.0.123 => 0.0.124
- @vx/glyph: 0.0.121 => 0.0.124
- @vx/gradient: 0.0.120 => 0.0.124
- @vx/legend: 0.0.121 => 0.0.124
```

# v0.0.123

- add `@vx/voronoi` [#78](https://github.com/hshoff/vx/pull/78)

```bash
Changes:
- @vx/demo: 0.0.122 => 0.0.123
- @vx/voronoi: 1.0.0 => 0.0.123
```

# v0.0.122

- ignore this one, I ran `lerna publish --exact` before `lerna bootstrap` and it failed to publish, but managed to increment versions and couldn't figure how to "undo" it so rolling foward to v0.0.123

```bash
Changes:
- @vx/demo: 0.0.122 => 0.0.122
- @vx/voronoi: 0.0.0 => 0.0.122
```

# v0.0.121

- add `@vx/legend` [#77](https://github.com/hshoff/vx/pull/77)
- add `scaleQuantize`, `scaleQuantile`, `scaleThreshold`
- added `GlyphCross` but it's not working yet

```bash
Changes:
- @vx/demo: 0.0.120 => 0.0.121
- @vx/glyph: 0.0.120 => 0.0.121
- @vx/legend: 1.0.0 => 0.0.121
- @vx/scale: 0.0.117 => 0.0.121
```

# v0.0.120

- moved `react` to peerDep & devDep [#75](https://github.com/hshoff/vx/pull/75)
- add missing `restProps` + `additionalProps` to shape & glyph [#76](https://github.com/hshoff/vx/pull/76)
- set AreaClosed `y0` to the range's start not `0` [#45](https://github.com/hshoff/vx/pull/74)
- add strokeDashoffset prop to LinePath [#70](https://github.com/hshoff/vx/pull/70)
- replace lodash per-method packages with scoped imports [#66](https://github.com/hshoff/vx/pull/66)
- add tests for pattern circles [#63](https://github.com/hshoff/vx/pull/63)
- add @vx/clip-path [#61](https://github.com/hshoff/vx/pull/61)
- fix axis label transform [#59](https://github.com/hshoff/vx/pull/59)

```bash
Changes:
- @vx/annotation: 0.0.119 => 0.0.120
- @vx/axis: 0.0.119 => 0.0.120
- @vx/brush: 0.0.114 => 0.0.120
- @vx/clip-path: 0.0.0 => 0.0.120
- @vx/demo: 0.0.119 => 0.0.120
- @vx/drag: 0.0.114 => 0.0.120
- @vx/glyph: 0.0.114 => 0.0.120
- @vx/gradient: 0.0.112 => 0.0.120
- @vx/grid: 0.0.119 => 0.0.120
- @vx/group: 0.0.114 => 0.0.120
- @vx/heatmap: 0.0.116 => 0.0.120
- @vx/hierarchy: 0.0.119 => 0.0.120
- @vx/marker: 0.0.119 => 0.0.120
- @vx/pattern: 0.0.112 => 0.0.120
- @vx/responsive: 0.0.115 => 0.0.120
- @vx/shape: 0.0.119 => 0.0.120
- @vx/text: 0.0.114 => 0.0.120
```


# v0.0.114

### @vx/shape

  - added `<BarGroup />` & `<BarStack />` [#39](https://github.com/hshoff/vx/pull/39)
  
### general

  - added jest + enzyme tests & travis + coveralls ci

# v0.0.113

### @vx/axis

  - axis labels and tickLabels are now passed in as components [#31](https://github.com/hshoff/vx/pull/31) &bull; [example diff](https://github.com/hshoff/vx/pull/31/files#diff-427e08aaa7d707f2374af36902ff0e15)
  
### @vx/group

  - added `transform` prop [#31](https://github.com/hshoff/vx/pull/31)

# v0.0.112

### @vx/curve, @vx/point, @vx/mock-data, @vx/annotation, @vx/group, @vx/pattern, @vx/gradient, @vx/glyph

  - added tests with jest + enzyme [#30](https://github.com/hshoff/vx/pull/30)

### @vx/annotation, @vx/pattern

  - added prop-types [#30](https://github.com/hshoff/vx/pull/30)
