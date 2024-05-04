"use client";
import { ConfirmDialog } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { toast } from "sonner";

interface IProps {
  id: string;
  deleteCategoryById: (id: string) => Promise<void>;
}
export const TableDeleteAction = ({ id, deleteCategoryById }: IProps) => {
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

interface IActiveAdminActionProps {
  isActive: boolean;
  id: string;
  updateActiveAdmin: (id: string, isActive: boolean) => Promise<void>;
}
export const ActiveAdminAction = ({
  isActive,
  id,
  updateActiveAdmin,
}: IActiveAdminActionProps) => {
  const onChangeActive = async (check: boolean) => {
    try {
      await updateActiveAdmin(id, check);
      toast.info(
        check
          ? "Active manager successfully !"
          : "Inactive manager successfully !"
      );
    } catch (error) {
      toast.error("Update failed !");
    }
  };

  return <Switch checked={isActive} onCheckedChange={onChangeActive} />;
};
