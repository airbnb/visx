# @visx/react-spring

<a title="@visx/react-spring npm downloads" href="https://www.npmjs.com/package/@visx/react-spring">
  <img src="https://img.shields.io/npm/dm/@visx/react-spring.svg?style=flat-square" />
</a>

Although `visx` is largely unopinioned on animation, there is value in abstracting the complexity +
boilerplate of building **animated** `visx` visualization components. This package requires
`react-spring` as a `peerDependency` (to be compatible with any usage within your app) and exports
all `visx` components that depend on `react-spring`.

[`react-spring`](https://www.react-spring.io/) provides performant primitives for animating react
components and is our recommended library for making animated charts. In order to minimize
`react-spring` as a dependency across other `visx` packages, we've consolidated components which
depend on it here.

## Installation

```
npm install --save react-spring @visx/react-spring
```
