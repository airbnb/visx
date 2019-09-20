export type PatternOrientationType = 'horizontal' | 'vertical' | 'diagonal';

export const PatternOrientation: { [key in PatternOrientationType]: PatternOrientationType } = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  diagonal: 'diagonal',
};
