import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/features/products/model";
import { IGetDataInput } from "@/features/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoriesSelect from "../admin/(private)/products/categories-select";
import TablePagination from "@/components/common/table-pagination";
import { getAllCategories } from "@/features/categories/model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IProps {
  searchParams: IGetDataInput & { categories?: string };
}
const Page = async ({ searchParams }: IProps) => {
  const res = await getProducts({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
    categoryIds: searchParams.categories
      ? searchParams.categories?.split(",")
      : [],
    size: 30,
  });
  return (
    <div className="grid grid-cols-[240px_1fr]">
      <div>
        <CategoryList />{" "}
      </div>
      <div className="p-10">
        {" "}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:max-w-7xl ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              All products
            </h2>
            <div className="w-60">
              <CategoriesSelect />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {res.data.map((product, i) => (
                <div className="group relative" key={i}>
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.images ? product.images[0] : ""}
                      alt={product.name}
                      width={224}
                      height={320}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={`/p/${product.slug}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </Link>
                      </h3>
                      <div className="mt-1 text-sm text-gray-500 flex gap-1">
                        {product.properties?.map((p) => (
                          <Badge key={p.name}>
                            {p.color || p.size || p.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.defaultPrice || product.properties[0]?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <TablePagination total={res.meta.total} items={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const CategoryList = async () => {
  const { data } = await getAllCategories();
  return (
    <Card className="mt-10">
      <CardHeader className="p-3">
        <CardTitle>
          <span className="font-semibold text-lg">Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex gap-3 flex-col">
          {data.map((cate) => (
            <Link
              href={`/category/${cate.slug}`}
              className="flex gap-2 items-center p-3 hover:bg-slate-100 cursor-pointer"
              key={cate.id}
            >
              <span>{cate.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
