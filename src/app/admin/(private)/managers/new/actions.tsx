"use server"
import { createAdmin } from "@/features/managers/model";
import { ICreateAdminInput } from "@/features/managers/type";
import { revalidatePath } from "next/cache";

export const onAddAdmin = async (data: ICreateAdminInput) => {
  await createAdmin(data);
  revalidatePath("/admin/managers");
};

