"use client";
import React from "react";
import {
  CalendarDays,
  GitCommit,
  Award,
  Clock,
  Github,
  LineChart,
} from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <CalendarDays className="h-6 w-6 text-black dark:text-white" />,
      title: "Accurate Calendar",
      description:
        "View your GitHub contributions in a properly aligned calendar with correct timezone handling for precise tracking.",
    },
    {
      icon: <GitCommit className="h-6 w-6 text-black dark:text-white" />,
      title: "Private Contributions",
      description:
        "Track both public and private repository contributions with secure GitHub OAuth integration.",
    },
    {
      icon: <Award className="h-6 w-6 text-black dark:text-white" />,
      title: "Streak Tracking",
      description:
        "Monitor your current streak, maximum streak length, and stay motivated to maintain your coding consistency.",
    },
    {
      icon: <Clock className="h-6 w-6 text-black dark:text-white" />,
      title: "Real-time Updates",
      description:
        "See today's contributions in real-time, with clear indication of your current streak status.",
    },
    {
      icon: <Github className="h-6 w-6 text-black dark:text-white" />,
      title: "GitHub Integration",
      description:
        "Seamless authentication with GitHub to track your coding activity with proper permissions.",
    },
    {
      icon: <LineChart className="h-6 w-6 text-black dark:text-white" />,
      title: "Contribution Analytics",
      description:
        "Visualize your coding patterns and track total contributions across all repositories.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black dark:text-white sm:text-5xl mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track your GitHub contributions with precision and stay motivated to
            maintain your coding streak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
