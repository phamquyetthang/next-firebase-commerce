"use client";
import MultiSelectFormField from "@/components/ui/multi-select";
import { BASE_URL } from "@/constants/common";
import { ICategoryDb } from "@/features/categories/type";
import { IPaginationRes } from "@/features/type";
import unionBy from "lodash-es/unionBy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface IProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}
const CategoriesSelect = ({ value = [], onChange }: IProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [selectedIds, setSelectedIds] = useState(value);
  const [categories, setCategories] = useState<ICategoryDb[]>([]);
  const fetchCategories = useCallback((keyword: string) => {
    fetch(`${BASE_URL}/api/admin/categories?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data: IPaginationRes<ICategoryDb>) =>
        setCategories((pre) => unionBy(pre.concat(data.data), "id"))
      );
  }, []);

  const onValueChange = (value: string[]) => {
    setSelectedIds(value);
    if (onChange) {
      onChange(value);
    } else {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("categories", value.join(","));
      } else {
        params.delete("categories");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    fetchCategories("");
  }, [fetchCategories]);

  useEffect(() => {
    if (searchParams.get("categories")) {
      setSelectedIds(searchParams.get("categories")?.split(",") || value);
    }
  }, [searchParams, JSON.stringify(value)]);

  return (
    <MultiSelectFormField
      placeholder="Categories"
      defaultValue={selectedIds}
      onValueChange={onValueChange}
      onSearch={(search) => {
        if (search) {
          fetchCategories(search);
        }
      }}
      options={categories.map((c) => ({
        label: c.name,
        value: c.id,
      }))}
    />
  );
};

export default CategoriesSelect;
