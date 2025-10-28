"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {

  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/streak");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pb-32">
      <div className="max-w-md w-full space-y-8 p-16 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in with GitHub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect your GitHub account to track your coding streaks
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 
                border border-gray-300 rounded-md shadow-sm text-base font-bold text-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FaGithub className="text-2xl" />
            Continue with GitHub
          </button>
        </div>
        <div className="mt-6">
          <p className="text-center text-xs text-gray-500">
            StreakCode requires GitHub access to track your contributions and calculate your coding streak.
          </p>
        </div>
      </div>
    </div>
  );
}
