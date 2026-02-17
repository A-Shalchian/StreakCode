"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSpinner, FaGithub } from "react-icons/fa";
import LoadingSpinner from "@/components/streak/LoadingSpinner";

export default function GithubSettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [isConnecting, setIsConnecting] = useState(false);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const successToastShown = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      toast.error("You must be logged in to access this page");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && user) {
      supabase
        .from("profiles")
        .select("github_access_token, github_username")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setGithubToken(data.github_access_token);
            setGithubUsername(data.github_username);
          }
          setProfileLoading(false);
        });
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (!profileLoading && githubToken && !successToastShown.current) {
      successToastShown.current = true;
      toast.success("Your GitHub account is connected successfully!");
    }
  }, [profileLoading, githubToken]);

  const handleGithubConnect = async () => {
    setIsConnecting(true);
    try {
      const origin = window.location.origin;
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          scopes: "read:user repo user:email",
          redirectTo: `${origin}/auth/callback`,
        },
      });
    } catch {
      setIsConnecting(false);
      toast.error("Failed to connect to GitHub. Please try again.");
    }
  };

  if (authLoading || profileLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Connection</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>

          {githubToken ? (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-500 font-medium">Connected to GitHub</span>
              </div>

              {(githubUsername || user?.user_metadata?.user_name) && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Connected as <span className="font-bold">{githubUsername || user?.user_metadata?.user_name}</span>
                  </p>
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your GitHub account is connected successfully. You can now view your contribution streak and statistics.
                </p>
                <button
                  onClick={() => {
                    router.push('/streak');
                    toast.info("Loading your GitHub contributions...");
                  }}
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
                disabled={isConnecting}
                className={`w-full flex justify-center items-center ${isConnecting ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-900'} text-white py-2 px-4 rounded-md transition-colors`}
              >
                {isConnecting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FaGithub className="mr-2" />
                    Connect with GitHub
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
