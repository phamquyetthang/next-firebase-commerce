import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/features/products/model";
import { IGetDataInput } from "@/features/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  searchParams: IGetDataInput & { categories?: string };
}
const Page = async ({ searchParams }: IProps) => {
  const res = await getProducts({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
    categoryIds: searchParams.categories?.split(",") || [],
    size: 30,
  });
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h2>
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
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-1 text-sm text-gray-500 flex gap-1">
                    {product.properties?.map((p) => (
                      <Badge key={p.name}>{p.color || p.size || p.name}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.defaultPrice || product.properties[0]?.price}
                </p>
              </div>
            </div>
          ))}

          {/* More products... */}
        </div>
      </div>
    </div>
  );
};

export default Page;
