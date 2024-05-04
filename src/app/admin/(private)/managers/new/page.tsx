"use client";
import React from "react";
import { onAddAdmin } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormManager from "../manager-form";
import { ICreateAdminInput } from "@/features/managers/type";

const CreateCategory = () => {
  const router = useRouter();
  const onSubmit = async ({ email, password }: ICreateAdminInput) => {
    try {
      await onAddAdmin({
        email,
        password,
        isActive: true,
      });

      toast.info("Add manager successfully !");
      router.push("/admin/managers");
    } catch (error) {
      console.log("🚀 ~ CreateCategory ~ error:", error);
      toast.error("Cannot Add manager!");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create Manager</h3>
      <FormManager onSubmit={onSubmit} />
    </div>
  );
};

export default CreateCategory;
