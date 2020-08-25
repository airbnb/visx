import { defaultColors, grayColors } from '../colors';
import buildChartTheme from '../buildChartTheme';

export default buildChartTheme({
  backgroundColor: '#222',
  colors: defaultColors,
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
