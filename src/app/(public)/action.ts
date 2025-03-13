"use server";

import { addToMyCart, removeItemFromMyCart, updateMyCart } from "@/features/cart/model";
import { ICartDataRes, ICartDoc } from "@/features/cart/type";
import { createPaymentLink } from "@/utils/stripe";
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

export const removeItemFromMyCartAction = async (
  uuid: string,
 itemId: number
) => {
  await removeItemFromMyCart(uuid, itemId);
  revalidatePath("/");
}

export const createPaymentLinkAction = async (cartData: ICartDataRes, redirectLink: string) => { 
  return createPaymentLink(cartData, redirectLink)
}