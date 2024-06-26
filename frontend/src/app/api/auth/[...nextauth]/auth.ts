import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        if (credentials.email && credentials.password) {
          const user = await userLogin(credentials.email, credentials.password);
          if (user) {
            return user;
          } else {
            return null;
          }
        } else {
          const cookies = parse(req.headers?.cookie || "");
          const token = cookies["token"];
          try {
            const parts = token.split(".");
            if (parts.length !== 3) {
              throw new Error("The token is invalid");
            }

            // Decode the payload
            const payload = parts[1];
            const decodedPayload = atob(
              payload.replace(/_/g, "/").replace(/-/g, "+"),
            );
            const jsonParsed = JSON.parse(decodedPayload);

            const sessionUser = {
              organizer_id: jsonParsed.organizer_id,
              user_id: jsonParsed.user_id,
              username: jsonParsed.username || "",
              email: jsonParsed.email,
              role: jsonParsed.role,
              token: token,
            };

            // console.log("SESSION:", sessionUser)
            return sessionUser;
          } catch (error) {
            console.error("Failed to decode JWT:", error);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
