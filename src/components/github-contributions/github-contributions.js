import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// Function to generate mock contribution data is kept for potential development use
export function generateMockContributions() {
  // Generate data for the past year (52 weeks)
  const weeks = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (52 * 7));

  let totalContributions = 0;
  
  // Generate mock data for each week
  for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
    const contributionDays = [];
    
    // Generate data for each day of the week
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + (weekIndex * 7) + dayIndex);
      
      // Format date as YYYY-MM-DD
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Generate a random number of contributions (weighted to have more zeros)
      let contributionCount = 0;
      const random = Math.random();
      
      if (random > 0.6) {
        // 40% chance of having contributions
        contributionCount = Math.floor(Math.random() * 10) + 1;
        totalContributions += contributionCount;
      }
      
      // Determine color based on contribution count (GitHub-like colors)
      let color = "#ebedf0"; // No contributions
      if (contributionCount > 0) {
        if (contributionCount < 3) color = "#9be9a8";
        else if (contributionCount < 6) color = "#40c463";
        else if (contributionCount < 9) color = "#30a14e";
        else color = "#216e39";
      }
      
      contributionDays.push({
        date: dateStr,
        contributionCount,
        color
      });
    }
    
    weeks.push({ contributionDays });
  }
  
  // Create a streak pattern in the most recent few weeks
  const recentWeeks = weeks.slice(-4);
  let currentStreak = 10; // Mock current streak
  
  // Create a streak in the most recent days
  for (let i = recentWeeks.length - 1; i >= 0; i--) {
    const week = recentWeeks[i];
    for (let j = week.contributionDays.length - 1; j >= 0; j--) {
      if (currentStreak > 0) {
        const day = week.contributionDays[j];
        const contributions = Math.floor(Math.random() * 5) + 1;
        
        day.contributionCount = contributions;
        totalContributions += contributions - day.contributionCount; // Adjust the total
        
        // Update color
        if (contributions < 3) day.color = "#9be9a8";
        else if (contributions < 6) day.color = "#40c463";
        else if (contributions < 9) day.color = "#30a14e";
        else day.color = "#216e39";
        
        currentStreak--;
      } else {
        break;
      }
    }
    if (currentStreak <= 0) break;
  }
  
  return {
    weeks,
    totalContributions,
  };
}

export async function getContributions(accessToken) {
  if (!accessToken) {
    throw new Error("No GitHub access token provided. Please connect your GitHub account.");
  }

  // This query gets both public and private contributions
  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    console.log("Fetching contributions with GraphQL...");
    
    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    // Check if the response has the expected structure
    if (!response.data || !response.data.data || !response.data.data.viewer) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response structure from GitHub API");
    }
    
    // Check for GraphQL errors
    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error(response.data.errors[0].message || "Error in GraphQL query");
    }
    
    // Check if the contributions collection exists
    if (!response.data.data.viewer.contributionsCollection || 
        !response.data.data.viewer.contributionsCollection.contributionCalendar) {
      console.error("Contributions collection not found in response");
      throw new Error("Contributions data not available");
    }

    const weeks =
      response.data.data.viewer.contributionsCollection.contributionCalendar
        .weeks;
    const totalContributions =
      response.data.data.viewer.contributionsCollection.contributionCalendar
        .totalContributions;

    console.log(
      `GraphQL found ${totalContributions} total contributions across ${weeks.length} weeks`
    );

    // Count contributions by week for debugging
    let contribsByWeek = 0;
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        contribsByWeek += day.contributionCount;
      });
    });

    console.log(`Sum of contributions by day: ${contribsByWeek}`);

    return {
      weeks,
      totalContributions
    };
  } catch (error) {
    console.error(
      "Error fetching GraphQL contributions:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Create a named object for the default export
const GitHubContributions = {
  getContributions,
  generateMockContributions
};

export default GitHubContributions;
