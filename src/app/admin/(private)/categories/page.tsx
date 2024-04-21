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

interface IProps {
  searchParams: {
    keyword: string;
  };
}
const Category = async ({ searchParams }: IProps) => {
  const data = await getCategories({ keyword: searchParams.keyword });
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
            <CategoryTable data={data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> categories
          </div>
          <TablePagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
