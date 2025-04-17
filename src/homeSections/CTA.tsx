"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

export const CTA: React.FC = () => {
  const { status } = useSession();
  const [isClient, setIsClient] = useState(false);
  
  // This effect ensures the component is only fully rendered on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="px-6 py-12 sm:px-12 lg:py-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to track your coding streak?
              </h2>
              <p className="mt-4 text-lg text-emerald-100 max-w-md">
                Sign in with GitHub to start tracking your contributions and maintain your coding streak with precise timezone handling and accurate statistics.
              </p>
              <div className="mt-8">
                {status === "authenticated" ? (
                  <Link href="/streak" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-600 bg-white hover:bg-emerald-50 transition duration-300">
                    View Your Streak
                  </Link>
                ) : (
                  <Link href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-600 bg-white hover:bg-emerald-50 transition duration-300">
                    <FaGithub className="mr-2 h-5 w-5" />
                    Sign in with GitHub
                  </Link>
                )}
              </div>
              <p className="mt-4 text-sm text-emerald-100">
                Exclusively using GitHub authentication to provide the most accurate contribution tracking.
              </p>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZNMzAgMzB2Ni02TTMwIDI0di03TTI0IDMwaC03TTMwIDM2djdNMzYgMzBoNyIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              
              {isClient ? (
                <div className="relative h-full grid grid-cols-7 grid-rows-5 gap-1 p-8">
                  {[...Array(35)].map((_, i) => {
                    // Create a pattern for the demo visual - higher values near center
                    const row = Math.floor(i / 7);
                    const col = i % 7;
                    const centerDist = Math.sqrt(Math.pow(row - 2, 2) + Math.pow(col - 3, 2));
                    const level = Math.max(0, 4 - Math.floor(centerDist * 1.5));
                    
                    let opacity;
                    switch(level) {
                      case 0: opacity = "bg-white/5"; break;
                      case 1: opacity = "bg-white/10"; break;
                      case 2: opacity = "bg-white/20"; break;
                      case 3: opacity = "bg-white/30"; break;
                      case 4: opacity = "bg-white/40"; break;
                      default: opacity = "bg-white/5";
                    }
                    
                    return (
                      <div key={i} className={`${opacity} rounded-sm w-full h-full`}></div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full bg-emerald-600/50 p-8"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
