"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React from "react";

export const AuthLinks = () => {
  const { status } = useSession();

  // If user is NOT logged in, show just the Login link
  if (status === "unauthenticated") {
    return (
      <ul className="flex flex-col space-y-4 text-2xl mb-2 font-semibold">
        <li className="hover-nav ">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col space-y-4 text-2xl  font-semibold">
      <li className="hover-nav ">
        <span onClick={() => signOut()}>Logout</span>
      </li>
    </ul>
  );
};
