import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IGetDataInput } from "@/features/type";
import TableHeader from "@/components/common/table-header";
import TableLoading from "@/components/common/table-loading";
import TablePagination from "@/components/common/table-pagination";
import ProductTable from "./table";
import { getProducts } from "@/features/products/model";
import CategoriesSelect from "./categories-select";

interface IProps {
  searchParams: IGetDataInput & { categories?: string };
}
const Products = async ({ searchParams }: IProps) => {
  const res = await getProducts({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
    categoryIds: searchParams.categories
      ? searchParams.categories?.split(",")
      : [],
  });
  return (
    <div>
      <TableHeader addTitle="Add Products" addPath="/admin/products/new" />
      <div className="max-w-52 my-4">
        <CategoriesSelect />
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your Products .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <ProductTable data={res.data} />
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

export default Products;
