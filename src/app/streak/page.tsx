"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StreakStats from "@/components/streak/StreakStats";
import ContributionCalendar from "@/components/streak/ContributionCalendar";
import LoadingSpinner from "@/components/streak/LoadingSpinner";
import EmptyState from "@/components/streak/EmptyState";
import ErrorMessage from "@/components/streak/ErrorMessage";
import { toast } from "react-toastify";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchGithubContributions();
    }
  }, [status, session]);

  const fetchGithubContributions = async () => {
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
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="container mx-auto max-w-5xl">
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
