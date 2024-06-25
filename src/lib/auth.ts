import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DB from "../lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/sign-in" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await DB.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) return null;

        const passwordMatched = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatched) return null;

        return {
          id: existingUser.id.toString(),
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(DB),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt(params) {
      if (params.user)
        return { ...params.token, username: params.user.username };
      return params.token;
    },
    async session(params) {
      return {
        ...params.session,
        user: { ...params.session.user, username: params.token.username },
      };
    },
  },
};
