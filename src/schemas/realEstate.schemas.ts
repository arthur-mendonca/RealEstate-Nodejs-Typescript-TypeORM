import z from "zod";

const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const createRealEstateRequestSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  categoryId: z.number(),
  address: addressSchema,
});

const listAllRealEstatesSchema = z.array(createRealEstateRequestSchema);

const createRealEstateResponseSchema = z.object({
  id: z.number(),
  value: z.number().or(z.string()),
  size: z.number(),
  categoryId: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.date().or(z.string()).nullish(),
  updatedAt: z.date().or(z.string()).nullish(),
  category: z.object({
    id: z.number(),
    name: z.string().max(45),
  }),
});

const createRealEstateCreationSchema = createRealEstateResponseSchema.extend({
  addressSchema,
});

export {
  createRealEstateRequestSchema,
  createRealEstateResponseSchema,
  createRealEstateCreationSchema,
  listAllRealEstatesSchema,
};
