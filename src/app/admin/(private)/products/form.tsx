"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelectFormField from "@/components/ui/multi-select";
import { BASE_URL } from "@/constants/common";
import { ICategoryDb } from "@/features/categories/type";
import { AddProductSchema } from "@/features/products/rules";
import { ICreateProductInput } from "@/features/products/type";
import { IPaginationRes } from "@/features/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "./upload";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface IProps {
  data?: ICreateProductInput;
  onSubmit: (data: ICreateProductInput) => void;
  adminId: string;
}
const FormProduct = ({ data, onSubmit, adminId }: IProps) => {
  const [categories, setCategories] = useState<ICategoryDb[]>([]);
  const fetchCategories = (keyword: string) => {
    fetch(`${BASE_URL}/api/admin/categories?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data: IPaginationRes<ICategoryDb>) => setCategories(data.data));
  };
  const form = useForm<ICreateProductInput>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      ...data,
      createdId: data?.createdId || adminId,
    },
  });

  useEffect(() => {
    fetchCategories("");
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="product 1" {...field} />
                </FormControl>
                <FormDescription>This is product display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product slug</FormLabel>
                <FormControl>
                  <Input placeholder="product description" {...field} />
                </FormControl>
                <FormDescription>
                  This is product slug (using for url).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    {...field}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ size: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],
                          ["link", "image", "video"],
                          ["code-block"],
                          ["clean"],
                        ],
                      },
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                  />
                </FormControl>
                <FormDescription>This is product description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product default price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="10.000 vnd"
                    {...field}
                    onChange={(v) => field.onChange(Number(v.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This is product default price.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product categories</FormLabel>
                <FormControl>
                  <MultiSelectFormField
                    placeholder="Categories"
                    defaultValue={field.value}
                    onValueChange={(ids) => field.onChange(ids)}
                    options={categories.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                  />
                </FormControl>
                <FormDescription>This is product categories.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product categories</FormLabel>
                <FormControl>
                  <Upload
                    defaultImages={field.value}
                    onChange={(images) => field.onChange(images)}
                  />
                </FormControl>
                <FormDescription>This is product categories.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add product</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormProduct;
