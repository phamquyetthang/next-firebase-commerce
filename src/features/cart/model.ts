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
  addDoc,
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
    products: cart.products.map((product) => {
      const productInDb = products.find((p) => p.id === product.id);
      return {
        quantity: product.quantity,
        property: product.property,
        data: productInDb,
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

export const addToMyCart = async (
  uuid: string,
  product: {
    quantity: number;
    id: string;
    property: string;
  }
) => {
  const existedCarts = await getDocs(
    query(cartsRef, where("uuid", "==", uuid))
  );
  let existedCart = existedCarts.docs[0];

  if (!existedCart) {
    const newDoc = await addDoc(cartsRef, {
      uuid,
      products: [],
    });

    const newCart = await getDoc(newDoc);
    if (newCart) {
      existedCart = newCart as (typeof existedCarts.docs)[0];
    }
  }
  const id = existedCart.id;
  const data = existedCart.data() as ICartDoc;
  console.log(
    "🚀 ~ file: model.ts:92 ~ awaitupdateDoc ~ data.products, product:",
    data.products,
    product
  );

  await updateDoc(doc(cartsRef, id), {
    ...data,
    products: [...data.products, product],
    updated_at: Timestamp.now(),
  });
  const newCart = await getDoc(doc(cartsRef, id));

  return { id: newCart.id, ...(newCart.data() as ICartDoc) };
};
