"use server";

import { editCategory } from "@/features/categories/model";
import { ICreateCategoryInput } from "@/features/categories/type";

export const onEditCategory = async (
  id: string,
  data: ICreateCategoryInput
) => {
  await editCategory(id, data);
};
