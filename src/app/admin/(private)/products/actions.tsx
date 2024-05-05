"use server";
import { addProduct, editProduct } from "@/features/products/model";
import { ICreateProductInput } from "@/features/products/type";
import { revalidatePath } from "next/cache";

export const onAddProduct = async (data: ICreateProductInput) => {
  await addProduct(data);

  revalidatePath("/admin/products");
};

export const onEditProduct = async (
  id: string,
  data: ICreateProductInput
) => {
  await editProduct(id, data);
  revalidatePath("/admin/products");
};
