"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub, FaSignOutAlt, FaChartLine } from "react-icons/fa";
import React from "react";

export const AuthLinks = ({ setMenuOpen }) => {
  const { status } = useSession();

  // Helper to close menu and execute any other function if needed
  const handleClick = (callback) => {
    if (setMenuOpen) {
      setMenuOpen(false);
    }
    if (callback) {
      callback();
    }
  };

  if (status === "authenticated") {
    return (
      <ul className="flex flex-col space-y-4 text-2xl font-semibold">
        <li className="hover-nav">
          <Link 
            href="/streak" 
            className="flex items-center hover-nav"
            onClick={() => handleClick()}
          >
            <FaChartLine className="mr-2" /> 
            Streak
          </Link>
        </li>
        <li className="hover-nav">
          <Link 
            href="/github" 
            className="flex items-center hover-nav"
            onClick={() => handleClick()}
          >
            <FaGithub className="mr-2" />
            Connection
          </Link>
        </li>
        <li className="hover-nav">
          <span 
            onClick={() => handleClick(() => signOut())}
            className="flex items-center cursor-pointer hover-nav"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </span>
        </li>
      </ul>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <li className="hover-nav">
          <Link 
            href="/login" 
            className="flex items-center hover-nav"
            onClick={() => handleClick()}
          >
            <FaGithub className="mr-2" />
            Login
          </Link>
        </li>
      </div>
    );
  }

  return (
    <div className="flex h-8 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
  );
};
