import { uploadImageProduct } from "@/features/products/model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const path = await uploadImageProduct(image);

  return NextResponse.json({ image: path });
};
