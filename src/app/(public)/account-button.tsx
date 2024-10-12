"use client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const AccountButton = ({ email }: { email?: string }) => {
  const onLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log("🚀 ~ file: account-button.tsx:13 ~ onLogin ~ error:", error);
    }
  };

  return email ? (
    <Button onClick={() => signOut()}>
      {email}
      <LogOut />
    </Button>
  ) : (
    <Button onClick={onLogin}>
      <User />
      Sign in
    </Button>
  );
};

export default AccountButton;
