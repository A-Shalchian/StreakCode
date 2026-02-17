"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useFont } from "@/providers/FontProvider";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import LoadingSpinner from "@/components/streak/LoadingSpinner";

export default function ProfilePage() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { font, setFont, fonts } = useFont();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading) return <LoadingSpinner />;
  if (!user) return null;

  const userName = user.user_metadata?.full_name || "Unknown";
  const githubUsername = user.user_metadata?.user_name || "developer";
  const avatarUrl = user.user_metadata?.avatar_url;
  const email = user.email;

  const themes = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="container mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            {avatarUrl && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={avatarUrl}
                  alt={userName}
                  fill
                  sizes="64px"
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">{userName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">@{githubUsername}</p>
              {email && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Theme</h2>
          {mounted && (
            <div className="grid grid-cols-3 gap-3">
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <Icon size={24} className={isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-400"} />
                    <span className={`text-sm font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Font</h2>
          <div className="space-y-2">
            {fonts.map((f) => (
              <button
                key={f.key}
                onClick={() => setFont(f.key)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                  font === f.key
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
                style={{ fontFamily: f.family }}
              >
                <div>
                  <span className="font-medium">{f.label}</span>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
                {font === f.key && <Check size={20} className="text-blue-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Account</h2>
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
