import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { loginSchema } from "@/features/managers/rules";
import { ICreateAdminInput } from "@/features/managers/type";
import { findAdminByEmail } from "@/features/managers/model";

import { comparePassword } from "@/utils/common/password";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebase";

const provider = new GoogleAuthProvider();

const adminLogin = async (email: string, password: string) => {
  const existedAdmin = await findAdminByEmail(email);
  if (!existedAdmin) {
    throw Error("This email is not exist!");
  }

  const isMatchPassword = await comparePassword(
    password,
    existedAdmin.password
  );

  if (!isMatchPassword) {
    throw Error("The password is wrong");
  }

  if (!existedAdmin.isActive) {
    throw Error("This admin is inactive!");
  }
  return {
    email: existedAdmin.email,
    id: existedAdmin.id,
    name: "adminHelo@private",
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as ICreateAdminInput;
        const data = loginSchema.safeParse({ email, password });

        if (!data.success) {
          const messages = JSON.parse(data.error.message);
          throw Error(messages.map((i: any) => i.message).join(","));
        }
        return adminLogin(email, password);
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        const credential = GoogleAuthProvider.credential(
          account.id_token,
          account.access_token
        );
        await signInWithCredential(auth, credential);
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt: async function jwt({ token, account }) {
      if(account?.provider === "google") {
        const id =  auth.currentUser?.uid;
        token.sub = id || "";
      }
      if (token.name === "adminHelo@private") {
        token.isAdmin = true;
      }
      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub || "";

        if (token.isAdmin) {
          session.user.isAdmin = true;
        }
      }
      return session;
    },
  },
};
