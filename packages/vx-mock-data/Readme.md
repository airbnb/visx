# @vx/mock-data

```
npm install --save @vx/mock-data
```

The `@vx/mock-data` package is here to help you test out your graphs.

## Generators

Generators can create simple generic data for you like this:

``` js
import Mock from '@vx/mock-data';
const points = Mock.genRandomNormalPoints();
```

### `Mock.genRandomNormalPoints()`

Returns a series of random normal x,y points.  

### `Mock.getDateValue(n)`

Generates `n` date values an hour apart from each other starting with the current time. 

## Mocks

Mock are essentially a bunch of data dumps that you can use like this:

``` js
import Mock from '@vx/mock-data';
const data = Mock.cityTemperature;
```

### `Mock.appleStock`

| Property |
| -------- |
| date     |
| close    |


### `Mock.browserUsage`

|     Property      |
| ----------------- |
| date              |
| Google Chrome     |
| Internet Explorer |
| Firefox           |
| Safari            |
| Microsoft Edge    |
| Opera             |
| Mozilla           |
| Other/Unknown     |

### `Mock.cityTemperature`

|   Property    |
| ------------- |
| date          |
| New York      |
| San Francisco |
| Austin        |

### `Mock.groupDateValue`

| Property |
| -------- |
| date     |
| key      |
| value    |

### `Mock.letterFrequency`

| Property  |
| --------- |
| letter    |
| frequency |

## Source For Components
+ generators/
  - [genDateValue()](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/generators/genDateValue.js)
  - [genRandomNormalPoints()](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/generators/genRandomNormalPoints.js)
+ mocks/
  - [appleStock](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/appleStock.js)
  - [browserUsage](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/browserUsage.js)
  - [cityTemperature](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/cityTemperature.js)
  - [groupDateValue](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/groupDateValue.js)
  - [letterFrequency](https://github.com/hshoff/vx/blob/master/packages/vx-mock-data/src/mocks/letterFrequency.js)
