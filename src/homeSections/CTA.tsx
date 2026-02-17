"use client";
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";

export const CTA: React.FC = () => {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !isLoading && !!user;

  return (
    <section className="py-24 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="border-2 border-black dark:border-white p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
              Ready to track your coding streak?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Sign in with GitHub to start tracking your contributions and
              maintain your coding streak with precise timezone handling and
              accurate statistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {isAuthenticated ? (
                <Link
                  href="/streak"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  View Your Streak
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  <FaGithub className="mr-2 h-5 w-5" />
                  Sign in with GitHub
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Exclusively using GitHub authentication to provide the most
              accurate contribution tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
