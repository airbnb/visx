export type PatternOrientationType = 'horizontal' | 'vertical' | 'diagonal' | 'diagonalRightToLeft';

export const PatternOrientation: { [key in PatternOrientationType]: key } = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  diagonal: 'diagonal',
  diagonalRightToLeft: 'diagonalRightToLeft',
};
