export default ({ source }) => {
  return source.split('\n').reduce((lines, line) => {
    return lines.concat(line.split(' '));
  }, []);
}
