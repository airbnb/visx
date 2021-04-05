var defaultCount = function defaultCount(idx, number) {
  return Math.random() * (25 * (number - idx));
};

var defaultBin = function defaultBin(idx, length) {
  return idx * 150;
};

export default function genBin(length, bin, count) {
  if (bin === void 0) {
    bin = defaultBin;
  }

  if (count === void 0) {
    count = defaultCount;
  }

  return new Array(length).fill(1).reduce(function (data, d, i) {
    return data.concat([{
      bin: bin(i, length),
      count: count(i, length)
    }]);
  }, []);
}