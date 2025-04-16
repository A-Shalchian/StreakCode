import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      id: string;
      githubUsername?: string | null;
      githubAccessToken?: string | null;
      streak?: number;
    } & DefaultSession["user"];
  }

  /**
   * Extending the built-in user types
   */
  interface User {
    id: string;
    githubUsername?: string | null;
    githubAccessToken?: string | null;
    streak?: number;
  }
}
