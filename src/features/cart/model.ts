import { COLLECTIONS } from "@/constants/common";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { ICartDoc } from "./type";
import { getProductByIds } from "../products/model";

const cartsRef = collection(db, COLLECTIONS.CART);

export const getMyCart = async (uuid: string) => {
  const existedCart = await getDocs(query(cartsRef, where("uuid", "==", uuid)));

  if (!existedCart.docs[0]) {
    return undefined;
  }

  const cart = existedCart.docs[0].data() as ICartDoc;

  const products = await getProductByIds(cart.products.map((item) => item.id));

  return {
    ...cart,
    id: existedCart.docs[0].id,
    products: products.map((product) => {
      const cartProduct = cart.products.find((p) => p.id === product.id);
      return {
        quantity: cartProduct?.quantity,
        property: cartProduct?.property,
        data: product,
      };
    }),
  };
};

export const updateMyCart = async (data: ICartDoc) => {
  const { uuid } = data;
  const existedCart = await getDocs(query(cartsRef, where("uuid", "==", uuid)));

  if (!existedCart.docs[0]) {
    return undefined;
  }
  const id = existedCart.docs[0].id;
  await updateDoc(doc(cartsRef, id), {
    ...data,
    updated_at: Timestamp.now(),
  });
  const newCart = await getDoc(doc(cartsRef, id));

  return { id: newCart.id, ...(newCart.data() as ICartDoc) };
};
