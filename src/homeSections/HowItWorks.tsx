"use client";
import React from "react";
import { LogIn, PanelRight, BarChart3, Timer } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <LogIn className="h-10 w-10 text-white" />,
      title: "Connect with GitHub",
      description: "Sign in exclusively with your GitHub account to enable access to your contribution data from both public and private repositories."
    },
    {
      icon: <PanelRight className="h-10 w-10 text-white" />,
      title: "View Your Activity",
      description: "See your GitHub contributions accurately displayed in a calendar view with proper timezone handling for correct date alignment."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-white" />,
      title: "Track Your Stats",
      description: "Monitor your current streak, maximum streak achieved, and total contributions across all your repositories."
    },
    {
      icon: <Timer className="h-10 w-10 text-white" />,
      title: "Stay Consistent",
      description: "Get clear indications of your today's contribution status and whether they count toward your current streak."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to track and maintain your coding streak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute transform translate-x-32">
                  <svg className="w-12 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
