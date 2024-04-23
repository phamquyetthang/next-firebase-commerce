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

interface IProps {
  data?: ICreateCategoryInput;
  onSubmit: (data: ICreateCategoryInput) => void;
}
const FormCategory = ({ data, onSubmit }: IProps) => {
  const form = useForm<ICreateCategoryInput>({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: data,
  });

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

export default FormCategory;
