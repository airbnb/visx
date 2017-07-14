const defaultCount = (i, n) => Math.random() * (25 * (n - i));

const defaultBin = (i, n) => i * 150;

export default function genBin(n,
  bin = defaultBin,
  count = defaultCount,
) {
  return Array(n).fill(1).reduce((data, d, i) => data.concat([{
    bin: bin(i, n),
    count: count(i, n),
  }]), []);
}
