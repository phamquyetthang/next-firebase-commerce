import { ZodError } from "zod";

export const formatZodMessage = (error: ZodError) => {
  const messages = error.issues;
  return messages.map((i: any) => i.message).join(",");
};
