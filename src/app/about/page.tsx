"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaUser, FaChartLine, FaCalendarAlt } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          About StreakCode
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            StreakCode was created to help developers maintain consistent coding
            habits and visualize their progress over time. We believe that
            building a daily coding habit leads to improved skills, better
            productivity, and a deeper engagement with the developer community.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Why We Built This</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Many developers struggle with consistency in their coding journey.
            GitHub&apos;s contribution graph is a great start, but we wanted to
            provide more detailed insights and motivation to help developers
            stay on track with their goals. StreakCode fills this gap by
            offering accurate streak tracking, timezone-aware contributions, and
            comprehensive statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FaUser className="text-indigo-600 dark:text-indigo-400 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Developers</h3>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">
              Whether you&apos;re a seasoned programmer or just starting out,
              StreakCode helps you build consistency in your coding practice and
              provides motivation to code every day.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FaChartLine className="text-emerald-600 dark:text-emerald-400 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">
              Track your progress with detailed statistics and visualizations.
              Understand your coding patterns and celebrate your achievements
              with our comprehensive dashboard.
            </p>
          </div>
        </div>

        <div className="bg-indigo-500 text-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FaGithub className="text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">Connect GitHub</h3>
                <p className="text-indigo-100">
                  Link your GitHub account to start tracking your contributions
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FaCalendarAlt className="text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">Track Your Streak</h3>
                <p className="text-indigo-100">
                  We automatically calculate your current and longest streaks
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FaChartLine className="text-2xl" />
                </div>
                <h3 className="font-semibold mb-2">Visualize Progress</h3>
                <p className="text-indigo-100">
                  See detailed stats and patterns in your coding activity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Get Started Today
          </h2>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-12 px-6 py-3 text-lg mx-2"
            >
              Sign Up
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 h-12 px-6 py-3 text-lg mx-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
