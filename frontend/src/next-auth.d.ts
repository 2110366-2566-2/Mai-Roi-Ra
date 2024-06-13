import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      organizer_id: string;
      user_id: string;
      username: string;
      email: string;
      role: string;
      token: string;
    };
  }
}
