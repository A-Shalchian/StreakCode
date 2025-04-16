"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GithubSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load the current user's GitHub username if available
  useEffect(() => {
    if (session?.user?.githubUsername) {
      setUsername(session.user.githubUsername);
    }
  }, [session]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/github/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "GitHub username updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update GitHub username" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
      console.error("Error updating GitHub username:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubConnect = () => {
    signIn("github", { callbackUrl: "/github" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-pulse text-2xl text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Settings</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          
          {session?.user?.githubAccessToken ? (
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-500 font-medium">Connected to GitHub</span>
            </div>
          ) : (
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-red-500 font-medium">Not connected to GitHub</span>
            </div>
          )}

          {!session?.user?.githubAccessToken && (
            <button
              onClick={handleGithubConnect}
              className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Connect with GitHub
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">GitHub Username</h2>
          
          <form onSubmit={handleUsernameSubmit}>
            <div className="mb-4">
              <label htmlFor="github-username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="github-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your GitHub username"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {session?.user?.githubAccessToken 
                  ? "Your GitHub username was automatically retrieved from your GitHub account."
                  : "Manually enter your GitHub username or connect with GitHub to fetch it automatically."}
              </p>
            </div>

            {message.text && (
              <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Save Username"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
