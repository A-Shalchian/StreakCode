import React from "react";
import { FiInstagram, FiLinkedin, FiYoutube, FiGithub } from "react-icons/fi";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-black dark:text-white py-12 w-full">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center justify-center">
        <nav className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          <Link href="/about" className="hover:opacity-70 transition-opacity">
            About
          </Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">
            Contact
          </Link>
          <Link href="/streak" className="hover:opacity-70 transition-opacity">
            Streak
          </Link>
          <Link href="/profile" className="hover:opacity-70 transition-opacity">
            Profile
          </Link>
          <Link href="/github" className="hover:opacity-70 transition-opacity">
            Connect GitHub
          </Link>
          <Link href="/privacy-policy" className="hover:opacity-70 transition-opacity">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:opacity-70 transition-opacity">
            Terms of Service
          </Link>
          <Link href="/login" className="hover:opacity-70 transition-opacity">
            Login
          </Link>
        </nav>

        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.instagram.com/ilestarash/" target="_blank" className="hover:opacity-70 transition-opacity">
            <FiInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/arash-shalchian-230b06268/"
            target="_blank"
            className="hover:opacity-70 transition-opacity"
          >
            <FiLinkedin size={20} />
          </a>
          <a href="https://www.youtube.com/@arashshalchian" target="_blank" className="hover:opacity-70 transition-opacity">
            <FiYoutube size={20} />
          </a>
          <a href="https://github.com/A-Shalchian" target="_blank" className="hover:opacity-70 transition-opacity">
            <FiGithub size={20} />
          </a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} StreakCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
