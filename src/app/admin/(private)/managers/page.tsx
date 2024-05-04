import TableHeader from "@/components/common/table-header";
import TableLoading from "@/components/common/table-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getManagers } from "@/features/managers/model";
import { IGetDataInput } from "@/features/type";
import React, { Suspense } from "react";
import ManagersTable from "./table";
import TablePagination from "@/components/common/table-pagination";
interface IProps {
  searchParams: IGetDataInput;
}
const page = async ({ searchParams }: IProps) => {
  const res = await getManagers({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "email",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader
        addTitle="Add Manager"
        options={["email", "created_at", "updated_at"]}
        addPath="/admin/managers/new"
      />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Managers</CardTitle>
          <CardDescription>
            Manage your Managers ( Admin accounts ) .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <ManagersTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>{res.meta.total}</strong> managers
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
