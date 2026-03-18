import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254),
  phone: z.string().max(30).optional(),
  company: z.string().max(100).optional(),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(500),
  longDescription: z.string().min(1),
  icon: z.string().min(1),
  features: z.array(z.string()),
  order: z.number().int().min(0),
  isActive: z.boolean(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(1),
  author: z.string().min(1).max(100),
  tags: z.array(z.string()),
  imageUrl: z.string().url(),
  isPublished: z.boolean(),
});

export const portfolioSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(500),
  category: z.string().min(1).max(100),
  technologies: z.array(z.string()).min(1),
  imageUrl: z.string().url(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  client: z.string().min(1).max(100),
  testimonial: z.string().optional(),
  isActive: z.boolean(),
});

export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: `${firstError.path.join('.')}: ${firstError.message}`,
    };
  }
}
