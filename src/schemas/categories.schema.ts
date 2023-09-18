import { z } from "zod";

const categoryCreationRequestSchema = z.object({
  name: z.string().max(45),
});

const categoryCreationResponseSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

export { categoryCreationRequestSchema, categoryCreationResponseSchema };
