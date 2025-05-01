"use client";
import React, { useState } from "react";
import { Menu, X, User, Home } from "lucide-react";
import { AuthLinks } from "@/components/navbar/AuthLinks";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();

  // Helper function to close all menus
  const closeAllMenus = () => {
    setMenuOpen(false);
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-indigo-400 dark:bg-indigo-600 sticky top-0 z-20">
        <div className="container mx-auto max-w-full px-[80px] flex items-center justify-between p-4">
          {/* Left side: Logo/Brand */}
          <Link href="/" onClick={closeAllMenus}>
            <div className="text-white text-3xl font-bold tracking-wider hover:scale-105 transition-transform">
              StreakCode
            </div>
          </Link>

          {/* Right side: Icon buttons */}
          <div className="flex space-x-4 items-center">
            {/* Theme Toggle */}

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
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  {status === "authenticated" && session?.user ? (
                    <>
                      <Link
                        href="/streak"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={closeAllMenus}
                      >
                        GitHub Streak
                      </Link>
                      <Link
                        href="/github"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={closeAllMenus}
                      >
                        GitHub Connection
                      </Link>

                      <button
                        onClick={() => {
                          signOut();
                          closeAllMenus();
                        }}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
              className="cursor-pointer hover:text-white transition-colors hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu: slides down from the top for small screens */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 transform lg:hidden ${
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
            <ul className="space-y-4 text-2xl font-semibold">
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
              <li className="hover-nav mt-4 flex justify-center"></li>
              <AuthLinks setMenuOpen={closeAllMenus} />
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar: slides in from the right for lg+ screens */}
      <div
        className={`hidden lg:block lg:z-50 lg:bg-white lg:dark:bg-gray-800 lg:fixed lg:top-0 lg:right-0 lg:h-full lg:w-46 lg:shadow-lg lg:transition-transform lg:duration-300 lg:transform ${
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
            <ul className="space-y-4 text-2xl font-semibold">
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
              <li className="hover-nav mt-4 flex justify-center"></li>
              <AuthLinks setMenuOpen={closeAllMenus} />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
