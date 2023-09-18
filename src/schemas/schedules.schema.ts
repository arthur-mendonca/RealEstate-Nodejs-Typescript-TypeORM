import z from "zod";

const scheduleCreationSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const scheduleResponseSchema = scheduleCreationSchema.extend({
  id: z.number(),
  userId: z.number(),
});

const listAllSchedulesPerRealEstateSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  user: z.number().or(z.string()).optional(),
  realEstate: z.object({
    id: z.number(),
    value: z.string(),
    size: z.number(),
    sold: z.boolean().default(false),
    createdAt: z.date().or(z.string()).nullish(),
    updatedAt: z.date().or(z.string()).nullish(),
  }),
  address: z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
});

const listAllSchedulesPerRealEstateSchemaArray = z.array(
  listAllSchedulesPerRealEstateSchema
);
export {
  scheduleCreationSchema,
  scheduleResponseSchema,
  listAllSchedulesPerRealEstateSchemaArray,
  listAllSchedulesPerRealEstateSchema,
};
