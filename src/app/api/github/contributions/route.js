import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getContributions } from "@/components/github-contributions/github-contributions";

import { todayIncluded } from "@/utils/github/todayIncluded";
import { calculateStreaks } from "@/utils/github/calculateStreaks";
import { normalizeContributions } from "@/utils/github/normalizeContributions";
import { getLocalDateStrings } from "@/utils/github/getLocalDateStrings";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to view contributions" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("github_access_token")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    if (!profile.github_access_token) {
      return NextResponse.json(
        {
          error: "GitHub access token not found. Please connect your GitHub account.",
        },
        { status: 400 }
      );
    }

    try {
      const { weeks, totalContributions } = await getContributions(
        profile.github_access_token
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
        await supabase
          .from("profiles")
          .update({ github_access_token: null })
          .eq("id", user.id);

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
