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
      icon: <CalendarDays className="h-8 w-8 text-indigo-500" />,
      title: "Accurate Calendar",
      description:
        "View your GitHub contributions in a properly aligned calendar with correct timezone handling for precise tracking.",
    },
    {
      icon: <GitCommit className="h-8 w-8 text-indigo-500" />,
      title: "Private Contributions",
      description:
        "Track both public and private repository contributions with secure GitHub OAuth integration.",
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      title: "Streak Tracking",
      description:
        "Monitor your current streak, maximum streak length, and stay motivated to maintain your coding consistency.",
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-500" />,
      title: "Real-time Updates",
      description:
        "See today's contributions in real-time, with clear indication of your current streak status.",
    },
    {
      icon: <Github className="h-8 w-8 text-indigo-500" />,
      title: "GitHub Integration",
      description:
        "Seamless authentication with GitHub to track your coding activity with proper permissions.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-indigo-500" />,
      title: "Contribution Analytics",
      description:
        "Visualize your coding patterns and track total contributions across all repositories.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Track your GitHub contributions with precision and stay motivated to
            maintain your coding streak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 hover:border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
