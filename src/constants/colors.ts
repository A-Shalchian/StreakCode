export const CONTRIBUTION_COLORS = {
  light: {
    level0: "#ebedf0",
    level1: "#9be9a8",
    level2: "#40c463",
    level3: "#30a14e",
    level4: "#216e39",
  },
  dark: {
    level0: "#161b22",
    level1: "#0e4429",
    level2: "#006d32",
    level3: "#26a641",
    level4: "#39d353",
  },
};

export function getContributionColor(
  count: number,
  isDarkMode: boolean = false
) {
  const colorScheme = isDarkMode
    ? CONTRIBUTION_COLORS.dark
    : CONTRIBUTION_COLORS.light;

  if (count === 0) return colorScheme.level0;
  if (count <= 3) return colorScheme.level1;
  if (count <= 6) return colorScheme.level2;
  if (count <= 9) return colorScheme.level3;
  return colorScheme.level4;
}
