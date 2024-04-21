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
import TableHeader from "./table-header";
import TablePagination from "./table-pagination";
import { getCategories } from "@/features/categories/model";
import TableLoading from "./table-loading";
import { IGetCategoryInput } from "@/features/categories/type";

interface IProps {
  searchParams: IGetCategoryInput;
}
const Category = async ({ searchParams }: IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword,
    page: searchParams.page,
  });
  return (
    <div>
      <TableHeader />
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
