"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

export const Hero: React.FC = () => {
  const { status } = useSession();
  const [isClient, setIsClient] = useState(false);

  // This effect ensures the component is only fully rendered on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
                Never Break Your{" "}
                <span className="text-indigo-500">Coding Streak</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Track your GitHub contributions, maintain your streak, and
                visualize your coding journey with accurate timezone handling
                and detailed stats.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {status === "authenticated" ? (
                <Link
                  href="/streak"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg transition duration-300"
                >
                  View Your Streak
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg transition duration-300"
                >
                  <FaGithub className="mr-2 h-5 w-5" />
                  Sign in with GitHub
                </Link>
              )}
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="flex -space-x-1 mr-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border-2 border-white ${
                        i === 0
                          ? "bg-emerald-400"
                          : i === 1
                          ? "bg-emerald-500"
                          : "bg-emerald-600"
                      }`}
                    ></div>
                  ))}
                </div>
                <span>Track all your contributions</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span>Build your streak</span>
              </div>
            </div>
          </div>

          {/* Right column: Visual showcase */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Your Coding Streak
                </h3>
                <span className="text-emerald-500 font-semibold">42 days</span>
              </div>

              {/* Contribution calendar visual - only render complex parts on client side */}
              {isClient ? (
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {[...Array(35)].map((_, i) => {
                    // Use deterministic pattern based on position instead of random
                    const row = Math.floor(i / 7);
                    const col = i % 7;

                    // Create a "heat map" pattern that's visually interesting but deterministic
                    const centerDist = Math.sqrt(
                      Math.pow(row - 2, 2) + Math.pow(col - 3, 2)
                    );
                    const level = Math.min(
                      4,
                      Math.max(0, 4 - Math.floor(centerDist * 1.2))
                    );

                    let bgColor;
                    switch (level) {
                      case 0:
                        bgColor = "bg-gray-100";
                        break;
                      case 1:
                        bgColor = "bg-emerald-100";
                        break;
                      case 2:
                        bgColor = "bg-emerald-200";
                        break;
                      case 3:
                        bgColor = "bg-emerald-300";
                        break;
                      case 4:
                        bgColor = "bg-emerald-500";
                        break;
                      default:
                        bgColor = "bg-gray-100";
                    }

                    return (
                      <div
                        key={i}
                        className={`${bgColor} w-4 h-4 rounded-sm`}
                      ></div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-32 bg-gray-50 animate-pulse rounded mb-4"></div>
              )}

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">42</div>
                  <div className="text-sm text-gray-500">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">67</div>
                  <div className="text-sm text-gray-500">Max Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    1,248
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Contributions
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 -right-4 w-24 h-24 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 left-20 w-36 h-36 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
