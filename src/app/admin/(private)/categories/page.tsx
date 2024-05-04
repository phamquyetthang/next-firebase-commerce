import React, { Suspense } from "react";
import CategoryTable from "./table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories } from "@/features/categories/model";
import { IGetDataInput } from "@/features/type";
import TableHeader from "@/components/common/table-header";
import TableLoading from "@/components/common/table-loading";
import TablePagination from "@/components/common/table-pagination";

interface IProps {
  searchParams: IGetDataInput;
}
const Category = async ({ searchParams }: IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader addTitle="Add Category" addPath="/admin/categories/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <CategoryTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>{res.meta.total}</strong> categories
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
