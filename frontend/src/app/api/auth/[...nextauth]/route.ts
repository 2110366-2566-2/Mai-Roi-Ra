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
                        // Retrieve user information using Fetch API
                        try {
                            const response = await fetch(`${apiBackUrl}/auth/${provider}/login`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                            });

                            // console.log(response)

                            if (!response.ok) {
                                throw new Error('Failed to fetch from google');
                            }

                            const userProfile = await response.json();
                            return userProfile
                                ? { ...userProfile, session_token: token }
                                : null;
                        } catch (error) {
                            console.error(error);
                            return null;
                        }
                    }
                }
            }
        }),
        GoogleProvider({
          clientId: "16976095195-iprvvmo7ghi1v9uea3ikk79gbk5b3rq1.apps.googleusercontent.com",
          clientSecret: "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",
          // Optionally, you can customize the authorization URL if you need to pass specific parameters
          authorization: {
              params: {
                  prompt: "consent", // This ensures that the consent screen is displayed every time
                  access_type: "offline", // This requests a refresh token to be sent along with the access token
                  scope: "openid email profile", // Define the scope of the authentication
              },
          },
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
