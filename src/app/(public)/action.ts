"use server";

import { addToMyCart, updateMyCart } from "@/features/cart/model";
import { ICartDoc } from "@/features/cart/type";
import { revalidatePath } from "next/cache";

export const updateMyCartAction = async (data: ICartDoc) => {
  return await updateMyCart(data);
};

export const addToMyCartAction = async (
  uuid: string,
  product: {
    quantity: number;
    id: string;
    property: string;
  }
) => {
  await addToMyCart(uuid, product);
  revalidatePath("/");
};
