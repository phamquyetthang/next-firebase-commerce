import { addCategory, getCategories } from "@/features/categories/model";
import { NextResponse } from "next/server";

// export const GET = async () => {
//   const data = await getCategories();

//   return NextResponse.json(data);
// };

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const admin = await addCategory(data);

    return NextResponse.json(admin);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
};
