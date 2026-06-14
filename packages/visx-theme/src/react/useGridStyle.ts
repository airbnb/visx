import useTheme from './useTheme';

export type GridStyleProps = {
  stroke: string;
  strokeWidth: number;
};

export default function useGridStyle(): GridStyleProps {
  const theme = useTheme();

  return {
    stroke: theme.colors.gridStroke,
    strokeWidth: theme.grid.strokeWidth,
  };
}
