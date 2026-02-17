"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import ContributionCalendar from "@/components/streak/ContributionCalendar";
import LoadingSpinner from "@/components/streak/LoadingSpinner";
import ErrorMessage from "@/components/streak/ErrorMessage";
import { toast } from "react-toastify";
import { Trophy, Flame, GitBranch, Activity } from "lucide-react";

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
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [contributions, setContributions] = useState<ContributionsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchData();
    }
  }, [authLoading, user]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const contribResponse = await fetch("/api/github/contributions");
      if (!contribResponse.ok) {
        const data = await contribResponse.json();
        throw new Error(data.error || "Failed to fetch GitHub contributions");
      }

      const contribData = await contribResponse.json();
      setContributions(contribData);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pt-20">
        <div className="container mx-auto max-w-6xl">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || "Your Streak";
  const githubUsername = user?.user_metadata?.user_name || "developer";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{userName}</h1>
          <p className="text-gray-600 dark:text-gray-400">@{githubUsername}</p>
        </div>

        {contributions && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-orange-500">
                {contributions.currentStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Day Streak
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-yellow-500">
                {contributions.maxStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Best Streak
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-500">
                {contributions.totalContributions}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Contributions
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-purple-500">
                {contributions.todayContributionCount}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Today
              </div>
            </div>
          </div>
        )}

        {contributions && (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <ContributionCalendar contributions={contributions} />
          </div>
        )}
      </div>
    </div>
  );
}
