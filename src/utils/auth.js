import GithubProvider from "next-auth/providers/github";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          // Make sure we're requesting all the needed scopes
          scope: 'read:user repo user:email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow GitHub logins
      if (account?.provider !== "github") {
        return false;
      }
      
      if (account?.access_token) {
        try {
          console.log("GitHub login - profile:", profile?.login);
          console.log("GitHub login - user ID:", user?.id);
          
          // Store GitHub username and access token
          if (user?.id) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                githubUsername: profile?.login || null,
                githubAccessToken: account.access_token,
              },
            });
            console.log("Successfully updated user with GitHub info");
          } else {
            console.error("GitHub login - Missing user ID");
          }
        } catch (error) {
          console.error("Error updating user with GitHub info:", error);
          // Still allow sign in even if update fails
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.githubUsername = user.githubUsername;
        session.user.githubAccessToken = user.githubAccessToken;
        session.user.streak = user.streak;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
};

export const getAuthSession = () => getServerSession(authOptions);
