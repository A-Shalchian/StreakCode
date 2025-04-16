"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GithubSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Connection</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          
          {session?.user?.githubAccessToken ? (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-500 font-medium">Connected to GitHub</span>
              </div>
              
              {session?.user?.githubUsername && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Connected as <span className="font-bold">{session.user.githubUsername}</span>
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your GitHub account is connected successfully. You can now view your contribution streak and statistics.
                </p>
                <button
                  onClick={() => router.push('/streak')}
                  className="w-full flex justify-center items-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors mt-4"
                >
                  View My Contributions
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-500 font-medium">Not connected to GitHub</span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Connect your GitHub account to track your contribution streaks and view your GitHub statistics.
              </p>

              <button
                onClick={handleGithubConnect}
                className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Connect with GitHub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
