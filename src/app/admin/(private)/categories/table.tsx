import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategoryDb } from "@/features/categories/type";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import moment from "moment";
import Link from "next/link";
interface IProps {
  data: ICategoryDb[];
}
const CategoryTable = ({ data }: IProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Edited At</TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell>
              {moment.unix(category.created_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              {moment.unix(category.updated_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Link href={"/admin/categories/edit/" + category.id}>
                  <Pencil className="w-5 h-5" />
                </Link>
                <Trash className="w-5 h-5" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
