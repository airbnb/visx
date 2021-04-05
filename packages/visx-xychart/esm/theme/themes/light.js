import { defaultColors, grayColors } from '../colors';
import buildChartTheme from '../buildChartTheme';
export default buildChartTheme({
  backgroundColor: '#fff',
  colors: defaultColors,
  tickLength: 4,
  svgLabelSmall: {
    fill: grayColors[7]
  },
  svgLabelBig: {
    fill: grayColors[9]
  },
  gridColor: grayColors[5],
  gridColorDark: grayColors[9]
});