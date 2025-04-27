import React from "react";

interface CommitStatsProps {
  additions: number;
  deletions: number;
  className?: string;
}

export default function CommitStats({
  additions,
  deletions,
  className = "",
}: CommitStatsProps) {
  return (
    <span className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <span className="text-green-600 dark:text-green-400">+{additions}</span>
      {" / "}
      <span className="text-red-600 dark:text-red-400">-{deletions}</span>
    </span>
  );
}
