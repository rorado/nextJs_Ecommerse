import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/validation/authSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
      CredentialsProvider({
        name: "Credentials",
        async authorize(data) {
          const res = LoginSchema.safeParse(data);
          if (!res.success) return null;
          const user = await prisma.user.findFirst({
            where: {
                email: res.data.email,
            },
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
          };
        },
      }),
  ],
  session: {strategy: "jwt" as const},
  pages: {signIn: "/login" },
})
