import { z } from "zod";

export const AddProductSchema = z.object({
  name: z
    .string({ required_error: "product name is required" })
    .min(1, "product name is required"),
  slug: z.string().min(1, "product slug is required"),
  description: z.string().min(1, "description slug is required"),
  images: z.array(z.string()).optional(),
  createdId: z
    .string({ required_error: "manager id is required" })
    .min(1, "manager id is required"),
  categoryIds: z.array(z.string()),

  properties: z
    .array(
      z.object({
        name: z.string(),
        color: z.string().optional(),
        size: z.string().optional(),
        price: z.number(),
      })
    )
    .optional(),
  defaultPrice: z.number().optional(),
});
