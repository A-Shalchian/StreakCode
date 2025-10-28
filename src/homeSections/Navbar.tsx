"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, User, Home, Moon, Sun } from "lucide-react";
import { AuthLinks } from "@/components/navbar/AuthLinks";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to close all menus
  const closeAllMenus = () => {
    setMenuOpen(false);
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between py-4">
          {/* Left side: Logo/Brand */}
          <Link href="/" onClick={closeAllMenus}>
            <div className="text-black dark:text-white text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity">
              StreakCode
            </div>
          </Link>

          {/* Right side: Icon buttons */}
          <div className="flex space-x-4 items-center">
            {/* Theme Toggle */}
            {mounted ? (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-70 transition-opacity"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-white" />
                ) : (
                  <Moon size={20} className="text-black" />
                )}
              </button>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2"
              >
                {status === "authenticated" && session?.user?.image ? (
                  <div className="relative w-8 h-8">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      sizes="32px"
                      className="rounded-full object-cover"
                      quality={80}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                )}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg py-2">
                  {status === "authenticated" && session?.user ? (
                    <>
                      <Link
                        href="/streak"
                        className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        onClick={closeAllMenus}
                      >
                        GitHub Streak
                      </Link>
                      <Link
                        href="/github"
                        className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        onClick={closeAllMenus}
                      >
                        GitHub Connection
                      </Link>

                      <button
                        onClick={() => {
                          signOut();
                          closeAllMenus();
                        }}
                        className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={closeAllMenus}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Menu (Hamburger) Icon Button */}
            <Menu
              size={24}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer text-black dark:text-white hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu: slides down from the top for small screens */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-transform duration-300 transform lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-4 hover-nav transition-colors"
            >
              <X size={34} />
            </button>
          </div>
          <nav className="flex flex-col items-center text-center">
            <ul className="space-y-2 text-2xl font-semibold">
              <li className="hover-nav">
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className="flex items-center"
                >
                  <Home size={24} className="mr-2" />
                  Home
                </Link>
              </li>
              <li className="hover-nav  flex justify-center"></li>
              <AuthLinks setMenuOpen={closeAllMenus} />
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar: slides in from the right for lg+ screens */}
      <div
        className={`hidden lg:block lg:z-50 lg:bg-white lg:dark:bg-black lg:border-l lg:border-gray-200 lg:dark:border-gray-800 lg:fixed lg:top-0 lg:right-0 lg:h-full lg:w-46 lg:transition-transform lg:duration-300 lg:transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex z-50 justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-4 hover-nav transition-colors"
            >
              <X size={34} />
            </button>
          </div>
          <nav className="flex flex-col items-center text-center">
            <ul className="space-y-2 text-2xl font-semibold">
              <li className="hover-nav">
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className="flex items-center"
                >
                  <Home size={24} className="mr-2" />
                  Home
                </Link>
              </li>
              <li className="hover-nav flex justify-center"></li>
              <AuthLinks setMenuOpen={closeAllMenus} />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
