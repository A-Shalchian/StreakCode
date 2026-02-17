"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, User, Github, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isLoading, signOut } = useAuth();

  const isAuthenticated = !isLoading && !!user;

  const closeAllMenus = () => {
    setMenuOpen(false);
    setShowUserMenu(false);
  };

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.user_name;
  const userEmail = user?.email;
  const userImage = user?.user_metadata?.avatar_url;

  return (
    <>
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between py-4">
          <Link href="/" onClick={closeAllMenus}>
            <div className="text-black dark:text-white text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity">
              StreakCode
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                href="/streak"
                className="text-black dark:text-white hover:opacity-70 transition-opacity text-sm font-medium flex items-center gap-1"
                onClick={closeAllMenus}
              >
                <Flame size={16} />
                Streak
              </Link>
            )}

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center"
              >
                {isAuthenticated && userImage ? (
                  <div className="relative w-8 h-8">
                    <Image
                      src={userImage}
                      alt={userName || "User"}
                      fill
                      sizes="32px"
                      className="rounded-full object-cover"
                      quality={80}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:opacity-70 transition-opacity">
                    <User size={20} className="text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg py-2 shadow-lg">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                        <p className="text-sm font-medium text-black dark:text-white truncate">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {userEmail}
                        </p>
                      </div>
                      <Link
                        href="/streak"
                        className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
                        onClick={closeAllMenus}
                      >
                        Streak
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
                        onClick={closeAllMenus}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/github"
                        className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
                        onClick={closeAllMenus}
                      >
                        GitHub Connection
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-gray-800" />
                      <button
                        onClick={() => {
                          signOut();
                          closeAllMenus();
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
                      onClick={closeAllMenus}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Menu
              size={24}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden cursor-pointer text-black dark:text-white hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-transform duration-300 transform lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-4 text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              <X size={34} />
            </button>
          </div>
          <nav className="flex flex-col items-center text-center">
            <ul className="space-y-4 text-2xl font-semibold">
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      href="/streak"
                      onClick={closeAllMenus}
                      className="flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
                    >
                      <Flame size={24} className="mr-2" />
                      Streak
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      onClick={closeAllMenus}
                      className="flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
                    >
                      <User size={24} className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/github"
                      onClick={closeAllMenus}
                      className="flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
                    >
                      <Github size={24} className="mr-2" />
                      Connection
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        closeAllMenus();
                      }}
                      className="flex items-center justify-center text-red-600 dark:text-red-400 hover:opacity-70 transition-opacity"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isAuthenticated && !isLoading && (
                <li>
                  <Link
                    href="/login"
                    onClick={closeAllMenus}
                    className="flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
                  >
                    <Github size={24} className="mr-2" />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
