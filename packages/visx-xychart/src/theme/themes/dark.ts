import { allColors, grayColors } from '../colors';
import buildChartTheme from '../buildChartTheme';

export default buildChartTheme({
  backgroundColor: '#222',
  colors: [
    allColors.cyan[1],
    allColors.blue[2],
    allColors.yellow[2],
    allColors.red[2],
    allColors.violet[2],
    allColors.grape[2],
  ],
  tickLength: 4,
  tickLabelStyles: {
    fill: grayColors[2],
  },
  labelStyles: {
    fill: grayColors[0],
  },
  gridColor: grayColors[4],
  gridColorDark: grayColors[1],
});
