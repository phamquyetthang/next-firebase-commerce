
import NextAuth from "next-auth/next";
import { authOptions } from "../option";

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
