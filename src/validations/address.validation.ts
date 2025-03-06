import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be a 2-letter code"),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export const updateAddressSchema = z.object({
  street: z.string().min(1, "Street is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().length(2, "State must be a 2-letter code").optional(),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits").optional(),
});
