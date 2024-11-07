# @visx/sankey

<a title="@visx/sankey npm downloads" href="https://www.npmjs.com/package/@visx/sankey">
  <img src="https://img.shields.io/npm/dm/@visx/sankey.svg?style=flat-square" />
</a>

Sankey diagrams visualize the directed flow between nodes in an acyclic network. This package
contains `react` components for visualizing sankey diagrams and largely mirrors
[`d3-sankey`](https://github.com/d3/d3-sankey).

Many components take the same input `sankey` data as defined in as specified in the
[`d3-sankey`](https://github.com/d3/d3-sankey) module to output a graph of the sankey layout. For
convenience, this package also exports the [`d3-sankey`](https://github.com/d3/d3-sankey)utility to
generate this format.

## Installation

```
npm install --save @visx/sankey
```

## Usage

The `@visx/sankey` package exports a wrapped version of `d3-sankey` for flexible usage, as well as a
`<Sankey />` component for rendering the sankey layout.

```js
// equivalent to `import { sankey } from 'd3-sankey';`
import { sankey } from '@visx/sankey';

const generator = sankey();
const graph = generator({
  nodes: [{ name: 'node 1' }, { name: 'node 2' }, { name: 'node 3' }],
  links: [
    { source: 0, target: 1, value: 10 },
    { source: 1, target: 2, value: 5 },
  ],
});
```

```js
import { Sankey, sankeyCenter } from '@visx/sankey';

const nodes = [{ name: 'node 1' }, { name: 'node 2' }, { name: 'node 3' }];
const links = [
  { source: 0, target: 1, value: 10 },
  { source: 1, target: 2, value: 5 },
];
const data = { nodes, links };

return (
  <svg>
    <Sankey root={data} nodeAlign={sankeyCenter} size={[100, 100]} />
  </svg>
);
```

The layout output can also be customized by providing a children function to the `<Sankey />`
component.

```js
import { Sankey, sankeyCenter } from '@visx/sankey';
import { Group } from '@visx/group';
import { BarRounded, LinkHorizontal } from '@visx/group';

const nodes = [{ name: 'node 1' }, { name: 'node 2' }, { name: 'node 3' }];
const links = [
  { source: 0, target: 1, value: 10 },
  { source: 1, target: 2, value: 5 },
];
const data = { nodes, links };

return (
  <svg>
    <Sankey root={data} nodeAlign={sankeyCenter} size={[100, 100]}>
      {({ graph, createPath }) => (
        <>
          <Group>
            {graph.links.map((link, i) => (
              <LinkHorizontal
                key={i}
                data={link}
                path={createPath}
                fill="transparent"
                stroke="#f50057"
                strokeWidth={link.width}
                strokeOpacity={0.5}
              />
            ))}
          </Group>
          <Group>
            {graph.nodes.map(({ y0, y1, x0, x1, name }, i) => (
              <BarRounded
                key={i}
                width={x1 - x0}
                height={y1 - y0}
                x={x0}
                y={y0}
                radius={3}
                fill="#f50057"
                all
              />
            ))}
          </Group>
        </>
      )}
    </Sankey>
  </svg>
);
```
