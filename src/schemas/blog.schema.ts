import { z } from "zod";

export const blogSchema = z.object({
  author: z
    .string()
    .min(3, "Author name is too short.")
    .max(50, "Author name is too long."),
  title: z.string().min(5, "Title is too short."),
  content: z.string().min(30, "Content must be at least 30 characters long."),
  tags: z
    .array(z.string().min(2, "Tag must be at least 2 characters long."))
    .min(2, "At least 2 tags are required."),
});
export type BlogInput = z.infer<typeof blogSchema>;
