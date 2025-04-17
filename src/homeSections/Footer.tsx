import React from "react";
import { FiInstagram, FiLinkedin, FiYoutube, FiGithub } from "react-icons/fi";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full text-center">
      <div className="container mx-auto px-[80px] inline-flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} StreakCode. All rights reserved.
            </p>
          </div>
        </div>

        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <Link href="/about" className="hover:underline hover-nav">About</Link>
          <Link href="/contact" className="hover:underline hover-nav">Contact</Link>
          <Link href="/streak" className="hover:underline hover-nav">Streak</Link>
          <Link href="/github" className="hover:underline hover-nav">Connect GitHub</Link>
          <Link href="/privacy-policy" className="hover:underline hover-nav">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:underline hover-nav">Terms of Service</Link>
          {/* <Link href="/blog">Blog</Link> */}
          {/* <Link href="/dashboard">Dashboard</Link> */}
          <Link href="/login" className="hover:underline hover-nav">Login</Link>
          
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://www.instagram.com/ilestarash/" target="_blank">
            <FiInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/arash-shalchian-230b06268/" target="_blank">
            <FiLinkedin size={24} />
          </a>
          <a href="https://www.youtube.com/@arashshalchian" target="_blank">
            <FiYoutube size={24} />
          </a>
          <a href="https://github.com/A-Shalchian" target="_blank">
            <FiGithub size={24}/>
          </a>
        </div>
      </div>
    </footer>
  );
};
