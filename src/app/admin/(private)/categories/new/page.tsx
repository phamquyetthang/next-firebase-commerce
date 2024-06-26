'use client'
import { ICreateCategoryInput } from "@/features/categories/type";
import React from "react";
import { onAddCategory } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormCategory from "../category-form";

const CreateCategory = () => {
  const router = useRouter();
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onAddCategory({
        name,
        description,
        slug,
      });

      toast.info("Add category successfully !");
      router.push("/admin/categories");
    } catch (error) {
      console.log("🚀 ~ CreateCategory ~ error:", error);
      toast.error("Cannot Add category!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create category</h3>
      <FormCategory onSubmit={onSubmit} />
    </div>
  );
};

export default CreateCategory;
