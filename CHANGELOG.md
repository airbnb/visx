# Changelog

- [v0.0.121](#v00121)
- [v0.0.120](#v00120)
- [v0.0.114](#v00114)
- [v0.0.113](#v00113)
- [v0.0.112](#v00112)

------

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
