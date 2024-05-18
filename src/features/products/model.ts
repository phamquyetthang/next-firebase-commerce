import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProductDb, IProductDoc, ICreateProductInput } from "./type";
import { db, storage } from "@/utils/firebase";
import { COLLECTIONS } from "@/constants/common";
import { AddProductSchema } from "./rules";
import { formatZodMessage } from "@/utils/common/zod-message";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/common/queries";
import { getManagerById } from "../managers/model";
import { getCategoryByIds } from "../categories/model";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const productsRef = collection(db, COLLECTIONS.PRODUCT);

export const getProductBySlug = async (slug: string) => {
  const existedProduct = await getDocs(
    query(productsRef, where("slug", "==", slug))
  );

  if (!existedProduct.docs[0]) {
    return undefined;
  }

  const product = existedProduct.docs[0].data() as IProductDoc;

  return {
    ...product,
    id: existedProduct.docs[0].id,
  };
};

export const addProduct = async (
  data: ICreateProductInput
): Promise<IProductDb> => {
  const test = AddProductSchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }
  const existedProduct = await getProductBySlug(data.slug);
  if (existedProduct) {
    throw Error("Slug have been used!");
  }
  const { createdId, categoryIds, ...restData } = data;
  const created_by = await getManagerById(createdId);
  const categories = await getCategoryByIds(categoryIds);
  const newProductRef = await addDoc(productsRef, {
    ...restData,
    created_by: created_by,
    categoryIds: categories.map((c) => c.id),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newProduct = await getDoc(newProductRef);

  return { id: newProduct.id, ...(newProduct.data() as IProductDoc) };
};

export const editProduct = async (
  id: string,
  data: ICreateProductInput
): Promise<IProductDb> => {
  const test = AddProductSchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const oldProduct = await getDoc(doc(productsRef, id));

  if (oldProduct.data() && data.slug !== (oldProduct.data() as any)?.slug) {
    const existedProduct = await getProductBySlug(data.slug);
    if (existedProduct) {
      throw Error("Slug have been used!");
    }
  }

  const categories = await getCategoryByIds(data.categoryIds);

  await updateDoc(doc(productsRef, id), {
    ...data,
    categoryIds: categories.map((c) => c.id),
    updated_at: Timestamp.now(),
  });

  const newProduct = await getDoc(doc(productsRef, id));

  return { id: newProduct.id, ...(newProduct.data() as IProductDoc) };
};

export const getProductById = async (id: string) => {
  const existedProduct = await getDoc(doc(productsRef, id));

  if (!existedProduct) {
    return undefined;
  }

  const product = existedProduct.data() as IProductDoc;
  const categories = await getCategoryByIds(product.categoryIds);
  return {
    ...product,
    categories,
    id: existedProduct.id,
  };
};

export const getProducts = async (
  data: IGetDataInput & { categoryIds?: string[] }
): Promise<IPaginationRes<IProductDb>> => {
  const { keyword, page, size, orderField, orderType, categoryIds } = data;
  const queries = [];

  if (categoryIds?.length) {
    queries.push(where("categoryIds", "array-contains-any", categoryIds));
  }
  queries.push(orderBy(orderField, orderType));
  const queriesKeyword = [];
  if (keyword) {
    const keywordQueries =
      orderType === "asc"
        ? [startAt(keyword), endAt(keyword + "\uf8ff")]
        : [startAt(keyword + "\uf8ff"), endAt(keyword)];
    if (orderField !== "name") {
      keywordQueries.unshift(orderBy("name") as any);
    }

    queriesKeyword.push(
      ...[orderBy("name"), startAt(keyword), endAt(keyword + "\uf8ff")]
    );
    queries.push(...keywordQueries);
  }

  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(productsRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }

  const productsDocsRef = await getDocs(
    query(productsRef, ...queries, limit(size || 5)),
  );

  const products = productsDocsRef.docs.slice(0, 5).map(async (d) => {
    const categoryIds = d.data().categoryIds;
    const categories = categoryIds?.length ? await getCategoryByIds(categoryIds) : [];
    return {
      ...(d.data() as IProductDoc),
      categories,
      id: d.id,
    };
  });

  const total = await getCountFromServer(query(productsRef, ...queriesKeyword));

  return {
    meta: { total: total.data().count },
    data: await Promise.all(products),
  };
};

export const deleteProductById = (id: string) => {
  return deleteDoc(doc(productsRef, id));
};

export const uploadImageProduct = async (image: File): Promise<string> => {
  const productStorageRef = ref(storage, image.name);
  const snapshot = await uploadBytes(productStorageRef, image);

  return await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
};
