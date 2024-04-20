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

const Category = async () => {
  const data = await getCategories();
  return (
    <div>
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />}>
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
