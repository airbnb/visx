export default function raise(items, raiseIndex) {
  const array = items.slice();
  const lastIndex = array.length - 1;
  const raiseItem = array.splice(raiseIndex, 1)[0];
  array.splice(lastIndex, 0, raiseItem);
  return array;
}
