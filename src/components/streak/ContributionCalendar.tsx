"use client";

import React, { useState, useEffect } from "react";
import DailyCommits from "@/components/github-commits/DailyCommits";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CONTRIBUTION_COLORS, getContributionColor } from "@/constants/colors";
import { CalendarDays } from "lucide-react";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendarProps {
  contributions: {
    weeks: ContributionWeek[];
    todayContributionCount: number;
    yesterdayContributionCount: number;
  };
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContributionCalendar({
  contributions,
}: ContributionCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect dark mode
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);

    const darkModeListener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", darkModeListener);

    return () => {
      mediaQuery.removeEventListener("change", darkModeListener);
    };
  }, []);

  // Format today's date as YYYY-MM-DD (in local time)
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const todayISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;

  // Function to handle clicking on a day
  const handleDayClick = (day: ContributionDay) => {
    // Toggle selection - if the day is already selected, unselect it
    if (selectedDate === day.date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(day.date);
    }
  };

  // Function to close the commits modal
  const handleCloseCommits = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <CalendarDays size={22} />
              Contribution Calendar
            </span>
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                Yesterday:
              </span>
              <span className="font-semibold">
                {contributions.yesterdayContributionCount} contribution
                {contributions.yesterdayContributionCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center mt-1 sm:mt-0">
              <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                Today:
              </span>
              <span className="font-semibold">
                {contributions.todayContributionCount} contribution
                {contributions.todayContributionCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Click on a day to view detailed commits
          </p>

          <div className="flex gap-3">
            {/* Days of the week */}
            <div className="flex flex-col ">
              {DAYS_OF_WEEK.map((day, i) => (
                <div
                  key={i}
                  className="h-5 flex items-center justify-center text-md font-medium text-gray-500 dark:text-gray-400 mb-[4px]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex flex-col flex-1 overflow-x-auto">
              <div className="flex pb-1">
                <div className="grid grid-flow-col gap-[4px]">
                  {contributions.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[4px]">
                      {Array.from({ length: 7 }).map((_, i) => {
                        const day = week.contributionDays[i];

                        if (!day) {
                          return (
                            <div key={`empty-${i}`} className="w-5 h-5"></div>
                          );
                        }
                        const shiftedDate = new Date(day.date);
                        shiftedDate.setDate(shiftedDate.getDate() + 1);
                        const shiftedISO = shiftedDate
                          .toISOString()
                          .split("T")[0];

                        const formattedDate = shiftedDate.toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        );

                        return (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-sm transition-transform hover:scale-110 cursor-pointer ${
                              shiftedISO === todayISO
                                ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800"
                                : ""
                            } ${
                              day.date === selectedDate
                                ? "ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-gray-800"
                                : ""
                            }`}
                            style={{ backgroundColor: getContributionColor(day.contributionCount, isDarkMode) }}
                            title={`${formattedDate}: ${
                              day.contributionCount
                            } contribution${
                              day.contributionCount !== 1 ? "s" : ""
                            }`}
                            onClick={() => handleDayClick(day)}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Month Labels */}
              <div className="mt-1 pl-0 flex">
                <div className="grid grid-flow-col gap-[2px] text-xs text-gray-500 dark:text-gray-400">
                  {contributions.weeks.map((week, weekIndex) => {
                    const firstDayOfWeek = week.contributionDays[0]?.date
                      ? new Date(week.contributionDays[0].date)
                      : null;
                    const isFirstWeekOfMonth =
                      firstDayOfWeek && firstDayOfWeek.getDate() <= 7;
                    const monthName = firstDayOfWeek
                      ? firstDayOfWeek.toLocaleString("default", {
                          month: "short",
                        })
                      : "";
                    return (
                      <div
                        key={`month-${weekIndex}`}
                        className="w-5 text-center"
                      >
                        {isFirstWeekOfMonth ? monthName : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end mt-6 gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Less
            </span>
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: isDarkMode
                  ? CONTRIBUTION_COLORS.dark.level0
                  : CONTRIBUTION_COLORS.light.level0,
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: isDarkMode
                  ? CONTRIBUTION_COLORS.dark.level1
                  : CONTRIBUTION_COLORS.light.level1,
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: isDarkMode
                  ? CONTRIBUTION_COLORS.dark.level2
                  : CONTRIBUTION_COLORS.light.level2,
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: isDarkMode
                  ? CONTRIBUTION_COLORS.dark.level3
                  : CONTRIBUTION_COLORS.light.level3,
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: isDarkMode
                  ? CONTRIBUTION_COLORS.dark.level4
                  : CONTRIBUTION_COLORS.light.level4,
              }}
            ></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              More
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Replace modal with direct display under calendar */}
      {selectedDate && (
        <div className="mt-6">
          <DailyCommits date={selectedDate} onClose={handleCloseCommits} />
        </div>
      )}
    </>
  );
}
