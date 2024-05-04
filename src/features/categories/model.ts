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
  Query,
  query,
  startAfter,
  startAt,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ICategoryDb,
  ICategoryDoc,
  ICreateCategoryInput,
  IGetCategoryInput,
} from "./type";
import { db } from "@/utils/firebase";
import { COLLECTIONS } from "@/constants/common";
import { AddCategorySchema } from "./rules";
import { formatZodMessage } from "@/utils/common/zod-message";
import { IPaginationRes } from "../type";

const categoriesRef = collection(db, COLLECTIONS.CATEGORY);

export const getCategoryBySlug = async (slug: string) => {
  const existedCategory = await getDocs(
    query(categoriesRef, where("slug", "==", slug))
  );

  if (!existedCategory.docs[0]) {
    return undefined;
  }

  const category = existedCategory.docs[0].data() as ICategoryDoc;

  return {
    ...category,
    id: existedCategory.docs[0].id,
  };
};

export const addCategory = async (
  data: ICreateCategoryInput
): Promise<ICategoryDb> => {
  const test = AddCategorySchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }
  const existedCategory = await getCategoryBySlug(data.slug);
  if (existedCategory) {
    throw Error("Slug have been used!");
  }
  const newCateRef = await addDoc(categoriesRef, {
    ...data,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newCategory = await getDoc(newCateRef);

  return { id: newCategory.id, ...(newCategory.data() as ICategoryDoc) };
};

export const editCategory = async (
  id: string,
  data: ICreateCategoryInput
): Promise<ICategoryDb> => {
  const test = AddCategorySchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const oldCategory = await getDoc(doc(categoriesRef, id));

  if (oldCategory.data() && data.slug !== (oldCategory.data() as any)?.slug) {
    const existedCategory = await getCategoryBySlug(data.slug);
    if (existedCategory) {
      throw Error("Slug have been used!");
    }
  }

  await updateDoc(doc(categoriesRef, id), {
    ...data,
    updated_at: Timestamp.now(),
  });

  const newCategory = await getDoc(doc(categoriesRef, id));

  return { id: newCategory.id, ...(newCategory.data() as ICategoryDoc) };
};

export const getCategoryById = async (id: string) => {
  const existedCategory = await getDoc(doc(categoriesRef, id));

  if (!existedCategory) {
    return undefined;
  }

  const category = existedCategory.data() as ICategoryDoc;

  return {
    ...category,
    id: existedCategory.id,
  };
};

export const getCategories = async (
  data: IGetCategoryInput
): Promise<IPaginationRes<ICategoryDb>> => {
  const { keyword, page, size, orderField, orderType } = data;
  const queries = [];
  queries.push(orderBy(orderField, orderType));
  const queriesKeyword = [];
  if (keyword) {
    const keywordQueries = [
      orderBy("name"),
      startAt(keyword),
      endAt(keyword + "\uf8ff"),
    ];
    queriesKeyword.push(...keywordQueries);
    queries.push(...keywordQueries);
  }

  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(categoriesRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }

  const categoriesDocsRef = await getDocs(
    query(categoriesRef, ...queries, limit(size || 5))
  );

  const categories = categoriesDocsRef.docs.slice(0, 5).map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));

  const total = await getCountFromServer(
    query(categoriesRef, ...queriesKeyword)
  );

  return { meta: { total: total.data().count }, data: categories };
};

const getLastVisibleDoc = async (
  queryRef: Query,
  page: number,
  size: number
) => {
  const docFormStart = await getDocs(query(queryRef, limit((page - 1) * size)));
  const lastDoc = docFormStart.docs[docFormStart.docs.length - 1];
  return lastDoc;
};

export const deleteCategoryById = (id: string) => {
  return deleteDoc(doc(categoriesRef, id));
};
