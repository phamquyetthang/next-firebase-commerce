"use server";
import { addProduct, uploadImageProduct } from "@/features/products/model";
import { ICreateProductInput } from "@/features/products/type";
import { revalidatePath } from "next/cache";

export const onAddProduct = async (data: ICreateProductInput) => {
  await addProduct(data);

  revalidatePath("/admin/categories");
};

