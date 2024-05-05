import React from "react";
import CreateProduct from "./create";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);

  return <CreateProduct adminId={session?.user.id || ""} />;
};

export default page;
