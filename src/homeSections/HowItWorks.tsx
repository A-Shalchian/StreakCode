"use client";
import React from "react";
import { LogIn, PanelRight, BarChart3, Timer } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <LogIn className="h-6 w-6 text-black dark:text-white" />,
      title: "Connect with GitHub",
      description:
        "Sign in exclusively with your GitHub account to enable access to your contribution data from both public and private repositories.",
    },
    {
      number: "02",
      icon: <PanelRight className="h-6 w-6 text-black dark:text-white" />,
      title: "View Your Activity",
      description:
        "See your GitHub contributions accurately displayed in a calendar view with proper timezone handling for correct date alignment.",
    },
    {
      number: "03",
      icon: <BarChart3 className="h-6 w-6 text-black dark:text-white" />,
      title: "Track Your Stats",
      description:
        "Monitor your current streak, maximum streak achieved, and total contributions across all your repositories.",
    },
    {
      number: "04",
      icon: <Timer className="h-6 w-6 text-black dark:text-white" />,
      title: "Stay Consistent",
      description:
        "Get clear indications of your today's contribution status and whether they count toward your current streak.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black dark:text-white sm:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four simple steps to track and maintain your coding streak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          {steps.map((step, index) => (
            <div key={index} className="p-8 bg-white dark:bg-black">
              <div className="flex items-start gap-4">
                <div className="text-4xl font-bold text-gray-300 dark:text-gray-700">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {step.icon}
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
