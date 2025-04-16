"use client";
import React, { useState } from "react";
import { Menu, Album, X, User } from "lucide-react";
import { AuthLinks } from "@/components/navbar/AuthLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <>
      <header className="bg-emerald-400 sticky top-0 z-20">
        <div className="container mx-auto max-w-full px-[80px] flex items-center justify-between p-4">
          {/* Left side: Logo/Brand */}
          <Link href="/">
            <div className="text-2xl font-bold tracking-wider hover:scale-105 transition-transform">
              StreakCode
            </div>
          </Link>

          {/* Center: Blog Title - Only show on home page */}
          {pathname === "/" && (
            <div
              className={`flex text-lg font-semibold items-center justify-center space-x-2 `}
            >
              <Album size={24} />
              <span>StreakCode</span>
            </div>
          )}

          {/* Right side: Icon buttons */}
          <div className="flex space-x-4 items-center">
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  {status === "authenticated" && session?.user ? (
                    <>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
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
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg bg-white transition-transform duration-300 transform lg:hidden ${
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
                <Link href="/">Home</Link>
              </li>
              <AuthLinks />
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar: slides in from the right for lg+ screens */}
      <div
        className={`hidden lg:block lg:z-50 lg:bg-white lg:fixed lg:top-0 lg:right-0 lg:h-full lg:w-46 lg:shadow-lg lg:transition-transform lg:duration-300 lg:transform ${
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
                <Link href="/">Home</Link>
              </li>

              <AuthLinks />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
