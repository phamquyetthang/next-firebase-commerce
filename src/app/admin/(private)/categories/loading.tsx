import React from "react";
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
import TableLoading from "./table-loading";

const Category = async () => {
  return (
    <div>
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <TableLoading />
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
