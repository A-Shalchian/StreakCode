"use client";

import { useState } from "react";

export default function ContributionPreferencePage() {
  const [preference, setPreference] = useState<"public" | "all" | null>(null);

  const handleSelection = (option: "public" | "all") => {
    setPreference(option);
    // Here you could save the preference to DB or localStorage
    console.log("User preference:", option);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-2xl font-bold mb-4">
        Choose Your Contribution Tracking Preference
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleSelection("public")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Only Public Repos
        </button>

        <button
          onClick={() => handleSelection("all")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
        >
          All Repos (Public + Private)
        </button>
      </div>

      {preference && (
        <p className="mt-6 text-lg">
          You selected:{" "}
          <span className="font-semibold capitalize">{preference}</span>
        </p>
      )}
    </div>
  );
}
