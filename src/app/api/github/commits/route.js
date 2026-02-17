import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getDailyCommits } from "@/components/github-commits/github-commits";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to view commits" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("github_access_token")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!profile.github_access_token) {
      return NextResponse.json(
        {
          error:
            "GitHub access token not found. Please connect your GitHub account.",
        },
        { status: 400 }
      );
    }

    const commits = await getDailyCommits(profile.github_access_token, date);

    return NextResponse.json(commits);
  } catch (error) {
    console.error("Error fetching commits:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
