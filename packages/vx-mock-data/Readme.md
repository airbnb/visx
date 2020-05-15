# @vx/mock-data

<a title="@vx/mock-data npm downloads" href="https://www.npmjs.com/package/@vx/mock-data">
  <img src="https://img.shields.io/npm/dm/@vx/mock-data.svg?style=flat-square" />
</a>

The `@vx/mock-data` package is here to help you test out your graphs.

## Installation

```
npm install --save @vx/mock-data
```

## Generators

Generators can create simple generic data for you like this:

```js
import Mock from '@vx/mock-data';
const points = Mock.genRandomNormalPoints();
```

### `Mock.genRandomNormalPoints()`

Returns a series of random normal x,y points.

### `Mock.getDateValue(n)`

Generates `n` date values an hour apart from each other starting with the current time.

## Mocks

Mock are essentially a bunch of data dumps that you can use like this:

```js
import Mock from '@vx/mock-data';
const data = Mock.cityTemperature;
```

### `Mock.appleStock`

| Property | type     |
| -------- | -------- |
| date     | `string` |
| close    | `number` |

### `Mock.browserUsage`

| Property          | type     |
| ----------------- | -------- |
| date              | `string` |
| Google Chrome     | `string` |
| Internet Explorer | `string` |
| Firefox           | `string` |
| Safari            | `string` |
| Microsoft Edge    | `string` |
| Opera             | `string` |
| Mozilla           | `string` |
| Other/Unknown     | `string` |

### `Mock.cityTemperature`

| Property      | type     |
| ------------- | -------- |
| date          | `string` |
| New York      | `string` |
| San Francisco | `string` |
| Austin        | `string` |

### `Mock.groupDateValue`

| Property | type     |
| -------- | -------- |
| date     | `string` |
| key      | `string` |
| value    | `string` |

### `Mock.letterFrequency`

| Property  | type     |
| --------- | -------- |
| letter    | `string` |
| frequency | `number` |

## Source For Components

### `generators/`

- [genDateValue()](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/generators/genDateValue.ts)
- [genRandomNormalPoints()](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/generators/genRandomNormalPoints.ts)

### `mocks/`

- [appleStock](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/appleStock.ts)
- [browserUsage](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/browserUsage.ts)
- [cityTemperature](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/cityTemperature.ts)
- [groupDateValue](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/groupDateValue.ts)
- [letterFrequency](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/letterFrequency.ts)
