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

interface IProps {
  searchParams: IGetDataInput;
}
const Products = async ({ searchParams }: IProps) => {
  const res = await getProducts({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader addTitle="Add Products" addPath="/admin/products/new" />
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
