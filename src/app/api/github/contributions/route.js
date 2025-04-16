import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getContributions } from "@/components/github-contributions/github-contributions";

// The fallback is now off by default since the real API is working
// process.env.NEXT_PUBLIC_FALLBACK_TO_MOCK = "true";

export async function GET() {
  try {
    // Get the current session
    const session = await getAuthSession();

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view contributions" },
        { status: 401 }
      );
    }

    // Get the user from the database to get the access token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If the user doesn't have a GitHub access token, return an error
    if (!user.githubAccessToken) {
      return NextResponse.json(
        { error: "GitHub access token not found. Please connect your GitHub account." },
        { status: 400 }
      );
    }

    try {
      // Get the contributions using the GitHub access token
      const { weeks, totalContributions } = await getContributions(user.githubAccessToken);

      // Get today and yesterday in local timezone
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Format dates for comparison
      const todayISO = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const yesterdayISO = yesterday.toISOString().split('T')[0];
      
      console.log('Today (local):', todayISO);
      console.log('Yesterday (local):', yesterdayISO);
      
      // Adjust dates in the contribution data (GitHub API uses UTC)
      // Instead of adding a day to all dates, we'll identify days by their relative position
      let todayContributionCount = 0;
      let yesterdayContributionCount = 0;
      
      // Map to store dates and their contribution counts
      const dateMap = new Map();
      
      // Process all contribution days
      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          const contributionDate = new Date(day.date + 'T00:00:00Z'); // Add UTC timezone marker
          // Convert to local time
          const localDate = new Date(contributionDate.getTime() + (contributionDate.getTimezoneOffset() * 60000));
          const localDateISO = localDate.toISOString().split('T')[0];
          
          // Store in our map
          dateMap.set(localDateISO, {
            count: day.contributionCount,
            color: day.color
          });
          
          // Update date in the object
          day.date = localDateISO;
        });
      });
      
      // Check if we have data for today and yesterday
      if (dateMap.has(todayISO)) {
        todayContributionCount = dateMap.get(todayISO).count;
      }
      
      if (dateMap.has(yesterdayISO)) {
        yesterdayContributionCount = dateMap.get(yesterdayISO).count;
      }
      
      console.log('Today contributions:', todayContributionCount);
      console.log('Yesterday contributions:', yesterdayContributionCount);
      
      // Ensure today exists in the data
      let todayIncluded = false;
      let lastWeek = weeks[weeks.length - 1];
      
      for (const day of lastWeek.contributionDays) {
        if (day.date === todayISO) {
          todayIncluded = true;
          break;
        }
      }
      
      // If today is not included, add it
      if (!todayIncluded) {
        console.log('Today is not in the GitHub data. Adding today:', todayISO);
        
        // Today should have 0 contributions since we haven't contributed yet today
        // Add today to the last week
        lastWeek.contributionDays.push({
          date: todayISO,
          contributionCount: 0,
          color: '#ebedf0' // Light color for no contributions
        });
      }

      // Calculate current streak
      let currentStreak = 0;
      let maxStreak = 0;
      let tempStreak = 0;
      
      // Flatten all days from all weeks
      const allDays = [];
      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          allDays.push(day);
        });
      });
      
      // Sort by date (newest first)
      allDays.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Calculate the streak - looking at consecutive days with contributions
      // working backwards from yesterday (not including today)
      for (let i = 0; i < allDays.length; i++) {
        const day = allDays[i];
        const date = day.date;
        
        // Skip today when calculating the base streak
        if (date === todayISO) {
          continue;
        }
        
        // Count consecutive days with contributions
        if (day.contributionCount > 0) {
          currentStreak++;
        } else {
          // Stop when we hit a day with no contributions
          break;
        }
      }
      
      // Add today to the streak only if there were contributions today 
      // and yesterday had contributions (or streak is 0)
      const hadContributionYesterday = yesterdayContributionCount > 0;
      
      if (todayContributionCount > 0 && (hadContributionYesterday || currentStreak === 0)) {
        currentStreak++;
      }
      
      // Calculate max streak (including all days)
      for (let i = 0; i < allDays.length; i++) {
        if (allDays[i].contributionCount > 0) {
          tempStreak++;
        } else {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 0;
        }
      }
      
      // In case streak continues to the last day
      maxStreak = Math.max(maxStreak, tempStreak);
      
      // Update user's streak in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { streak: currentStreak },
      });

      // Return the contributions data
      return NextResponse.json({
        weeks,
        totalContributions,
        currentStreak,
        maxStreak,
        todayContributionCount,
        yesterdayContributionCount
      });
    } catch (error) {
      console.error("GitHub API error:", error);
      
      // Check if this is a token validation error
      if (error.message?.includes("Bad credentials") || 
          error.response?.status === 401 || 
          error.response?.data?.message?.includes("Bad credentials")) {
        
        // Clear the invalid token from the database
        await prisma.user.update({
          where: { id: user.id },
          data: { githubAccessToken: null },
        });
        
        return NextResponse.json(
          { error: "GitHub token is invalid or expired. Please reconnect your GitHub account." },
          { status: 401 }
        );
      }
      
      if (error.message?.includes("scope")) {
        return NextResponse.json(
          { error: "Insufficient GitHub permissions. Please reconnect your GitHub account with the required permissions." },
          { status: 403 }
        );
      }
      
      // Return a server error
      console.error("Server error:", error);
      return NextResponse.json(
        { error: "Internal server error processing GitHub contributions" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error processing GitHub contributions" },
      { status: 500 }
    );
  }
}
