# @vx/react-spring

<a title="@vx/react-spring npm downloads" href="https://www.npmjs.com/package/@vx/react-spring">
  <img src="https://img.shields.io/npm/dm/@vx/react-spring.svg?style=flat-square" />
</a>

Although `vx` is largely unopinioned on animation, there is value in abstracting the complexity +
boilerplate of building **animated** `vx` visualization components. This package requires
`react-spring` as a `peerDependency` (to be compatible with any usage within your app) and exports
all `vx` components that depend on `react-spring`.

[`react-spring`](https://www.react-spring.io/) provides performant primitives for animating react
components and is our recommended library for making animated charts. In order to minimize
`react-spring` as a dependency across other `vx` packages, we've consolidated components which
depend on it here.

## Installation

```
npm install --save react-spring @vx/react-spring
```
