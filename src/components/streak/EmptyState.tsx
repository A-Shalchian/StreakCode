// components/Streak/EmptyState.tsx
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="text-center py-8">
      <p>No GitHub contribution data found. Connect your GitHub account to see your contributions.</p>
      <div className="mt-4">
        <Link 
          href="/github" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Connect GitHub Account
        </Link>
      </div>
    </div>
  );
}
