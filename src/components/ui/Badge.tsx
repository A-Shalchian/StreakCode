import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
