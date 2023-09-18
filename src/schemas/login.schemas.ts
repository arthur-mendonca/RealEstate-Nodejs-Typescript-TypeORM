import { z } from "zod";

const getLoggedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const loginRequestSchema = getLoggedUserSchema.pick({
  email: true,
  password: true,
});

export { getLoggedUserSchema, loginRequestSchema };
