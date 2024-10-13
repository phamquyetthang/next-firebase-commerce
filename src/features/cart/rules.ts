import { z } from "zod";

export const CartSchema = z.object({
  uuid: z.string({ required_error: "uuid is required" }),
  products: z.optional(
    z.array(
      z.object({
        id: z.string({ required_error: "id is required" }),
        quantity: z.number({ required_error: "quantity is required" }),
        property: z.string({ required_error: "property is required" }),
      })
    )
  ),
});
