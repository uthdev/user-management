import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  body: z.string().min(5, "Body must be at least 5 characters long"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export const querySchema = z.object({
  userId: z.string().regex(/^\d+$/, "User ID must be a number"), // Ensure userId is numeric
});

export const paramSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number"),
});
