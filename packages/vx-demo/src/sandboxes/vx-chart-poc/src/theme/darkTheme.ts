import { defaultColors, grayColors } from './colors';
import svgFont from './default/svgFont';
import buildChartTheme from './buildChartTheme';

export default buildChartTheme({
  baseColor: '#222',
  colors: defaultColors,
  font: svgFont,
  tickLength: 4,
  labelColor: grayColors[0],
  tickLabelColor: grayColors[2],
  gridColor: grayColors[4],
  gridColorDark: grayColors[1],
});
