export default function toString<T extends { toString(): string }>(x?: T) {
  return x && x.toString();
}
