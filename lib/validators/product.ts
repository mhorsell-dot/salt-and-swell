import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),

  slug: z.string().min(2, "Slug must be at least 2 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z.number().positive("Price must be greater than zero"),

  featured: z.boolean().optional().default(false),

  active: z.boolean().optional().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
