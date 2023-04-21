import { allColors, grayColors } from '../colors';
import buildChartTheme from '../buildChartTheme';
export default buildChartTheme({
  backgroundColor: '#222',
  colors: [allColors.cyan[4], allColors.teal[1], allColors.yellow[2], allColors.red[4], allColors.grape[3], allColors.grape[6], allColors.pink[3]],
  tickLength: 4,
  svgLabelSmall: {
    fill: grayColors[2]
  },
  svgLabelBig: {
    fill: grayColors[0]
  },
  gridColor: grayColors[4],
  gridColorDark: grayColors[1]
});