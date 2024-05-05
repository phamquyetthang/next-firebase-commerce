import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import React from "react";
import moment from "moment";
import Link from "next/link";
import TableDeleteAction from "./table-delete-action";
import { revalidatePath } from "next/cache";
import { IProductDb } from "@/features/products/type";
import { deleteProductById } from "@/features/products/model";
import { Badge } from "@/components/ui/badge";

interface IProps {
  data: IProductDb[];
}
const ProductTable = ({ data }: IProps) => {
  const onDelete = async (id: string) => {
    "use server";
    await deleteProductById(id);
    revalidatePath("/admin/categories");
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Created by</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Default price</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Edited At</TableHead>
          <TableHead className="w-28">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.slug}</TableCell>
            <TableCell>{product.created_by.email}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {product.categories.map((c) => (
                  <Badge key={c.id}>{c.name}</Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{product.defaultPrice}</TableCell>
            <TableCell>
              {moment.unix(product.created_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              {moment.unix(product.updated_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              <div className="flex gap-4">
                <Link href={"/admin/categories/edit/" + product.id}>
                  <Pencil className="w-5 h-5" />
                </Link>
                <TableDeleteAction
                  id={product.id}
                  deleteProductById={onDelete}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
