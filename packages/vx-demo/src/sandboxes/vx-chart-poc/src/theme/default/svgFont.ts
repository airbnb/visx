import { textColor } from '../colors';
import { TextStyles } from '../../types/theme';

const getSvgFont = ({
  fontFamily,
  fontSize,
  letterSpacing,
}: {
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
}): TextStyles => ({
  fill: textColor,
  stroke: 'none',
  fontFamily,
  fontSize,
  letterSpacing,
  textAnchor: 'inherit',
});

const fontFamily = '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif';

export default {
  fontFamily,

  weights: {
    light: 200,
    bold: 700,
  },

  small: {
    ...getSvgFont({
      fontFamily,
      fontSize: 10,
      letterSpacing: 0.4,
    }),
  },
  regular: {
    ...getSvgFont({
      fontFamily,
      fontSize: 12,
      letterSpacing: 0.4,
    }),
  },
};
