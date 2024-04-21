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
import { AddCategorySchema } from "@/features/categories/rules";
import { ICreateCategoryInput } from "@/features/categories/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { onAddCategory } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateCategory = () => {
  const router = useRouter();
  const form = useForm<ICreateCategoryInput>({
    resolver: zodResolver(AddCategorySchema),
  });

  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onAddCategory({
        name,
        description,
        slug,
      });

      toast.info("Add category successfully !");
      router.push("/admin/categories");
    } catch (error) {
      console.log("🚀 ~ CreateCategory ~ error:", error);
      toast.error("Cannot Add category!");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="category 1" {...field} />
                </FormControl>
                <FormDescription>
                  This is category display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="category description" {...field} />
                </FormControl>
                <FormDescription>
                  This is category slug (using for url).
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
                <FormLabel>Category description</FormLabel>
                <FormControl>
                  <Input placeholder="category-1" {...field} />
                </FormControl>
                <FormDescription>This is category description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.formState.isValid}>
            Add category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategory;
