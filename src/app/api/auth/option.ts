import { loginSchema } from "@/features/managers/rules";
import { ICreateAdminInput } from "@/features/managers/type";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findAdminByEmail } from "@/features/managers/model";
import { comparePassword } from "@/utils/common/password";

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
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
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
    session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
};
