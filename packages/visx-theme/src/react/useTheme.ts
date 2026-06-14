import { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function useTheme() {
  return useContext(ThemeContext);
}
