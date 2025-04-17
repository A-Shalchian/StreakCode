// components/Streak/StreakStats.tsx
import React from "react";

interface StreakStatsProps {
  currentStreak: number;
  maxStreak: number;
  totalContributions: number;
  todayContributionCount: number;
}

export default function StreakStats({
  currentStreak,
  maxStreak,
  totalContributions,
  todayContributionCount,
}: StreakStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-1">Current Streak</h2>
        <p className="text-4xl font-bold text-emerald-500">{currentStreak} days</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {todayContributionCount > 0
            ? "Including today's contributions!"
            : "Make a contribution today to continue your streak!"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-1">Max Streak</h2>
        <p className="text-4xl font-bold text-blue-500">{maxStreak} days</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your longest coding streak</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-1">Total Contributions</h2>
        <p className="text-4xl font-bold text-purple-500">{totalContributions}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Across all your repositories</p>
      </div>
    </div>
  );
}
