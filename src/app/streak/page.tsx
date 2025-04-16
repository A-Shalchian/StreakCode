"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionsData {
  weeks: ContributionWeek[];
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  todayContributionCount: number;
  yesterdayContributionCount: number;
}

export default function StreakPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contributions, setContributions] = useState<ContributionsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchContributions();
    }
  }, [status, session]);

  const fetchContributions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github/contributions");
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch GitHub contributions");
      }

      const data = await response.json();
      setContributions(data);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-pulse text-2xl text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Your GitHub Streak</h1>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-800 dark:text-red-100 dark:border-red-700 px-4 py-3 rounded-md mb-6">
            <p className="font-medium">{error}</p>
            {error.includes("connect your GitHub account") && (
              <div className="mt-4 text-center">
                <Link 
                  href="/github" 
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Connect GitHub Account
                </Link>
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div className="w-full py-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : contributions ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-1">Current Streak</h2>
                <p className="text-4xl font-bold text-emerald-500">{contributions.currentStreak} days</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {contributions.todayContributionCount > 0 
                    ? "Including today's contributions!" 
                    : "Make a contribution today to continue your streak!"}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-1">Max Streak</h2>
                <p className="text-4xl font-bold text-blue-500">{contributions.maxStreak} days</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your longest coding streak</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-1">Total Contributions</h2>
                <p className="text-4xl font-bold text-purple-500">{contributions.totalContributions}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Across all your repositories</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-xl font-semibold">Contribution Calendar</h2>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Yesterday:</span>
                    <span className="font-semibold">
                      {contributions.yesterdayContributionCount} contribution{contributions.yesterdayContributionCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Today:</span>
                    <span className="font-semibold">
                      {contributions.todayContributionCount} contribution{contributions.todayContributionCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Days of week - vertical */}
                <div className="flex flex-col justify-end pt-6">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                    <div key={i} className="h-5 text-xs font-medium text-gray-500 dark:text-gray-400 mb-[2px]">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid - vertical format */}
                <div className="flex flex-1 overflow-x-auto pb-4">
                  <div className="grid grid-flow-col gap-[2px]">
                    {contributions.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[2px]">
                        {week.contributionDays.map((day, dayIndex) => {
                          const date = new Date(day.date);
                          const formattedDate = date.toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          });
                          
                          // Determine if this is today (April 15, 2025)
                          const isToday = date.getFullYear() === 2025 && 
                                         date.getMonth() === 3 && // April is month 3 (0-indexed)
                                         date.getDate() === 15;
                          
                          return (
                            <div
                              key={dayIndex}
                              className={`w-5 h-5 rounded-sm transition-transform hover:scale-110 cursor-pointer ${
                                isToday ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800' : ''
                              }`}
                              style={{ backgroundColor: day.color }}
                              title={`${formattedDate}: ${day.contributionCount} contributions`}
                            ></div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Month labels */}
              <div className="flex justify-between mt-2 px-10 text-xs text-gray-500 dark:text-gray-400 overflow-x-auto">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <div key={i} className="flex-shrink-0">{month}</div>
                ))}
              </div>
              
              {/* Color legend */}
              <div className="flex items-center justify-end mt-6 gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
                <div className="w-3 h-3 rounded-sm bg-[#ebedf0] dark:bg-[#161b22]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#40c463] dark:bg-[#26a641]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#30a14e] dark:bg-[#39d353]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#216e39] dark:bg-[#2ea043]"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p>No GitHub contribution data found. Connect your GitHub account to see your contributions.</p>
            <div className="mt-4">
              <Link 
                href="/github" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Connect GitHub Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
