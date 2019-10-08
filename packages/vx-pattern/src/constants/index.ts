export type PatternOrientationType = 'horizontal' | 'vertical' | 'diagonal';

export const PatternOrientation: { [key in PatternOrientationType]: key } = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  diagonal: 'diagonal',
};
