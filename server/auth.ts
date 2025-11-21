import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/validation/authSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = LoginSchema.safeParse(credentials);
        if (!res.success) return null;

        const user = await prisma.user.findFirst({
          where: { email: res.data.email },
        });
        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          res.data.password,
          user.password
        );
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              provider: "google",
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
          return true;
        }
      }
      return true;
    },
  },
});
