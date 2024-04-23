"use client";
import { ICreateCategoryInput } from "@/features/categories/type";
import React from "react";
import { toast } from "sonner";
import FormCategory from "../../category-form";
import { onEditCategory } from "./actions";

interface IProps {
  data: ICreateCategoryInput;
  id: string;
}
const EditFormCategory = ({ data, id }: IProps) => {
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onEditCategory(id, {
        name,
        description,
        slug,
      });

      toast.info("Add category successfully !");
    } catch (error) {
      console.log("🚀 ~ CreateCategory ~ error:", error);
      toast.error("Cannot Add category!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create category</h3>
      <FormCategory onSubmit={onSubmit} data={data} />
    </div>
  );
};

export default EditFormCategory;
