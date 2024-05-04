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
import { addAdminSchema } from "@/features/managers/rules";
import { ICreateAdminInput } from "@/features/managers/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface IProps {
  data?: ICreateAdminInput;
  onSubmit: (data: ICreateAdminInput) => void;
}
const FormManager = ({ data, onSubmit }: IProps) => {
  const form = useForm<ICreateAdminInput>({
    resolver: zodResolver(addAdminSchema),
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager email</FormLabel>
                <FormControl>
                  <Input placeholder="admin@admin.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is Manager display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager password</FormLabel>
                <FormControl>
                  <Input placeholder="******" {...field} />
                </FormControl>
                <FormDescription>This is Manager password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.formState.isValid}>
            Add Manager
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormManager;
