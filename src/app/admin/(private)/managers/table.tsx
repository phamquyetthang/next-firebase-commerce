import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import moment from "moment";
import { deleteCategoryById } from "@/features/categories/model";
import { revalidatePath } from "next/cache";
import { IAdminDb } from "@/features/managers/type";
import { updateActiveAdmin } from "@/features/managers/model";
import { ActiveAdminAction, TableDeleteAction } from "./table-actions";

interface IProps {
  data: IAdminDb[];
}
const ManagersTable = ({ data }: IProps) => {
  const onDelete = async (id: string) => {
    "use server";
    await deleteCategoryById(id);
    revalidatePath("/admin/categories");
  };

  const onChangeActive = async (id: string, isActive: boolean) => {
    "use server";
    await updateActiveAdmin(id, isActive);
    revalidatePath("/admin/categories");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Edited At</TableHead>
          <TableHead>Active</TableHead>
          <TableHead className="w-28">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell className="font-medium">{admin.email}</TableCell>
            <TableCell>
              {moment.unix(admin.created_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              {moment.unix(admin.updated_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              <ActiveAdminAction
                isActive={admin.isActive}
                id={admin.id}
                updateActiveAdmin={onChangeActive}
              />
            </TableCell>
            <TableCell>
              <TableDeleteAction id={admin.id} deleteCategoryById={onDelete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManagersTable;
