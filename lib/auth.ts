import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getHash, userAuthenticate } from ".";
// Types
type User = Awaited<ReturnType<typeof userAuthenticate>> & {
  id: string;
  activeProfileId: string;
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        activeProfileId: { type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password, activeProfileId } = credentials;
        const passwordHash = await getHash(password as string);

        const user = await userAuthenticate(
          email as string,
          passwordHash,
          activeProfileId as string
        );

        if (user) {
          const { password, ...restUser } = user;

          return {
            ...restUser,
            id: user.userId,
            activeProfileId: user.userActiveProfileId,
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
    jwt: async ({ session, token, trigger, user }) => {
      // Updates whenever JWT is created/updated
      if (user) {
        token.user = user;
      }

      if (trigger === "update") {
        if (session.userName) {
          (token.user as User).userName = session.userName;
          (token.user as User).userSurname = session.userSurname;
        }

        if (session.activeProfileId) {
          (token.user as User).activeProfileId = session.activeProfileId;
          (token.user as User).activeProfile = session.activeProfile;
        }
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
