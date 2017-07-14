export default ({ source }) => source.split('\n').reduce((lines, line) => lines.concat(line.split(' ')), []);
