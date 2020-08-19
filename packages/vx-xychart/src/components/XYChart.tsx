import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export default function XYChart() {
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        width: '100%',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.backgroundColor,
        border: `1px solid ${theme?.gridStyles?.stroke}`,
        ...theme.htmlLabelStyles,
      }}
    >
      XYChart
    </div>
  );
}
