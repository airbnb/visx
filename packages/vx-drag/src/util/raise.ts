/** Given at an array of items, moves the item at the specified index to the end of the array. */
export default function raise(items: unknown[], raiseIndex: number) {
  const array = [...items];
  const lastIndex = array.length - 1;
  const [raiseItem] = array.splice(raiseIndex, 1);
  array.splice(lastIndex, 0, raiseItem);
  return array;
}
