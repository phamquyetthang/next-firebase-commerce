import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log("🚀 ~ POST ~ data:", data)
  return NextResponse.json({message: "Webhook received"});
};
