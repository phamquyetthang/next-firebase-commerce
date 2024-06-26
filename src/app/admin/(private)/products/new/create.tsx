"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ICreateProductInput } from "@/features/products/type";
import FormProduct from "../form";
import { onAddProduct } from "../actions";

interface IProps {
  adminId: string;
}
const CreateProduct = ({ adminId }: IProps) => {
  console.log("🚀 ~ CreateProduct ~ params:", adminId);
  const router = useRouter();
  const onSubmit = async (data: ICreateProductInput) => {
    try {
      await onAddProduct(data);
      toast.info("Add product successfully !");
      router.push("/admin/products");
    } catch (error) {
      console.log("🚀 ~ CreateProduct ~ error:", error);
      toast.error("Cannot Add product!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create product</h3>
      <FormProduct onSubmit={onSubmit} adminId={adminId} />
    </div>
  );
};

export default CreateProduct;
