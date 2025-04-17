"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StreakStats from "@/components/streak/StreakStats";
import ContributionCalendar from "@/components/streak/ContributionCalendar";
import LoadingSpinner from "@/components/streak/LoadingSpinner";
import EmptyState from "@/components/streak/EmptyState";
import ErrorMessage from "@/components/streak/ErrorMessage";

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

  if (status === "loading") return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Your GitHub Streak</h1>

        {error ? (
          <ErrorMessage message={error} />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : contributions ? (
          <>
            <StreakStats
              currentStreak={contributions.currentStreak}
              maxStreak={contributions.maxStreak}
              totalContributions={contributions.totalContributions}
              todayContributionCount={contributions.todayContributionCount}
            />
            <ContributionCalendar contributions={contributions} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
