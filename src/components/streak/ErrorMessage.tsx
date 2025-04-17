// components/Streak/ErrorMessage.tsx
import Link from "next/link";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-800 dark:text-red-100 dark:border-red-700 px-4 py-3 rounded-md mb-6">
      <p className="font-medium">{message}</p>
      {message.includes("connect your GitHub account") && (
        <div className="mt-4 text-center">
          <Link 
            href="/github" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Connect GitHub Account
          </Link>
        </div>
      )}
    </div>
  );
}
