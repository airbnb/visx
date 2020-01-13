const colors = ['#458aea', '#f7a055', '#9b3655', 'red', 'yellow', '#3f56d1', '#4fd5ef', '#2fd371'];
const numColors = colors.length;

export default (i: number) => {
  return colors[i % numColors] || colors[0];
};
