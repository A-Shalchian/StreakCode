import axios from "axios";

/**
 * Fetches a user's GitHub commits for a specific date
 * @param {string} accessToken - GitHub access token
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} - Array of commit objects
 */
export async function getDailyCommits(accessToken, date) {
  if (!accessToken) {
    throw new Error(
      "No GitHub access token provided. Please connect your GitHub account."
    );
  }

  if (!date) {
    throw new Error("No date provided");
  }

  try {
    console.log(`Fetching commits for date: ${date}`);

    // Create date range for the query (start of day to end of day)
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    // Format dates for GitHub API query
    const startDateIso = startDate.toISOString();
    const endDateIso = endDate.toISOString();

    // Updated GraphQL query based on GitHub's current schema
    // Using RecentCommitsCollection instead of commitContributionsByRepository
    const query = `
      query {
        viewer {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              nameWithOwner
              url
              isPrivate
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(since: "${startDateIso}", until: "${endDateIso}", first: 100) {
                      nodes {
                        message
                        committedDate
                        additions
                        deletions
                        url
                        repository {
                          name
                          nameWithOwner
                          url
                          isPrivate
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Check for errors in the response
    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error(
        response.data.errors[0].message || "Error in GraphQL query"
      );
    }

    // Process the commit data into a more usable format
    const commits = [];
    const repositories = response.data.data.viewer.repositories.nodes || [];

    repositories.forEach((repo) => {
      if (
        !repo.defaultBranchRef ||
        !repo.defaultBranchRef.target ||
        !repo.defaultBranchRef.target.history
      ) {
        return;
      }

      const commitNodes = repo.defaultBranchRef.target.history.nodes || [];

      commitNodes.forEach((commit) => {
        commits.push({
          repository: {
            name: repo.name,
            fullName: repo.nameWithOwner,
            url: repo.url,
            isPrivate: repo.isPrivate,
          },
          message: commit.message,
          url: commit.url,
          date: new Date(commit.committedDate),
          additions: commit.additions || 0,
          deletions: commit.deletions || 0,
        });
      });
    });

    // Sort commits by date (newest first)
    commits.sort((a, b) => b.date - a.date);

    console.log(`Found ${commits.length} commits for ${date}`);
    return commits;
  } catch (error) {
    console.error(
      "Error fetching commits:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Create a named object for the default export
const GitHubCommits = {
  getDailyCommits,
};

export default GitHubCommits;
