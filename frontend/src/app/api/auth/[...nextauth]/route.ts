import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { parse } from 'cookie'; // Import the parse method from cookie library
import { apiBackUrl, provider } from "@/constants";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                if (credentials.email && credentials.password) {
                    const user = await userLogin(credentials.email, credentials.password);
                    if (user) {
                        return user; // Any object returned will be saved in `user` property of the JWT
                    } else {
                        return null; // If you return null then an error will be displayed advising the user to check their details.
                    }
                } else {
                    const cookies = parse(req.headers?.cookie || "");
                    const token = cookies["token"];

                    console.log("COOKIES:", cookies)

                    if (token) {
                      return token
                    } else {
                      return null
                    }
                }
            }
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }; // Merge token and user information
        },
        async session({ session, token }) {
            session.user = token;
            return session; // Return the session with user information
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
