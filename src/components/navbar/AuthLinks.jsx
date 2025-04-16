"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub, FaSignOutAlt, FaChartLine } from "react-icons/fa";
import React from "react";

export const AuthLinks = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <ul className="flex flex-col space-y-4 text-2xl font-semibold">
        <li className="hover-nav">
          <Link href="/streak" className="flex items-center">
            <FaChartLine className="mr-2" /> 
            GitHub Streak
          </Link>
        </li>
        <li className="hover-nav">
          <Link href="/github" className="flex items-center">
            <FaGithub className="mr-2" />
            GitHub Connection
          </Link>
        </li>
        <li className="hover-nav">
          <span onClick={() => signOut()} className="flex items-center cursor-pointer">
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
        <button
          className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center"
          onClick={() => signIn("github")}
        >
          <FaGithub className="mr-2 text-xl" />
          Login with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-8 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
  );
};
