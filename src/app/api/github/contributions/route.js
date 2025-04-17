import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getContributions } from "@/components/github-contributions/github-contributions";

import { todayIncluded } from "@/utils/github/todayIncluded";
import { calculateStreaks } from "@/utils/github/calculateStreaks";
import { normalizeContributions } from "@/utils/github/normalizeContributions";
import { getLocalDateStrings } from "@/utils/github/getLocalDateStrings";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view contributions" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.githubAccessToken) {
      return NextResponse.json(
        {
          error: "GitHub access token not found. Please connect your GitHub account.",
        },
        { status: 400 }
      );
    }

    try {
      const { weeks, totalContributions } = await getContributions(
        user.githubAccessToken
      );

      const { todayISO, yesterdayISO } = getLocalDateStrings();
      const { weeks: normalizedWeeks, dateMap } = normalizeContributions(weeks);

      const todayContributionCount = dateMap.get(todayISO)?.count || 0;
      const yesterdayContributionCount = dateMap.get(yesterdayISO)?.count || 0;

      const updatedWeeks = todayIncluded(normalizedWeeks, todayISO);
      const allDays = updatedWeeks.flatMap((week) => week.contributionDays);

      const { currentStreak, maxStreak } = calculateStreaks(
        allDays,
        todayISO,
        yesterdayContributionCount,
        todayContributionCount
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { streak: currentStreak },
      });

      return NextResponse.json({
        weeks: updatedWeeks,
        totalContributions,
        currentStreak,
        maxStreak,
        todayContributionCount,
        yesterdayContributionCount,
      });
    } catch (error) {
      console.error("GitHub API error:", error);

      if (
        error.message?.includes("Bad credentials") ||
        error.response?.status === 401 ||
        error.response?.data?.message?.includes("Bad credentials")
      ) {
        await prisma.user.update({
          where: { id: user.id },
          data: { githubAccessToken: null },
        });

        return NextResponse.json(
          {
            error:
              "GitHub token is invalid or expired. Please reconnect your GitHub account.",
          },
          { status: 401 }
        );
      }

      if (error.message?.includes("scope")) {
        return NextResponse.json(
          {
            error:
              "Insufficient GitHub permissions. Please reconnect your GitHub account with the required permissions.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error: "Internal server error processing GitHub contributions",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error processing GitHub contributions",
      },
      { status: 500 }
    );
  }
}