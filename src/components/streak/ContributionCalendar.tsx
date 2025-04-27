"use client";

import React from "react";

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

export default function ContributionCalendar({
  contributions,
}: ContributionCalendarProps) {
  // Format today's date as YYYY-MM-DD (in local time)
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const todayISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  console.log(todayISO);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold">Contribution Calendar</h2>
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
      </div>

      <div className="flex gap-3">
        {/* Days of the week */}
        <div className="flex flex-col ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
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
                      return <div key={`empty-${i}`} className="w-5 h-5"></div>;
                    }
                    const shiftedDate = new Date(day.date);
                    shiftedDate.setDate(shiftedDate.getDate() + 1);
                    const shiftedISO = shiftedDate.toISOString().split("T")[0];

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
                        }`}
                        style={{ backgroundColor: day.color }}
                        title={`${formattedDate}: ${
                          day.contributionCount
                        } contribution${
                          day.contributionCount !== 1 ? "s" : ""
                        }`}
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
                  ? firstDayOfWeek.toLocaleString("default", { month: "short" })
                  : "";
                return (
                  <div key={`month-${weekIndex}`} className="w-5 text-center">
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
        <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
        <div className="w-3 h-3 rounded-sm bg-[#ebedf0] dark:bg-[#161b22]"></div>
        <div className="w-3 h-3 rounded-sm bg-[#a5b4fc] dark:bg-[#0e4429]"></div>
        <div className="w-3 h-3 rounded-sm bg-[#5C6BC0] dark:bg-[#26a641]"></div>
        <div className="w-3 h-3 rounded-sm bg-[#303F9F] dark:bg-[#39d353]"></div>
        <div className="w-3 h-3 rounded-sm bg-[#312e81] dark:bg-[#2ea043]"></div>
        <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
      </div>
    </div>
  );
}
