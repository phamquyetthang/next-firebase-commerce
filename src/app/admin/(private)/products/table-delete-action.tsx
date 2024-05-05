"use client";
import { ConfirmDialog } from "@/components/ui/alert-dialog";
import React from "react";
import { toast } from "sonner";

interface IProps {
  id: string;
  deleteProductById: (id: string) => Promise<void>;
}
const TableDeleteAction = ({ id, deleteProductById }: IProps) => {
  const onDelete = async () => {
    try {
      await deleteProductById(id);
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
