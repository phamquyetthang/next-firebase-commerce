"use client";
import { ConfirmDialog } from "@/components/ui/alert-dialog";
import React from "react";
import { toast } from "sonner";

interface IProps {
  id: string;
  deleteCategoryById: (id: string) => Promise<void>;
}
const TableDeleteAction = ({ id, deleteCategoryById }: IProps) => {
  const onDelete = async () => {
    try {
      await deleteCategoryById(id);
      toast.info("Delete category successfully !");
    } catch (error) {
      toast.error("Cannot delete category!");
    }
  };
  return (
    <ConfirmDialog
      title="Delete this category !"
      description="Do you want to delete this category ?"
      actionTitle="Delete"
      onConfirm={onDelete}
    />
  );
};

export default TableDeleteAction;
