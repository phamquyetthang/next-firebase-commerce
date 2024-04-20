import { z } from "zod";

export const AddCategorySchema = z.object({
  name: z
    .string({ required_error: "category name is required" })
    .min(1, "category name is required"),
  slug: z.string().min(1, "category slug is required"),
  description: z.string().min(1, "description slug is required"),
  images: z.array(z.string()).optional(),
});
