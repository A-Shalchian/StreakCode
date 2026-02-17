"use client";
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";

export const Hero: React.FC = () => {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !isLoading && !!user;

  return (
    <div className="relative bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-float animation-delay-3000"></div>
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-float animation-delay-2000"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white animate-fade-in">
                Never Break Your Coding Streak
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in animation-delay-200">
                Track your GitHub contributions and maintain your streak with
                accurate timezone handling
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
              {isAuthenticated ? (
                <Link
                  href="/streak"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105"
                >
                  View Your Streak
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105"
                >
                  <FaGithub className="mr-2 h-5 w-5" />
                  Sign in with GitHub
                </Link>
              )}
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-base font-medium text-black dark:text-white bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 transition-all hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-600 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-800 animate-fade-in animation-delay-600">
              <div>Track contributions</div>
              <div>&bull;</div>
              <div>Build streaks</div>
              <div>&bull;</div>
              <div>Timezone accurate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
