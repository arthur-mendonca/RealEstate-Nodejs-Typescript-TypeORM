import { z } from "zod";

const userCreationRequestSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

const userCreationResponseSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  createdAt: z.string().or(z.date()).nullish(),
  updatedAt: z.string().or(z.date()).nullish(),
  deletedAt: z.string().or(z.date()).nullish(),
});

const returnAllUsersResponseSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  createdAt: z.string().or(z.date()).nullish(),
  updatedAt: z.string().or(z.date()).nullish(),
  deletedAt: z.string().or(z.date()).nullish(),
});

const userUpdateRequestSchema = userCreationResponseSchema
  .omit({
    deletedAt: true,
    createdAt: true,
    id: true,
    admin: true,
  })
  .partial();

const userUpdateResponseShema = z.array(returnAllUsersResponseSchema);

export {
  userCreationResponseSchema,
  userCreationRequestSchema,
  returnAllUsersResponseSchema,
  userUpdateRequestSchema,
  userUpdateResponseShema,
};
