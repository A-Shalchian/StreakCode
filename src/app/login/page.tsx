"use client";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/streak");
    }
  }, [isLoading, user, router]);

  const handleLogin = async () => {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "read:user repo user:email",
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 pb-32">
      <div className="max-w-md w-full space-y-8 p-16 bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in with GitHub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Connect your GitHub account to track your coding streaks
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-4
                border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-base font-bold
                text-gray-800 dark:text-white bg-white dark:bg-gray-900
                hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FaGithub className="text-2xl" />
            Continue with GitHub
          </button>
        </div>
        <div className="mt-6">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            StreakCode requires GitHub access to track your contributions and calculate your coding streak.
          </p>
        </div>
      </div>
    </div>
  );
}
