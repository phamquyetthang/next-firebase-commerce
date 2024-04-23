import React from "react";

import { getCategoryById } from "@/features/categories/model";
import EditFormCategory from "./edit-form";

interface IProps {
  params: {
    id: string;
  };
}
const EditCategory = async ({ params }: IProps) => {
  const detailData = await getCategoryById(params.id);

  return detailData && <EditFormCategory data={detailData} id={params.id} />;
};

export default EditCategory;
