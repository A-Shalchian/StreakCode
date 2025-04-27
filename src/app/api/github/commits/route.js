import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getDailyCommits } from "@/components/github-commits/github-commits";

export async function GET(request) {
  try {
    // Get the date from the request query parameters
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Get the user session
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view commits" },
        { status: 401 }
      );
    }

    // Get the user from the database to access their GitHub token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.githubAccessToken) {
      return NextResponse.json(
        {
          error:
            "GitHub access token not found. Please connect your GitHub account.",
        },
        { status: 400 }
      );
    }

    // Fetch the user's commits for the specified date
    const commits = await getDailyCommits(user.githubAccessToken, date);

    return NextResponse.json(commits);
  } catch (error) {
    console.error("Error fetching commits:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
