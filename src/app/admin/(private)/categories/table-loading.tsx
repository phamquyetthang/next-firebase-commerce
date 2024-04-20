import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const TableLoading = () => {
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
        {Array.from({ length: 10 }).map((_, key) => (
          <TableRow key={key}>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableLoading;
