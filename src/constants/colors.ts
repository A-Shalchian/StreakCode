// Contribution color scale
export const CONTRIBUTION_COLORS = {
  light: {
    level0: "#ebedf0", // No contributions
    level1: "#a5b4fc", // indigo-300
    level2: "#5C6BC0", // indigo-400
    level3: "#303F9F", // indigo-700
    level4: "#312e81", // indigo-900
  },
  dark: {
    level0: "#161b22", // No contributions
    level1: "#0e4429", // Dark green level 1
    level2: "#26a641", // Dark green level 2
    level3: "#39d353", // Dark green level 3
    level4: "#2ea043", // Dark green level 4
  },
};

// Get color based on contribution count
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
