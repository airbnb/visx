# @visx/mock-data

<a title="@visx/mock-data npm downloads" href="https://www.npmjs.com/package/@visx/mock-data">
  <img src="https://img.shields.io/npm/dm/@visx/mock-data.svg?style=flat-square" />
</a>

The `@visx/mock-data` package is here to help you test out your graphs.

## Installation

```
npm install --save @visx/mock-data
```

## Generators

Generators can create simple generic data for you like this:

```js
import Mock from '@visx/mock-data';
const points = Mock.genRandomNormalPoints();
```

### `Mock.genRandomNormalPoints()`

Returns a series of random normal x,y points.

### `Mock.getDateValue(n)`

Generates `n` date values an hour apart from each other starting with the current time.

## Mocks

Mock are essentially a bunch of data dumps that you can use like this:

```js
import Mock from '@visx/mock-data';
// or import { cityTemperature } from '@visx/mock-data';
const data = Mock.cityTemperature;
```

### `Mock.appleStock`

```js
interface AppleStock {
  date: string;
  close: number;
}

const appleStock: AppleStock[] = [
  { date: '2007-04-24T07:00:00.000Z', close: 93.24 },
  ...
];
```

### `Mock.bitcoinPrice`

```js
interface BitcoinPrices {
  currency: string;
  prices: BitcoinPrice[];
}

const bitcoinPrice: BitcoinPrices = {
  currency: 'USD',
  prices: [
    { price: '2486.69', time: '2017-07-03T00:00:00Z' },
    ...
  ]
};
```

### `Mock.browserUsage`

```js
const browserUsage: BrowserUsage[] = [
  {
    date: '2015 Jun 15',
    'Google Chrome': '48.09',
    'Internet Explorer': '24.14',
    Firefox: '18.82',
    Safari: '7.46',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01',
  },
  ...
];
```

### `Mock.cityTemperature`

```ts
interface CityTemperature {
  date: string;
  'New York': string;
  'San Francisco': string;
  Austin: string;
}

const cityTemperature: CityTemperature[] = [
  {
    date: '20111001',
    'New York': '63.4',
    'San Francisco': '62.7',
    Austin: '72.2',
  },
  ...
];
```

### `Mock.exoplanets`

```ts
interface Exoplanets {
  name: string;
  radius: number;
  distance: number | null;
}

const exoplanets: Exoplanets[] = [
  {
    name: 'Jupiter',
    radius: 10.97,
    distance: 0,
  },
  ...
];
```

### `Mock.groupDateValue`

```ts
interface GroupDateValue {
  key: string;
  value: string;
  date: string;
}

const groupDateValue: GroupDateValue[] = [
  { key: 'Group1', value: '37', date: '04/23/12' },
  ...
];
```

### `Mock.lesMiserables`

```ts
interface LesMiserablesNode {
  id: string;
  group: number;
}

interface LesMiserablesLink {
  source: string;
  target: string;
  value: number;
}

interface LesMiserables {
  nodes: LesMiserablesNode[];
  links: LesMiserablesLink[];
}

const lesMiserables: LesMiserables = {
  nodes: [
    { id: 'Myriel', group: 1 },
    ...
  ],
  links: [
    { source: 'Napoleon', target: 'Myriel', value: 1 },
    ...
  ],
};
```

### `Mock.letterFrequency`

```ts
interface LetterFrequency {
  letter: string;
  frequency: number;
}

const letterFrequency: LetterFrequency[] = [
  { letter: 'A', frequency: 0.08167 },
  ...
];
```

### `Mock.shakespeare`

```ts
interface Shakespeare {
  id: string;
  parent: string | null;
  size: number | null;
}

const shakespeare: Shakespeare[] = [
  {
    id: 'Shakespeare',
    parent: null,
    size: 0,
  },
  ...
];
```

## Source For Components

### `generators/`

- [genDateValue()](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/generators/genDateValue.ts)
- [genRandomNormalPoints()](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/generators/genRandomNormalPoints.ts)

### `mocks/`

- [appleStock](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/mocks/appleStock.ts)
- [browserUsage](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/mocks/browserUsage.ts)
- [cityTemperature](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/mocks/cityTemperature.ts)
- [groupDateValue](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/mocks/groupDateValue.ts)
- [letterFrequency](https://github.com/airbnb/visx/blob/master/packages/visx-mock-data/src/mocks/letterFrequency.ts)
