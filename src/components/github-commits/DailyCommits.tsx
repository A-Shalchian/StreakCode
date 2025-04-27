"use client";

import React, { useState, useEffect } from "react";

interface Repository {
  name: string;
  fullName: string;
  url: string;
  isPrivate: boolean;
}

interface Commit {
  repository: Repository;
  message: string;
  url: string;
  date: Date;
  additions: number;
  deletions: number;
}

interface ApiCommit {
  repository: Repository;
  message: string;
  url: string;
  date: string; // Date from API comes as a string
  additions: number;
  deletions: number;
}

interface DailyCommitsProps {
  date: string;
  onClose?: () => void;
}

export default function DailyCommits({ date, onClose }: DailyCommitsProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      setIsLoading(true);
      setError(null);
      try {
        // Use the API endpoint instead of directly calling getDailyCommits
        const response = await fetch(`/api/github/commits?date=${date}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch commits");
        }

        const commitsData = (await response.json()) as ApiCommit[];

        // Transform dates from strings to Date objects
        const formattedCommits = commitsData.map((commit) => ({
          ...commit,
          date: new Date(commit.date),
        }));

        setCommits(formattedCommits);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch commits";
        setError(errorMessage);
        console.error("Error fetching commits:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (date) {
      fetchCommits();
    }
  }, [date]);

  // Helper function to truncate long commit messages
  const truncateMessage = (message: string, maxLength = 80) => {
    if (!message) return "";
    const firstLine = message.split("\n")[0];
    if (firstLine.length <= maxLength) return firstLine;
    return `${firstLine.substring(0, maxLength)}...`;
  };

  // Format the date for display
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Commits on {formattedDate}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 rounded-md bg-red-50 dark:bg-red-900/20">
          {error}
        </div>
      ) : commits.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 py-10 text-center">
          No commits found for this day.
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {commits.map((commit, index) => (
            <div key={index} className="py-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.172 10l2.829-2.828a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 101.414-1.414L5.172 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline break-words"
                    >
                      {truncateMessage(commit.message)}
                    </a>
                    <div className="text-sm text-gray-500 dark:text-gray-400 sm:ml-4 mt-1 sm:mt-0">
                      {commit.date.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={commit.repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      {commit.repository.fullName}
                    </a>
                    {commit.repository.isPrivate && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                        private
                      </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-green-600 dark:text-green-400">
                        +{commit.additions}
                      </span>
                      {" / "}
                      <span className="text-red-600 dark:text-red-400">
                        -{commit.deletions}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
