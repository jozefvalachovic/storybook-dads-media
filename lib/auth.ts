import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getHash, userAuthenticate } from ".";
// Types
type User = Awaited<ReturnType<typeof userAuthenticate>> & {
  id: string;
};
// Extend the NextAuth session
declare module "next-auth" {
  interface Session {
    user: Omit<User, "password">;
  }

  interface JWT {
    user: Omit<User, "password">;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: updateSession,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const passwordHash = await getHash(password as string);

        const user = await userAuthenticate(email as string, passwordHash);

        if (user) {
          // Don't return the password to the session
          const { password, ...resUser } = user;

          return {
            id: user.userId,
            ...resUser,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // days
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Updates whenever JWT is created/updated
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }

      return session;
    },
  },
});
