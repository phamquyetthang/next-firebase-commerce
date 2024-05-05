"use client";
import React from "react";
import { toast } from "sonner";
import FormProduct from "../../form";
import { onEditProduct } from "../../actions";
import { ICreateProductInput } from "@/features/products/type";
import { revalidatePath } from "next/cache";

interface IProps {
  data: ICreateProductInput;
  id: string;
  adminId: string;
}
const EditFormCategory = ({ data, id, adminId }: IProps) => {
  const onSubmit = async (values: ICreateProductInput) => {
    try {
      await onEditProduct(id, values);
      toast.info("Edit product successfully !");
    } catch (error) {
      console.log("🚀 ~ CreateCategory ~ error:", error);
      toast.error("Cannot Edit product!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Edit Product</h3>
      <FormProduct onSubmit={onSubmit} data={data} adminId={adminId} />
    </div>
  );
};

export default EditFormCategory;
