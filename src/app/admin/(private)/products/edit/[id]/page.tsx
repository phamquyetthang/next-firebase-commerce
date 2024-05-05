import React from "react";

import EditFormProduct from "./edit-form";
import { getProductById } from "@/features/products/model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/option";

interface IProps {
  params: {
    id: string;
    adminId: string;
  };
}
const EditProduct = async ({ params }: IProps) => {
  const detailData = await getProductById(params.id);
  const session = await getServerSession(authOptions);

  return (
    detailData && (
      <EditFormProduct
        data={{
          description: detailData.description,
          name: detailData.name,
          slug: detailData.slug,
          properties: detailData.properties,
          defaultPrice: detailData.defaultPrice,
          images: detailData.images,
          createdId: detailData.created_by.id,
          categoryIds: detailData.categories.map((c) => c.id),
        }}
        id={params.id}
        adminId={session?.user.id || ""}
      />
    )
  );
};

export default EditProduct;
