import {
  addDoc,
  collection,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  Timestamp,
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

export const getCategories = async (
  data?: IGetCategoryInput
): Promise<ICategoryDb[]> => {
  const keyword = data?.keyword || '';
  const categoriesDocsRef = await getDocs(
    query(
      categoriesRef,
      orderBy("name"),
      startAt(keyword),
      endAt(keyword + "\uf8ff")
    )
  );

  const categories = categoriesDocsRef.docs.map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));

  return categories;
};
