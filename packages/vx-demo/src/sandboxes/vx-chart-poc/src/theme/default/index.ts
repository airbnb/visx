import { defaultColors, grayColors } from '../colors';
import svgFont from './svgFont';
import buildChartTheme from '../buildChartTheme';

export default buildChartTheme({
  baseColor: '#fff',
  colors: defaultColors,
  font: svgFont,
  tickLength: 4,
  labelColor: grayColors[9],
  tickLabelColor: grayColors[7],
  gridColor: grayColors[5],
  gridColorDark: grayColors[9],
});
