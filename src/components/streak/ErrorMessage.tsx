// components/Streak/ErrorMessage.tsx
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  useEffect(() => {
    // Show toast notification for the error
    if (message.includes("connect your GitHub account")) {
      // For GitHub connection errors, show a toast with a custom component inside
      toast.error(
        <div>
          <p>{message}</p>
          <div className="mt-2">
            <Link 
              href="/github" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors"
            >
              Connect GitHub Account
            </Link>
          </div>
        </div>,
        { 
          autoClose: 10000, // Stay open longer for important actions
          closeOnClick: false
        }
      );
    } else {
      // For regular errors, just show an error toast
      toast.error(message);
    }
  }, [message]);

  // The component doesn't render anything visible since the notifications are shown as toasts
  return null;
}
